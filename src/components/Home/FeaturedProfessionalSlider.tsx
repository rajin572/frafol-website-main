"use client";
import React from "react";
import FeaturedProfessionalsCard from "../shared/FeaturedProfessionalsCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { IProfessional } from "@/types";

const FeaturedProfessionalSlider = ({ data }: { data: IProfessional[] }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      loop={true}
      pagination={{ clickable: true }}
      breakpoints={{
        540: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1440: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }}
      modules={[EffectFade, Pagination]}
      className="mySwiper pb-10!"
    >
      {data?.map((item, index) => (
        <SwiperSlide key={index}>
          <FeaturedProfessionalsCard item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FeaturedProfessionalSlider;
