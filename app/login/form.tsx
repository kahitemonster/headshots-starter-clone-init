"use client"

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

import Messages from "./messages";

export default function Form() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <div className="flex-1 flex flex-col min-w-[300px] max-w-[800px] mt-[20px]  justify-center gap-2">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 "
        action="/auth/sign-in"
        method="post"
      >
        {message ? (
          <Card className="cta-box bg-transparent">
            <CardContent className="grid gap-4 mt-6 pb-0">
              <Messages />
              <div className="flex items-center justify-center">
                <p className="text-lg text-white ">
                  Wrong email address?
                </p>
              </div>
              <input
                className="rounded-md px-4 py-2 bg-inherit border text-white"
                name="email"
                placeholder="Try again with correct email..."
                required
              />
              <Button className="gradient-button">Start taking AI photos now →</Button>
              <CardFooter className="justify-center">
                <p className="text-sm text-white">
                  After signup/signin please check your inbox/spam folder. Email providers sometimes flag new senders as spam.
                </p>
              </CardFooter>
            </CardContent>
          </Card>
        ) : (
          <Card className="cta-box bg-transparent">
            <CardContent className="grid gap-4 mt-6 pb-0">
              <input
                className="rounded-md px-4 py-2 bg-inherit border text-white"
                name="email"
                placeholder="Type your email..."
                required
              />
              <Button className="gradient-button">Start taking AI photos now →</Button>
              <Messages />
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-sm text-white">
                After signup/signin please check your inbox/spam folder. Email providers sometimes flag new senders as spam.
              </p>
            </CardFooter>
          </Card>
        )}

      </form>
    </div>
  );
}