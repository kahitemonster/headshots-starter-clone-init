import React from 'react'
import { TbStarFilled } from "react-icons/tb";
import { RiCheckboxFill } from "react-icons/ri";

const MOCKUP_DATA = [
  {
    description: '"Absolutely blown away by the AI headshot service! The generated headshot perfectly captured my professional essence and exceeded my expectations"',
    name: 'Harper B.'
  },
  {
    description: '"Impressed by the AI headshot service\'s ability to produce a polished and professional image in seconds. It saved me valuable time and delivered outstanding results"',
    name: 'Caleb M.'
  },
  {
    description: '"The AI headshot service is a game-changer! I received a stunning headshot that perfectly represents my brand and has received rave reviews from my colleagues and clients"',
    name: 'Ava R.'
  }
]

const CustomerSection = () => {
  return (
    <div className='max-w-6xl px-8 py-20'>
      <p className='text-[24px] md:text-[40px] px-[20px] font-medium font-Poppins text-center text-white mb-14 space-y-1 md:space-y-4 tracking-wider'>
        This is what people are saying about AI images
      </p>
      <div className='grid grid-cols-3 max-md:grid-cols-1 gap-10'>
        {MOCKUP_DATA.map((data, customer_index) => (
          <div className="p-4 border-[1px] border-[#2E7276] text-white rounded-lg" key={`customer_${customer_index}`}>
            <div className='flex gap-2 mb-4'>
              {[...Array(5)].map((_, index) =>
                <TbStarFilled key={`star_${index}`} className='text-[#FFC107]' size={36} />
              )}
            </div>
            <p className='mb-6'>{data.description}</p>
            <div className='flex justify-between items-center'>
              <p className='font-bold'>{data.name}</p>
              {/* <p className='flex gap-1 text-xs uppercase items-center text-gray-400'>
                <RiCheckboxFill color='61EA5E' className="text-white"/>
                Verified Purchase
              </p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomerSection;