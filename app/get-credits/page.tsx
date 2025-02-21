import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import StripePricingTable from "@/components/stripe/StripeTable"

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const {
    data: paymentUser,
  } = await supabase.from("payments").select("*").eq("user_id", user?.id ?? '').single()

  if (paymentUser) {
    return redirect("/overview")
  }

  return (
    <StripePricingTable user={user} />
  );
}
