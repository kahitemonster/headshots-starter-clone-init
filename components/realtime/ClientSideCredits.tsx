"use client";

import { Database } from "@/types/supabase";
import { creditsRow } from "@/types/utils";
import { createClient } from "@supabase/supabase-js";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useEffect, useState } from "react";

export const revalidate = 0;

type ClientSideCreditsProps = {
  creditsRow: creditsRow | null;
};

export default function ClientSideCredits({
  creditsRow,
}: ClientSideCreditsProps) {

  if (!creditsRow) return (
    <div className="flex flex-row gap-2 min-w-[180px]">
      <p>Person: 0</p>
      <p>Images: 0</p>
    </div>
  )

  // const supabase = createClient<Database>(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  // );

  const supabase = createClientComponentClient<Database>();

  const [credits, setCredits] = useState<creditsRow>(creditsRow);

  useEffect(() => {
    const channel = supabase
      .channel("realtime credits")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "credits" },
        (payload: { new: creditsRow }) => {
          if(payload.new.id === credits.id) {
            setCredits(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, credits, setCredits]);

  if (!credits) return null;

  return (
    <div className="flex flex-row gap-2 min-w-[180px]">
      <p>Person: {credits.credits}</p>
      <p>Images: {credits.images}</p>
    </div>
  );
}
