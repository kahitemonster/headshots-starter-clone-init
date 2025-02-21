'use client'

import Stripe from "stripe";
import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

export default function StripeTestComponent({
  stripeSecretKey,
  endpointSecret,
  supabaseUrl,
  supabaseServiceRoleKey
}: {
  stripeSecretKey: string | undefined,
  endpointSecret: string | undefined,
  supabaseUrl: string | undefined,
  supabaseServiceRoleKey: string | undefined
}) {
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

  if (!stripeSecretKey) {
    return (
      <div>
        <p>missing stripe key</p>
      </div>
    )
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2023-10-16",
    typescript: true,
  });

  const handleGenerate = async() => {
    const invoice = await stripe.invoices.create({
      customer: 'cus_P3Sp70l9J8dJYF',
      auto_advance: true,
      collection_method: 'charge_automatically',
    });

    const invoiceItem = await stripe.invoiceItems.create({
      customer: 'cus_P3Sp70l9J8dJYF',
      price: 'price_1ODSs7JpDi0MVrf4Nm9fIqrV',
      currency: "USD",
      description: "pay for images",
      invoice: invoice.id,
      quantity: 4
    });

    await stripe.invoices.finalizeInvoice(
      invoice.id,
      {
        auto_advance: true
      }
    );

    const paidInvoice = await stripe.invoices.pay(
      invoice.id
    );

    const userId="3f867740-d4e2-4ad4-8fea-d51fbf018245"

    const {
      data, error,
    } = await supabase.from("invoices").insert({
      user_id: userId,
      invoice_url: paidInvoice.hosted_invoice_url ?? ""
    })
  }

  return (
    <div>
      <button onClick={handleGenerate}>
        stripe
      </button>
    </div>
  )
}