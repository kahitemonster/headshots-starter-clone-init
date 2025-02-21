import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";

export default async function Footer() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: paymentUser,
  } = await supabase.from("payments").select("*").eq("user_id", user?.id ?? '').single()

  return (
    <div>
      {user && !paymentUser ? (
        <div>
        </div>
      ) :
        <footer className="pt-[60px] font-Poppins bg-gradient-to-br from-[#000303] via-[#010E10] to-[#012328]">
          <div className="max-w-6xl py-8 mx-auto px-4">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 justify-between w-full">
              <div className="flex flex-col gap-6 col-span-4">
                <p className="font-medium text-3xl text-white">Picwise.pro</p>
                <a href="mailto:contact@picwise.pro" className="w-fit">
                  <span className="text-lg font-medium">Email:</span> contact@picwise.pro
                </a>
                {/* <span>Mobile: +48 797 773 038</span> */}
              </div>
              <div className="flex flex-col gap-1 col-span-4 md:col-span-2 mt-4 md:mt-0">
                <p className="text-2xl font-medium mb-3 text-white">Top AI Packs</p>
                <a href="#">Linkedin style</a>
                <a href="#">Dating style</a>
                <a href="#">Sports style</a>
                <a href="#">Social media style</a>
                <a href="#">Tinder style</a>
                <a href="#">Travel style</a>
              </div>
              <div className="flex flex-col gap-1 col-span-4 md:col-span-2 mt-4 md:mt-0">
                <p className="text-2xl font-medium mb-3 text-white">Company</p>
                <a href="#">Contact US</a>
                <a href="#">Terms of service</a>
                <a href="#">Privacy policy</a>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="h-[1px] w-2/3 bg-white/20"></div>
          </div>
          <p className="text-center py-8">Copyright @ 2024 Picwise.pro all rights reserved</p>
        </footer>
      }
    </div>
  );
}
