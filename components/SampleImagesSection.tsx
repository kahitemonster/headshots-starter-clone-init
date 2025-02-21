import "@/app/globals.css";

export default function SampleImagesSection() {
  return (
    <div className="pt-40 relative">
      {[...Array(24)].map((_, index) => {
        return (
          <div key={`image_${index}`} className={`sm:w-1/4 md:w-1/6 lg:w-1/8 w-1/2 inline-block align-top ${index % 2 == 0 ? "-mt-20" : ""} `}>
            <img
              className="object-cover mx-auto w-full p-3 rounded-[20px]"
              src={`/images/image (${index + 1}).jpg`}
            >
            </img>
          </div>
        )
      })}
      <div className="landing-main-top-gradient"></div>
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-10 absolute top-0 left-1/2 max-w-6xl w-full -translate-x-1/2 md:-translate-y-1/2 px-10 z-10">
        <div className="p-4 text-center flex flex-col items-center border-2 border-red-800 rounded-lg bg-white text-black gap-5 leftTransition">
          <p className="font-medium text-lg">
            "Photo AI is making money by selling the computing cycles required to run the prompts and spit out a set of images"
          </p>
          <img alt="TechCrunch" className="h-[25px]" loading="lazy" src="https://avatarai.me/assets/techcrunch.png" />
        </div>
        <div
          className="p-4 text-center flex flex-col items-center border-2 border-red-800 rounded-lg bg-white text-black gap-5 transition ease-in-out hover:scale-110 duration-1000"
        >
          <p className="font-medium text-lg">
            "Photo AI can help content creators save time and money as they'll no longer need to travel or hire expensive photographers to do photoshoots"
          </p>
          <img alt="TechCrunch" className="h-[25px] w-[40px]" loading="lazy" src="https://photoai.com/assets/zdnet.png" />
        </div>
        <div className="p-4 text-center flex flex-col items-center border-2 border-red-800 rounded-lg bg-white text-black gap-5 rightTransition">
          <p className="font-medium text-lg">
            "Photo AI will be able to generate a virtually limitless number of portraits of that person with different clothing..."
          </p>
          <img alt="TechCrunch" className="h-[25px]" loading="lazy" src="https://photoai.com/assets/fastcompany.svg" />
        </div>
      </div>
    </div>
  )
}
