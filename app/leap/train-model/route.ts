import { Database } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Leap } from "@leap-ai/workflows";
import axios from "axios";

export const dynamic = "force-dynamic";

const astriaApiKey = process.env.ASTRIA_API_KEY;
const astriaTestModeIsOn = process.env.ASTRIA_TEST_MODE === "true";
// For local development, recommend using an Ngrok tunnel for the domain

const appWebhookSecret = process.env.APP_WEBHOOK_SECRET;

if (!appWebhookSecret) {
  throw new Error("MISSING APP_WEBHOOK_SECRET!");
}


const leapApiKey = process.env.LEAP_API_KEY;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// For local development, recommend using an Ngrok tunnel for the domain
// const webhookUrl = `https://${process.env.VERCEL_URL}/leap/train-webhook`;
const webhookUrl = `https://${process.env.VERCEL_URL}/leap/model-handler`;

const leapWebhookSecret = process.env.LEAP_WEBHOOK_SECRET;
// const stripeIsConfigured = process.env.NEXT_PUBLIC_STRIPE_IS_ENABLfineTunedModelIdED === "true";
const stripeIsConfigured = true

if (!leapWebhookSecret) {
  throw new Error("MISSING LEAP_WEBHOOK_SECRET!");
}

if (!stripeSecretKey) {
  throw new Error("MISSING STRIPE_SECRET_KEY!");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
  typescript: true,
});

const modelPrices = [
  // "price_1OMYZpJpDi0MVrf4IaFtlFdy",
  // "price_1OMYZpJpDi0MVrf4IaFtlFdy",
  // "price_1OMYZpJpDi0MVrf4IaFtlFdy"
  "price_1P2GBRJpDi0MVrf4pHuNcQ9b",
  "price_1P2GC4JpDi0MVrf4sPOaoqes",
  "price_1P2GCvJpDi0MVrf4XvPUPOsW"
]

