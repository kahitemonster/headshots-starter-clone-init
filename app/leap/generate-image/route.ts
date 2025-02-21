import { Database } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";

export const dynamic = "force-dynamic";

const astriaApiKey = process.env.ASTRIA_API_KEY;
const appWebhookSecret = process.env.APP_WEBHOOK_SECRET;

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({}, { status: 401, statusText: "Unauthorized!" });
  }
  
  const payload = await request.json();
  if (!astriaApiKey) {
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

  try {
    const promptWebhook = `https://${process.env.VERCEL_URL}/leap/image-webhook`;
    const promptWebhookWithParams = `${promptWebhook}?user_id=${user.id}&webhook_secret=${appWebhookSecret}&lora_id=${payload.modelId}`;

    const Endpoint = `https://api.astria.ai/tunes/666678/prompts`;
    // const Endpoint = `https://api.astria.ai/tunes/690204/prompts`;
    const API_KEY = astriaApiKey;

    const body = {
      prompt: {
        text : `<lora:${payload.modelId}:0.75> ohwx ${payload.paramsType}, ${payload.prompt}`,
        // text : `ohwx ${payload.paramsType}, ${payload.prompt}`,
        negative_prompt : payload.negativePrompt,
        super_resolution : true,
        face_correct : true,
        callback : promptWebhookWithParams,
        num_images: payload.number,
      }
    };

    const response = await axios.post(Endpoint, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const { status } = response;

    if (status !== 201) {
      console.error({ status });
      if (status === 400) {
        return NextResponse.json(
          {
            message: "webhookUrl must be a URL address",
          },
          { status }
        );
      }
      if (status === 402) {
        return NextResponse.json(
          {
            message: "It is only available on paid plans.",
          },
          { status }
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
