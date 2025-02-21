'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

var settings = {
  dots: false,
  arrows: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

export default function ImageSlider() {
  return (
    <div className="flex flex-col my-[50px] md:my-[100px] lg:my-[150px]">
      <div className="flex justify-center text-center text-white px-8 pt-20 text-[24px] md:text-[40px] font-Poppins font-medium space-y-1 md:space-y-4 tracking-wider">
        Examples of AI headshots
      </div>
      <div className="mt-[40px] md:mt-[50px] lg:mt-[60px] max-w-[calc(100vw-20px)]">
        <Slider {...settings}>
          {[...Array(17)].map((_, index) =>
            <div key={`detail_${index}`} className="rounded-lg">
              <img src={`/examples/example (${index + 1}).png`} alt="" className='w-full rounded-md p-2' />
            </div>
          )}
        </Slider>
      </div>
    </div>
  );
}