export async function POST(request: Request) {
  let status = 0
  const payload = await request.json();
  const images = payload.urls;
  const type = payload.type;
  const name = payload.name;

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({}, { status: 401, statusText: "Unauthorized!" });
  }

  if (!leapApiKey) {
    return NextResponse.json(
      {
        message: "Missing API Key: Add your Leap API Key to generate headshots",
      },
      {
        status: 500,
        statusText:
          "Missing API Key: Add your Leap API Key to generate headshots",
      }
    );
  }

  if (images?.length < 4) {
    return NextResponse.json(
      {
        message: "Upload at least 4 sample images",
      },
      { status: 500, statusText: "Upload at least 4 sample images" }
    );
  }
  let _credits = null;

  const { error: paymentsError, data: payments } = await supabase
    .from("payments")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (paymentsError) {
    return NextResponse.json(
      {
        message: "You have to subscribe one plan before train a model"
      },
      { status: 500, statusText: "You have to subscribe one plan before train a model" }
    );
  }
  
  const handleTrainAdditionalModel = async() => {
    const invoice = await stripe.invoices.create({
      customer: payments.customer_id,
      auto_advance: true,
      collection_method: 'charge_automatically',
    });
  
    const invoiceItem = await stripe.invoiceItems.create({
      customer: payments.customer_id,
      price: modelPrices[Number(payments.plan_id) - 1],
      currency: "USD",
      description: "Pay for model",
      invoice: invoice.id,
      quantity: 1
    });
  
    const finalizeInvoice = await stripe.invoices.finalizeInvoice(
      invoice.id,
      {
        auto_advance: true
      }
    );
  
    let paidInvoice

    try {
      paidInvoice = await stripe.invoices.pay(
        invoice.id
      );
    } catch (err: any) {
      if(err.code==="missing") {
        status = 1
        return
      } else {
        status = 2
        return
      }
    }
  
    const {
      data, error,
    } = await supabase.from("invoices").insert({
      user_id: user.id,
      invoice_url: paidInvoice.hosted_invoice_url ?? ""
    })
  }

  if (stripeIsConfigured) {
    const { error: creditError, data: credits } = await supabase
      .from("credits")
      .select("credits")
      .eq("user_id", user.id);

    if (creditError) {
      console.error({ creditError });
      return NextResponse.json(
        {
          message: "Something went wrong!",
        },
        { status: 500, statusText: "Something went wrong!" }
      );
    }
  
    if (credits.length === 0) {
      // create credits for user.
      const { error: errorCreatingCredits } = await supabase
        .from("credits")
        .insert({
          user_id: user.id,
          credits: 0,
        });

      if (errorCreatingCredits) {
        console.error({ errorCreatingCredits });
        return NextResponse.json(
          {
            message: "Something went wrong!",
          },
          { status: 500, statusText: "Something went wrong!" }
        );
      }
      await handleTrainAdditionalModel()
    } else if (credits[0]?.credits < 1) {
      await handleTrainAdditionalModel()
    } else {
      _credits = credits;
    }
  }

  if (status == 1) {
    return NextResponse.json(
      {
        message: "Please choose the default payment method. You can click the manage button and then do that",
      },
      { status: 402, statusText: "Please choose the default payment method. You can click the manage button and then do that" }
    );

  } else if (status == 2) {
    return NextResponse.json(
      {
        message: "Please check your payment card. There are some issues on that",
      },
      { status: 500, statusText: "Something went wrong!" }
    );
  }

  const leap = new Leap({
    apiKey: leapApiKey,
  });

  try {
    const trainWebhook = `https://${process.env.VERCEL_URL}/leap/model-handler`;
    console.log(trainWebhook, "=====================trainwebhook")
    const trainWenhookWithParams = `${trainWebhook}?user_id=${user.id}&webhook_secret=${appWebhookSecret}`;

    // const promptWebhook = `https://${process.env.VERCEL_URL}/leap/prompt-webhook`;
    // const promptWebhookWithParams = `${promptWebhook}?user_id=${user.id}&webhook_secret=${appWebhookSecret}`;

    const API_KEY = astriaApiKey;
    const DOMAIN = "https://api.astria.ai";

    const body = {
      tune: {
        title: name,
        // base_tune_id: 690204, //sd15
        base_tune_id: 666678, //sdxl 1.0
        name: type,
        // branch: astriaTestModeIsOn ? "fast" : "sd15",
        branch: "sdxl1",
        token: "ohwx",
        image_urls: images,
        callback: trainWenhookWithParams,
      },
    };

    const response = await axios.post(DOMAIN + "/tunes", body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const { status, statusText, data: tune } = response;

    if (status !== 201) {
      console.error({ status, statusText });
      if (status === 400) {
        return NextResponse.json(
          {
            message: "webhookUrl must be a URL address",
          },
          { status, statusText }
        );
      }
      if (status === 402) {
        return NextResponse.json(
          {
            message: "Training models is only available on paid plans.",
          },
          { status, statusText }
        );
      }
    }
 
    const { error: modelError, data } = await supabase
      .from("models")
      .insert({
        modelId: tune.id, // store tune Id field to retrieve workflow object if needed later
        user_id: user.id,
        name,
        type,
      })
      .select("id")
      .single();

    if (modelError) {
      console.error(modelError);
      return NextResponse.json(
        {
          message: "Something went wrong!",
        },
        { status: 500, statusText: "Something went wrong!" }
      );
    }

    // Get the modelId from the created model
    const modelId = data?.id;

    const { error: samplesError } = await supabase.from("samples").insert(
      images.map((sample: string) => ({
        modelId: modelId,
        uri: sample,
      }))
    );

    if (samplesError) {
      console.error(samplesError);
      return NextResponse.json(
        {
          message: "Something went wrong!",
        },
        { status: 500, statusText: "Something went wrong!" }
      );
    }

    if (stripeIsConfigured && _credits && _credits.length > 0) {
      const subtractedCredits = _credits[0].credits - 1;
      const { error: updateCreditError, data } = await supabase
        .from("credits")
        .update({ credits: subtractedCredits })
        .eq("user_id", user.id)
        .select("*");

      // console.log({ data });
      console.log({ subtractedCredits });

      if (updateCreditError) {
        console.error({ updateCreditError });
        return NextResponse.json(
          {
            message: "Something went wrong!",
          },
          { status: 500, statusText: "Something went wrong!" }
        );
      }
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Something went wrong!",
      },
      { status: 500, statusText: "Something went wrong!" }
    );
  }

  return NextResponse.json(
    {
      message: "success",
    },
    { status: 200, statusText: "Success" }
  );
}
