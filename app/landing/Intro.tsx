import Form from "@/app/login/form"

export default function Index() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col text-center px-8 pt-20 text-[24px] md:text-[40px] font-Poppins font-medium space-y-1 md:space-y-4 tracking-wider">
        <p className="text-[#00B8F0]">
          You can be everything{" "}
        </p>
        <p className="">
          <span className="text-[#FFFFFF]">whatever you want{" "}</span><span className="text-[#38A2C3]">Using AI</span>
        </p>
      </div>
      <div className="flex items-center justify-center pt-6 w-full">
        {/* <img src="/landing/intro.png" className="w-2/3 md:w-1/2 h-auto" /> */}
        <img src="/landing/intro_final.png" className="w-2/3 md:w-1/2 h-auto" />
      </div>
      <div className="flex items-center justify-center pt-7">
        <p className="w-2/3 md:w-1/2 text-center text-[10px] md:text-[20px]">
          Enhance your profile picture on Google, Linkedin, Twitter, Instagram or any other platform with personalized AI-generated images.
          Upload your photos and receive a collection of stunning, uniquely styled AI-enhanced pictures to make a lasting impression!
        </p>
      </div>
      <div className="flex items-center justify-center mt-[10px] w-full">
        <Form />
      </div>
      <div className="flex flex-row justify-center mt-10">
        <div className="flex flex-row items-center">
          <div className="bg-white w-[5px] md:w-[10px] h-[43px] md:h-[86px]"></div>
          <div className="flex flex-col justify-center font-Pappins text-white pl-4 pr-4 md:pr-20">
            <p className="text-[24px] md:text-[36px] lg:text-[48px] font-bold">250 +</p>
            <p className="text-[10px] md:text-[15px] lg:text-[20px]">Photo styles</p>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="bg-white w-[5px] md:w-[10px] h-[43px] md:h-[86px]"></div>
          <div className="flex flex-col justify-center font-Pappins text-white pl-4 pr-4 md:pr-20">
            <p className="text-[24px] md:text-[36px] lg:text-[48px] font-bold">35.5K +</p>
            <p className="text-[10px] md:text-[15px] lg:text-[20px]">Users</p>
          </div>
        </div>
      </div>

    </div>
  )
}