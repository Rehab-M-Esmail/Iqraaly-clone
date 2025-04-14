'use client';

import dynamic from 'next/dynamic';

//importing react-slick dynamically
const Slider = dynamic(() => import('react-slick'), { ssr: false });

const Carousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full py-8">
      <Slider {...settings}>
        <div className="h-[80vh] flex justify-center items-center">
          <img
            src="/images/audi1.jpg"
            alt="Offer 1"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="h-[80vh] flex justify-center items-center">
          <img
            src="/images/audi6.jpg"
            alt="Offer 2"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="h-[80vh] flex justify-center items-center">
          <img
            src="/images/audi5.jpg"
            alt="Offer 3"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="h-[80vh] flex justify-center items-center">
          <img
            src="/images/audi7.png"
            alt="Offer 4"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;




  