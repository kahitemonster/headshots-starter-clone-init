import { Database } from "@/types/supabase";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { streamToString } from "@/lib/utils";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("MISSING NEXT_PUBLIC_SUPABASE_URL!");
}

if (!supabaseServiceRoleKey) {
  throw new Error("MISSING SUPABASE_SERVICE_ROLE_KEY!");
}

const oneCreditPriceId = process.env.STRIPE_PRICE_ID_ONE_CREDIT as string;
const threeCreditsPriceId = process.env.STRIPE_PRICE_ID_THREE_CREDITS as string;
const fiveCreditsPriceId = process.env.STRIPE_PRICE_ID_FIVE_CREDITS as string;

const creditsPerPriceId: {
  [key: string]: number;
} = {
  [oneCreditPriceId]: 1,
  [threeCreditsPriceId]: 3,
  [fiveCreditsPriceId]: 5,
}

const imagesPerPriceId: {
  [key: string]: number;
} = {
  [oneCreditPriceId]: 60,
  [threeCreditsPriceId]: 100,
  [fiveCreditsPriceId]: 140,
}

const planId: {
  [key: string]: number;
} = {
  [oneCreditPriceId]: 1,
  [threeCreditsPriceId]: 2,
  [fiveCreditsPriceId]: 3,
}

