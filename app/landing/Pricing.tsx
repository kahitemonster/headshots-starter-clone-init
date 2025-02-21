import Link from "next/link";
import { RiCheckLine } from "react-icons/ri";

export default function Index() {
  const prices = [
    {
      credits: "1 Character",
      description: "Get 50+ AI photos monthly in 4K quality",
      price: "$29",
      includes: ["1 character include", "60 headshots include", "$4 additional model cost", "$0.5 additional image cost", "Unlimited Additional model", "Unlimited additional image", "Unlimited style"]
    },
    {
      credits: "3 Characters",
      description: "Get 80+ AI photos monthly in 4K quality",
      price: "$39",
      includes: ["3 characters include", "150 headshots include", "$3.5 additional model cost", "$0.4 additional image cost", "Unlimited Additional model", "Unlimited additional image", "Unlimited style"]
    },
    {
      credits: "5 Characters",
      description: "Get 100+ AI photos monthly in 4K quality",
      price: "$49",
      includes: ["5 characters include", "200 headshots include", "$3 additional model cost", "$0.3 additional image cost", "Unlimited Additional model", "Unlimited additional image", "Unlimited style"]
    }
  ]

  return (
    <div id="pricing" className="px-8 pt-32 pb-24">
      <div className="flex flex-col items-center justify-center col-span-1 px-[40px] md:px-[80px] text-center">
        <div className="text-[24px] text-white md:text-[40px] font-Poppins space-y-1 md:space-y-4 tracking-wider">
          <p>
            Pricing
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center mt-20">
        {prices.map((price, index) => {
          return (
            <div className="cols-span-1 rounded-lg border border-[#363636] p-6" key={`price_${index}`}>
              <p className="text-[24px] mt-[16px] font-Poppins text-white">{price.credits}</p>
              <p className="text-[12px] text-[#A9A9A9]">{price.description}</p>
              <p className="text-[30px] mt-[40px] font-Poppins text-white">{price.price}<span className="text-[20px]"> per month</span></p>
              <Link href="/login">
                <button className="w-full bg-[#7c273c] rounded-lg text-[20px] py-2 px-4 mt-[10px] font-Quicksand">Subscribe</button>
              </Link>
              <p className="mt-[30px] font-Quicksand">This includes</p>
              <div className="space-y-2 mt-[10px] font-Quicksand">
                {price.includes.map((include, index) => {
                  return (
                    <div className="flex flex-row gap-1 items-center" key={`include_${index}`}>
                      <RiCheckLine className="text-[#0075FF]" />
                      <p className="text-[#A9A9A9]">{include}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}