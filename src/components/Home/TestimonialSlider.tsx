"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { ITestimonial } from "@/types/testimonial.type";
import TestimonialCard from "./TestimonialCard";

const TestimonialSlider = ({ data = [] }: { data: ITestimonial[] }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      // navigation={true}
      breakpoints={{
        540: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1440: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
      }}
      modules={[EffectFade, Autoplay]}
      className="mySwiper"
    >
      {data?.map((item, index) => (
        <SwiperSlide key={index}>
          <TestimonialCard testimonial={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialSlider;
