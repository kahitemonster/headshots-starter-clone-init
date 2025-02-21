import Login from "@/app/login/page";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import PromptsComponent from "./promptsComponent"

export default async function Index({ params }: { params: { id: number, type: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <Login />;
  }

  const { data: modelRow, error } = await supabase
    .from("models")
    .select("*")
    .eq("id", Number(params.id))
    .single()

  // const { data: modelIds } = await supabase
  //   .from("models")
  //   .select("id")
  //   .eq("user_id", user.id)

  // const modelIdsArray: any = []
  
  // modelIds?.map((value) => {
  //   modelIdsArray.push(value.id)
  // })
  
  // const { data: images } = await supabase
  // .from("images")
  // .select("uri")
  // .in("modelId", modelIdsArray)
  // .order("created_at", { ascending: false })
  // .range(10, 20)

  return (
    <div className="mt-[90px] mb-[40px]">
      <PromptsComponent
        paramsType={params.type}
        modelId={modelRow?.modelId}
        userId={user.id}
        paramsId={params.id}
        // imagesData={images}
        stripeSecretKey={stripeSecretKey}
        // modelIdsArray={modelIdsArray}
      ></PromptsComponent>
    </div>
  );
}