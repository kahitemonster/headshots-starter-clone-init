import Link from "next/link";

export default function Index() {
  return (
    <div className="flex flex-col font-Poppins py-[100px]">
      <p className='text-[24px] md:text-[40px] font-medium text-center text-white space-y-1 md:space-y-4 tracking-wider pb-10 md:pb-20'>
        Profile Create
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 mx-6">
        <div>
          <img src="/profile/profile_final.png" />
        </div>
        <div className="flex flex-col bg-gradient-to-br from-[#000303] via-[#010E10] to-[#012328] gap-4 justify-center items-center py-10 md:py-0">
          <p className="pb-20 text-white text-[24px] md:text-[36px] lg:text-[48px]">
            Picwise.pro
          </p>
          <Link href="/login" className="flex justify-center w-full">
            <button className="bg-gradient-to-r from-cyan-900 to-cyan-500 w-2/3 rounded-md p-4 text-white">Sign up & Generate </button>
          </Link>
        </div>
      </div>
    </div>
  )
}