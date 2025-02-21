import React from 'react'

const DetailedImage = () => {
  return (
    <div className='max-w-6xl max-md:px-4 px-10 pt-20'>
      <p className='max-md:text-xl text-4xl font-medium md:text-center mb-6'>
        The most detailed AI image generator for people
      </p>
      <p className='md:text-center mb-14 md:text-lg'>
        FaceTune is capable of extreme detail going from wide shots to extreme close ups and macro photography.
        To try it, make sure to disable the upscaler and Faceswap and you will get the raw output with extreme detail.
      </p>
      <div className='grid grid-cols-4 max-md:grid-cols-2 gap-2'>
        {[...Array(4)].map((_, index) =>
          <img src={`/images/detail-${index + 1}.jpeg`} alt="" className='rounded-md' key={`detail_${index}`}/>
        )}
      </div>
    </div>
  )
}

export default DetailedImage;