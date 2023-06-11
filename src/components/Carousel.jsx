// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Carousel = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="w-full relative mt-24 h-96"
    >
      <SwiperSlide>
        <img
          src="/assests/images/electronics.jpg"
          className="absolute object-cover brightness-75 block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          alt="..."
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/assests/images/furniture.jpg"
          className="absolute object-cover brightness-75 block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          alt="..."
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/assests/images/shoewear.jpg"
          className="absolute object-cover brightness-75 block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          alt="..."
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
