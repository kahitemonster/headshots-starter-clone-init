import { AvatarIcon } from "@radix-ui/react-icons";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { Button } from "./ui/button";
import Language from "@/components/Language"
import React from "react";
import { Database } from "@/types/supabase";
import ClientSideCredits from "./realtime/ClientSideCredits";
import i18n from "@/app/i18n"

const stripeIsConfigured = true

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Navbar() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: credits,
  } = await supabase.from("credits").select("*").eq("user_id", user?.id ?? '').single()

  const {
    data: paymentUser,
  } = await supabase.from("payments").select("*").eq("user_id", user?.id ?? '').single()

  return (
    <div className="flex w-full px-4 lg:px-40 py-4 items-center text-center gap-8 justify-between absolute top-0 bg-black/50">
      <div className="flex gap-2 justify-between h-full w-full">
        <Link href="/" className="flex justify-center items-center">
          <img src="/logo/logo_picwise.png" className="w-[32px]" />
          <p className="font-bold text-[24px] md:text-[28px] text-white pl-2">PicWise</p>
        </Link>
        {!user &&
          <div className="flex gap-4">
            <Link href="#pricing" className="hidden md:flex justify-center items-center text-white-500">Pricing</Link>
            <Link href="/login" className="flex justify-center items-center text-white">
              {/* <button className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-md text-white font-bold">Sign In</button> */}
              Sign In
            </Link>
            <Link href="/login" className="flex justify-center items-center text-yellow-500">
              {/* <button className="bg-gradient-to-r from-red-500 to-orange-500 p-3 rounded-md text-white font-bold">Sign Up</button> */}
              Sign Up
            </Link>
          </div>
        }
      </div>

      {user && paymentUser && (
        <div className="flex flex-row items-center justify-center gap-4 lg:ml-auto">
          <div className="flex flex-row gap-4 text-center align-middle justify-center">
            {stripeIsConfigured && (
              <ClientSideCredits creditsRow={credits ? credits : null} />
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <AvatarIcon height={24} width={24} className="text-primary" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-[#1A1F21] text-[#A8C3D4]">
                <DropdownMenuLabel className="text-primary text-center overflow-hidden text-ellipsis">{user.email}</DropdownMenuLabel>
                  <div className="flex flex-col items-center justify-center">
                    <Link href="/overview">
                      <Button variant={"ghost"}>Home</Button>
                    </Link>
                    <Link href="https://billing.stripe.com/p/login/test_00gcN9gyE1zC6BO5kl" target="_blank">
                      <Button variant={"ghost"}>Billing</Button>
                    </Link>
                  </div>
                <form action="/auth/sign-out" method="post">
                  <Button
                    type="submit"
                    className="w-full text-left"
                    variant={"ghost"}
                  >
                    Log out
                  </Button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </div>
  );
}
