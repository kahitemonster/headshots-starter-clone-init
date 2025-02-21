import { RiCheckboxFill, RiCloseFill } from "react-icons/ri";

export default function Index() {
  const titles = ["Competitor A", "Picwise.pro", "Competitor B"]

  const description = [[
    { flag: false, name: "Low photorealism" },
    { flag: true, name: "No resemblance" },
    { flag: true, name: "Low resolution" },
    { flag: true, name: "Maintains ethnicity" },
    { flag: true, name: "Distorted" }
  ],
  [
    { flag: true, name: "High photorealism" },
    { flag: true, name: "High resemblance" },
    { flag: true, name: "High resolution" },
    { flag: true, name: "Maintains ethnicity" },
    { flag: true, name: "Clear and sharp" }
  ],
  [
    { flag: false, name: "Medium photorealism" },
    { flag: false, name: "Low resemblance" },
    { flag: false, name: "Low resolution" },
    { flag: false, name: "Changes ethnicity" },
    { flag: true, name: "Clear and sharp" }
  ]]

  return (
    <div className='max-w-6xl px-8 py-20'>
      <p className='text-[24px] md:text-[40px] font-Poppins text-center font-medium space-y-1 md:space-y-4 tracking-wider text-white mb-14'>
        How Does Picwise.pro Compare To Other AI Image Generators?
      </p>
      <div className='grid grid-cols-3 max-md:grid-cols-1 font-Poppins gap-10'>
        {[...Array(3)].map((_, index) =>
          <div className="flex flex-col rounded-lg" key={`competitor_${index}`}>
            <img src={`/competitor/competitor ${index + 1}.jpg`} className="rounded-md"></img>
            <div className="p-4 bg-black">
              <div className="text-white py-4">
                {titles[index]}
              </div>
              {description[index].map((value, index) => {
                return (
                  <div key={`competitorDes_${index}`} className="flex flex-row items-center gap-2">
                    {/* {titles[index]} */}
                    {value.flag ?
                      <RiCheckboxFill color='#61EA5E' className="text-white" />
                      :
                      <RiCloseFill color='red' className="text-white" />
                    } 
                    {value.name}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}