"use client"

import React, { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Database } from "@/types/supabase";
import { useToast } from "@/components/ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { MdOutlineFileDownload } from "react-icons/md";
import { Icons } from "../../../../../../components/icons";

import Stripe from "stripe";
import { createDropdownMenuScope } from "@radix-ui/react-dropdown-menu";

const PromptsComponent = ({
  paramsType,
  paramsId,
  modelId,
  userId,
  // imagesData,
  stripeSecretKey,
  // modelIdsArray
}: {
  paramsType: any,
  paramsId: any,
  modelId: any,
  userId: any,
  // imagesData: any,
  stripeSecretKey: any,
  // modelIdsArray: any
}) => {
  const supabase = createClientComponentClient<Database>();

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2023-10-16",
    typescript: true,
  });

  const { toast } = useToast();

  const imagePrices = [
    // 'price_1OMYd1JpDi0MVrf4OwlgrwmX',
    // 'price_1OMYd1JpDi0MVrf4OwlgrwmX',
    // 'price_1OMYd1JpDi0MVrf4OwlgrwmX'
    "price_1P2GEgJpDi0MVrf4CMm2FtyI",
    "price_1P2GF5JpDi0MVrf4nGOxKvZz",
    "price_1P2GFZJpDi0MVrf4UFukOU6j"
  ]

  const prompts = "wearing a business suit, professional photo, white background, Amazing Details, Best Quality, Masterpiece, dramatic lighting highly detailed, analog photo, overglaze, 80mm Sigma f/1.4 or any ZEISS lens"
  const [prompt, setPrompt] = useState<string>(prompts)
  const [negativePrompt, setNegativePrompt] = useState<string>("(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime:1.4), text, close up, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck",)
  const [numberOfImages, setNumberOfImages] = useState<number>(2)
  const [images, setImages] = useState<any>([])
  const [visiable, setVisiable] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>("https://sdbooth2-production.s3.amazonaws.com/7ea6j8nd6jihqj7nwceu3brv7st1")
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [count, setCount] = useState<number>(0)
  const [showedImageCount, setShowedImageCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const samplePrompts = [
    //linkedin
    "Portrait of an accomplished director standing confidently beside his desk, dressed sharply in a tailored grey suit and patterned tie, making warm eye contact with a look of integrity and ambition, backlit naturally against the urban skyline outside large corner windows in a classically composed style for professional networking",
    "Headshot of an innovative entrepreneur seated at his ergonomic home office desk, dressed professionally in a navy blazer and dress shirt as he carefully reviews documents, rendered through AI photo-realism to represent his competence and focus sincerely for a LinkedIn profile in attracting new prospects",

    "Portrait of a top performer posed sitting at her elegant office desk, dressed smartly in a cobalt pantsuit and lace blouse with statement necklace, offering a cordial yet assured smile while making thoughtful eye contact, brought to life through photorealistic rendering with subtle makeup and delicate features for connecting on LinkedIn.",
    "Headshot of an ambitious manager standing by her wall of framed accomplishments, dressed casually yet tastefully in wide-leg slacks and silk blouse as warm afternoon light illuminates her professional demeanor, composed through AI enhancement emphasizing her authentic essence and warm smile when engaging online",

    //Dating
    "Casual portrait of an adventurous gentleman enjoying lunch at a city sidewalk cafe, dressed stylishly in fitted jeans and a relaxed zip-up sweater, flashing a playful smile while making warm eye contact, brought to life through photorealistic rendering of subtle expression lines and friendly disposition",
    "Three-quarter profile shot of a kind-hearted musician playing jazz at a local lounge, dressed coolly in fitted chinos and a novelty band tee, rendered through AI photo-realism to represent his welcoming charm and laidback charisma for online dating",

    "Outdoor snapshot of a fun-loving bartender posing beside her crowded establishment, dressed fashionably in fitted cargo pants and a cropped band tee while flashing a radiant smile, brought to vivid photorealistic life through AI rendering emphasizing her friendly vitality and approachable essence",
    "Casual headshot of a passionate teacher enjoying a morning cappuccino at her favorite sidewalk cafe, dressed casually chic in high-waisted jeans and an oversized cable knit sweater while offering a warm yet playful smile, composed through principled AI to convey her down-to-earth wit and charm on dating apps",

    //Social media
    "Candid image of an adventurous photographer capturing moments at the beach, dressed comfortably in board shorts and a faded graphic tee while focused on framing his next shot, brought to photorealistic life through AI rendering his relaxed yet vibrant social media presence",
    "Lifestyle portrait of an avid chef preparing gourmet pizzas for friends after work, dressed casually in an apron over fitted chinos and button-down with sleeves rolled up, captured enthusiastically in the moment through AI photo-realism exuding his lively fun-loving spirit online.",

    "Behind-the-scenes snapshot of an artistic dancer stretching before rehearsal, dressed stylishly in leggings and a cropped workout top while flashing a radiant smile, brought to photorealistic life through AI rendering her fit physique, charm and magnetic social media presence",
    "Candid portrait of a world-traveling fashion blogger enjoying a sidewalk cafe in a new city, dressed bohemian-chic in wide-leg pants and an off-the-shoulder blouse while lighting up with joy, captured authentically through principled AI conveying her vibrant zest for adventure online",

    //Business
    "Portrait of an accomplished executive standing confidently in his high-rise corner office surrounded by architectural details and city skylines outside large windows, dressed professionally in a navy suit with power tie while making strong eye contact and gesturing with conviction, brought to life through AI photo-realism emphasizing his commanding yet approachable leadership presence",
    "Headshot of an entrepreneur seated at a boardroom table surrounded by family investors, dressed smartly in a tailored vest and dress shirt while engaging in lively discussion as natural light illuminates his visionary passion, candidly captured and photorealistically rendered through AI to portray his charismatic authority",

    "Portrait of an innovative CEO posed standing beside a modern gallery wall of product designs and accolades, dressed elegantly in a fitted blazer and pleated trousers while making warm eye contact laden with intellect and ambition, brought to vivid life through principled AI rendering emphasizing her accomplished yet approachable executive presence",
    "Three-quarter headshot of a dedicated operations manager seated in her home office reviewing documents while illuminated warmly against a bookshelf of reference materials, dressed professionally in a silk blouse and slacks while immersed analytically in her work, sincerely captured and photorealistically represented through AI to exude her dependable leadership competency"
  ]

  const hoverText = [
    "Linkedin",
    "Linkedin",
    "Linkedin",
    "Linkedin",
    "Dating",
    "Dating",
    "Dating",
    "Dating",
    "Social media",
    "Social media",
    "Social media",
    "Social media",
    "Business",
    "Business",
    "Business",
    "Business"
  ]

  const fetchDataFromDb = async (pageSize: any, pageNumber: any) => {
    const { count } = await supabase
      .from("images")
      .select('*', { count: 'exact', head: true })
      .eq("modelId", paramsId)
      // .in("modelId", modelIdsArray)

    const { data, error, count: imageCount } = await supabase
      .from("images")
      .select("uri")
      .eq("modelId", paramsId)
      // .in("modelId", modelIdsArray)
      .order("created_at", { ascending: false })
      .range((pageNumber - 1) * pageSize, pageNumber * pageSize - 1)

    setCount(count ? count : 0)
    setShowedImageCount(data ? data.length : 0)
    return { data, count }
  }

  const handleLoadPage = async (pageSize: any, pageNumber: any) => {
    const { data, count } = await fetchDataFromDb(pageSize, pageNumber)
    setImages(data)
  }

  const handleLoadNextPage = (pageSize: any, pageNumber: any) => {
    handleLoadPage(pageSize, pageNumber + 1)
    setPageNumber(pageNumber + 1)
  }

  const handleLoadPrevPage = (pageSize: any, pageNumber: any) => {
    handleLoadPage(pageSize, pageNumber - 1)
    setPageNumber(pageNumber - 1)
  }

  useEffect(() => {
    const init = async () => {
      const { Modal, Ripple, initTWE } = await import("tw-elements");
      initTWE({ Modal, Ripple });
    };
    init();
  }, []);

  useEffect(() => {
    handleLoadPage(pageSize, pageNumber)

    const channel = supabase
      .channel("realtime-images")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "images" },
        (payload: { new: { uri: string } }) => {
          handleLoadPage(pageSize, pageNumber)
          // setImages((prevImages: any) => [payload.new, ...prevImages])
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleImagesUpdateDb = async () => {
    setIsLoading(true)

    const { error: creditsError, data: creditsData } = await supabase
      .from("credits")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (creditsError) {
      return
    }

    if (creditsData.images >= numberOfImages) {
      const { data: creditsUpdatedData, error: creditsUpdateError } = await supabase
        .from("credits")
        .update({
          images: creditsData.images - numberOfImages,
        })
        .eq("user_id", userId)
        .select();

      handleGenerate(numberOfImages)
    } else {
      const { data: creditsUpdatedData, error: creditsUpdateError } = await supabase
        .from("credits")
        .update({
          images: 0,
        })
        .eq("user_id", userId)
        .select();
      handleMakeInvoice(numberOfImages - creditsData.images, creditsData.images)
    }
  }

  const handleMakeInvoice = async (quantity: number, databaseNumber: number) => {
    const { data: paymentsData, error: paymentsError } = await supabase
      .from("payments")
      .select()
      .eq("user_id", userId)
      .single()

    if (paymentsError) {
      return
    }

    const invoice = await stripe.invoices.create({
      customer: paymentsData.customer_id,
      auto_advance: true,
      collection_method: 'charge_automatically',
    });

    const invoiceItem = await stripe.invoiceItems.create({
      customer: paymentsData.customer_id,
      price: imagePrices[Number(paymentsData.plan_id) - 1],
      currency: "USD",
      description: "Pay for model",
      invoice: invoice.id,
      quantity: quantity
    });

    await stripe.invoices.finalizeInvoice(
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
      if (err.code === "missing") {
        handleGenerate(databaseNumber)
        toast({
          description: "Please choose the default payment method. You can click the manage button and then do that",
          duration: 5000,
        });

        return
      } else {
        handleGenerate(databaseNumber)
        toast({
          description: "Something went wrong, please check your payment account",
          duration: 5000,
        });
        return
      }
    }

    const {
      data, error,
    } = await supabase.from("invoices").insert({
      user_id: userId,
      invoice_url: paidInvoice.hosted_invoice_url ?? ""
    })

    handleGenerate(numberOfImages)
  }

  const handleGenerate = async (number: number) => {
    setIsLoading(false)

    if (number > 0) {
      const payload = {
        prompt,
        negativePrompt,
        number,
        modelId,
        paramsType,
      };

      const response = await fetch("/leap/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log(response, "==============response")

      toast({
        description: "Generating now, wait please...",
        duration: 5000,
      });
    }
  }

  const downloadImage = (imageUrl: string) => {
    fetch(imageUrl+"?_")
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'image.jpg');
        link.click();
      })
      .catch(error => {
        console.error('Error downloading the image:', error);
      });
  }

  return (
    <div className="flex gap-10 max-md:flex-col">
      <div className="md:max-w-[360px] w-full">
        <Link href="/overview" className="text-sm w-fit">
          <button
            className="flex items-center gap-2 max-md:w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            <p>Go back</p>
            {/* <p>Wracać</p> */}
          </button>
        </Link>
        <div className="grid grid-cols-4 md:grid-cols-2 gap-1">
          {[...Array(16)].map((number, index) => {
            return (
              <div className="inline-block p-1" key={`explain${index}`} onClick={() => setPrompt(samplePrompts[index])}>
                <div className="relative">
                  <a className="absolute inset-0 z-10 bg-black text-center flex flex-col items-center justify-center opacity-0 hover:opacity-50 bg-opacity-90 duration-300">
                    <p className="mx-auto">{hoverText[index]}</p>
                  </a>
                  <a href="#" className="relative">
                    <div className="flex flex-wrap content-center">
                      <img
                        src={`/compressedFinalPrompt/${index + 1}.jpg`}
                        className="mx-auto  rounded-[20px]"
                        alt=""
                      />
                    </div>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="w-full text-white">
        <div>
          <div className="mb-3.5">
            Prompt
            {/* Podpowiedź */}
            <button
              className="flex items-center gap-2 float-right bg-transparent text-gray-500 hover:text-gray-300 px-4 py-2 rounded-md"
              onClick={() => setVisiable((prev) => !prev)}
            >
              {visiable ? "Hide " : "Show "}Advanced settings
              {/* {visiable ? "Ukrywać " : "Pokazywać "}Zaawansowane ustawienia */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>

            </button>
          </div>
          <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} className="mb-2.5 border-[#1d3444]" />
          {visiable &&
            <div>
              <div className="mb-2.5">
                Negative prompt
                {/* Podpowiedź negatywna */}
              </div>
              <Textarea value={negativePrompt} onChange={(e) => setNegativePrompt(e.target.value)} rows={4} className="mb-2.5 border-[#1d3444]" />
              <div className="mb-2.5">
                Number of images
                {/* Liczba obrazów */}
              </div>
              <Input value={numberOfImages} onChange={(e) => setNumberOfImages(Number(e.target.value))} type="number" className="mb-2.5 border-[#1d3444]"></Input>
            </div>
          }

          {isLoading === false ?
            <Button onClick={handleImagesUpdateDb} className="flex items-center gap-2 w-full bg-gray-200 text-black hover:bg-gray-100 mt-2.5 text-[20px]">
              Generate
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </Button>
            :
            <Button className="flex items-center gap-2 w-full bg-gray-200 text-black hover:bg-gray-100 mt-2.5 text-[20px] cursor-not-allowed" disabled>
              Generate
              <Icons.spinner className="h-4 w-4 animate-spin" />
            </Button>
          }
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
          {images.map((value: any) => {
            return (
              <img
                src={value.uri}
                className="rounded-md object-cover"
                key={`result${value.uri}`}
                data-twe-toggle="modal"
                data-twe-target="#imageModal"
                data-twe-ripple-init
                onClick={async () => {
                  const { Modal, Ripple, initTWE } = await import("tw-elements");
                  initTWE({ Modal, Ripple });
                  setImageUrl(value.uri ?? "")
                }}
                loading="lazy"
              />
            )
          })}
        </div>
        <div className="w-full flex flex-col md:flex-row justify-center md:justify-between items-center mt-4">
          <div className="justify-start pt-2">
            <p>Showing {(pageNumber - 1) * pageSize + 1} to {(pageNumber - 1) * pageSize + showedImageCount} in {count} entries</p>

          </div>
          <div className="justify-end pt-2">
            <div className="flex gap-4">
              {pageNumber > 1 &&
                <a className="flex items-center justify-center px-4 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-100 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white" onClick={() => handleLoadPrevPage(pageSize, pageNumber)}>
                  Previous
                </a>
              }
              {pageNumber * pageSize < count &&
                <a className="flex items-center justify-center px-4 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-100 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white" onClick={() => handleLoadNextPage(pageSize, pageNumber)}>
                  Next
                </a>
              }
            </div>
          </div>

        </div>
      </div>

      <div
        data-twe-modal-init
        className="fixed left-0 top-0 z-[1055] hidden h-full w-full bg-black/50"
        id="imageModal"
        aria-labelledby="imageModalLabel"
        aria-hidden="true">
        <div
          data-twe-modal-dialog-ref
          className="pointer-events-none mx-auto">
          <div className="pointer-events-auto w-full px-10 absolute top-1/2 -translate-y-1/2 max-w-[700px] left-1/2 -translate-x-1/2">
            <div className="relative">
              <img src={imageUrl} alt="" />
              {/* <a href={imageUrl} download={"1.jpg"} target="_blank" title="ImageName">Download</a> */}
              <div className="absolute top-4 right-4 cursor-pointer">
                <MdOutlineFileDownload onClick={() => downloadImage(imageUrl)} fontSize={32} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromptsComponent
