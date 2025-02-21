import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Login from "@/app/login/page"

import Intro from "@/app/landing/Intro"
import Example from "@/app/landing/Example"
import CustomerSection from "@/app/landing/CustomerSection";
import Competitor from "@/app/landing/Competitor";
import Protect from "@/app/landing/Protect"
import Profile from "@/app/landing/Profile"
import Questions from "@/app/landing/Questions";
import Pricing from "@/app/landing/Pricing";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: paymentUser,
  } = await supabase.from("payments").select("*").eq("user_id", user?.id ?? '').single()

  if (user) {
    if (paymentUser) {
      return redirect("/overview");
    }
    else return redirect("/get-credits");
  }

  return (
    <div className="gradient-background">
      <div className="flex flex-col items-center">
        <Intro />
        <Example />
        <CustomerSection />
        <Competitor />
        <Protect />
        <Pricing />
        <Profile />
        <Questions />
      </div>
    </div>

  );
}