export async function POST(request: Request) {
  console.log("Request from: ", request.url);
  console.log("Request: ", request)
  const headersObj = headers();
  const sig = headersObj.get('stripe-signature');

  if (!stripeSecretKey) {
    return NextResponse.json(
      {
        message: "error",
      },
      { status: 400, statusText: `Missing stripeSecretKey` }
    );
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2023-10-16",
    typescript: true,
  });

  if (!sig) {
    return NextResponse.json(
      {
        message: "error",
      },
      { status: 400, statusText: `Missing signature` }
    );
  }

  if (!request.body) {
    return NextResponse.json(
      {
        message: "error",
      },
      { status: 400, statusText: `Missing body` }
    );
  }

  const rawBody = await streamToString(request.body);

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret!);
  } catch (err) {
    const error = err as Error;
    console.log("Error verifying webhook signature: " + error.message);
    return NextResponse.json(
      {
        message: "error",
      },
      { status: 400, statusText: `Webhook Error: ${error?.message}` }
    );
  }

  const supabase = createClient<Database>(
    supabaseUrl as string,
    supabaseServiceRoleKey as string,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    }
  );

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object as Stripe.Checkout.Session;
      const userId = checkoutSessionCompleted.client_reference_id;
      const customerId = String(checkoutSessionCompleted.customer);

      const lineItems = await stripe.checkout.sessions.listLineItems(checkoutSessionCompleted.id);
      const quantity = lineItems.data[0].quantity;
      const priceId = lineItems.data[0].price!.id;
      const creditsPerUnit = creditsPerPriceId[priceId];
      const totalCreditsPurchased = quantity! * creditsPerUnit;

      if (!userId) {
        return NextResponse.json(
          {
            message: "error",
          },
          { status: 400, statusText: `Missing client_reference_id` }
        );
      }

      if (!customerId) {
        return NextResponse.json(
          {
            message: "error",
          },
          { status: 400, statusText: `Missing customer_id` }
        );
      }

      const { data: paymentsData } = await supabase.from("payments").select("*").eq("user_id", userId).single();

      if (paymentsData) {
        const {
          data, error,
        } = await supabase.from("payments").update({
          customer_id: customerId,
          plan_id: planId[priceId]
        }).eq("user_id", userId);
      } else {
        const {
          data, error,
        } = await supabase.from("payments").insert({
          user_id: userId,
          customer_id: customerId,
          plan_id: planId[priceId]
        });
      }

      const { data: existingCredits } = await supabase.from("credits").select("*").eq("user_id", userId).single();

      // If user has existing credits, add to it.
      if (existingCredits) {
        const newCredits = existingCredits.credits + totalCreditsPurchased;
        const newImageNumbers = existingCredits.images + imagesPerPriceId[priceId]

        const {
          data: creditsData, error: creditsError,
        } = await supabase.from("credits").update({
          credits: newCredits,
          images: newImageNumbers
        }).eq("user_id", userId);

        if (creditsError) {
          console.log(creditsError);
          return NextResponse.json(
            {
              message: "error",
            },
            { status: 400, statusText: `Error updating credits: ${creditsError}\n ${creditsData}` }
          );
        }

        return NextResponse.json(
          {
            message: "success",
          },
          { status: 200, statusText: "Success" }
        );
      } else {
        const newImageNumbers = imagesPerPriceId[priceId]

        // Else create new credits row.
        const {
          data, error,
        } = await supabase.from("credits").insert({
          user_id: userId,
          credits: totalCreditsPurchased,
          images: newImageNumbers
        });

        if (error) {
          console.log(error);
          return NextResponse.json(
            {
              message: "error",
            },
            { status: 400, statusText: `Error creating credits: ${error}\n ${data}` }
          );
        }
      }

      return NextResponse.json(
        {
          message: "success",
        },
        { status: 200, statusText: "Success" }
      );

    case 'customer.subscription.updated':
      const subscriptionUpdated = event.data.object
      const subscriptionPrevious = event.data.previous_attributes

      const customer_id = String(subscriptionUpdated.customer)

      // @ts-ignore
      const previousSubscriptionId = String(subscriptionPrevious?.items?.data[0]?.plan?.id)
      const updatedSubcriptionId = String(subscriptionUpdated.items?.data[0]?.price?.id);

      if (previousSubscriptionId) {
        // In the case the user upgrade plan
        const creditsAdded = creditsPerPriceId[updatedSubcriptionId] - creditsPerPriceId[previousSubscriptionId]
        const imageAdded = imagesPerPriceId[updatedSubcriptionId] - imagesPerPriceId[previousSubscriptionId]

        const { data: paymentsDataUpdatePlan, error: paymentsError } = await supabase
          .from("payments")
          .select()
          .eq("customer_id", customer_id)
          .single()

        if (paymentsError) {
          return NextResponse.json(
            {
              message: "Select payment error on supabase",
            },
            { status: 500, statusText: "Error" }
          );
        }

        const userIdUpdatePlan = paymentsDataUpdatePlan.user_id

        const { data: creditsUpdatedData, error: creditsUpdateError } = await supabase
          .from("credits")
          .select()
          .eq("user_id", userIdUpdatePlan)
          .single();

        if (creditsUpdateError) {
          return NextResponse.json(
            {
              message: "Get user on credits error on supabase",
            },
            { status: 500, statusText: "Error" }
          );
        }

        if (creditsAdded > 0) {
          const newCredits = creditsUpdatedData.credits + creditsAdded
          const newImages = creditsUpdatedData.images + imageAdded

          const { error: updateCreditError } = await supabase
            .from("credits")
            .update({ credits: newCredits, images: newImages })
            .eq("user_id", userIdUpdatePlan)
            .select("*");

          if (updateCreditError) {
            return NextResponse.json(
              {
                message: "Update credits error on supabase",
              },
              { status: 500, statusText: "Error" }
            );
          }

          const { error: updatePaymentsError } = await supabase
            .from("payments")
            .update({ plan_id: planId[updatedSubcriptionId] })
            .eq("user_id", userIdUpdatePlan)
            .select("*");

          if (updatePaymentsError) {
            return NextResponse.json(
              {
                message: "Update payments error on supabase",
              },
              { status: 500, statusText: "Error" }
            );
          }
        }

        return NextResponse.json(
          {
            message: "update credits success",
          },
          { status: 200, statusText: "Success" }
        );
      } else {
        return NextResponse.json(
          {
            message: "update no credits success",
          },
          { status: 200, statusText: "Success" }
        );
      }

    case "customer.subscription.deleted": 
      const customerDeletedId = String(event.data.object.customer)

      const { data: paymentsDataUpdatePlan, error: paymentsError } = await supabase
        .from("payments")
        .update({ plan_id: 0 })
        .eq("customer_id", customerDeletedId)
        .select("*");

      if (paymentsError) {
        return NextResponse.json(
          {
            message: "Update plan in payments table in supabase",
          },
          { status: 500, statusText: "Error" }
        );
      }

      return NextResponse.json(
        {
          message: "Subscription delete successfully",
        },
        { status: 200, statusText: "Success" }
      );
      
    default:
      return NextResponse.json(
        {
          message: "error",
        },
        { status: 400, statusText: `Unhandled event type ${event.type}` }
      );
  }
}
