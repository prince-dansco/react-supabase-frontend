import React, { useEffect } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { slidesData } from "../const/constDataSwiper";
import AOS from "aos";
import "aos/dist/aos.css";

const MySwiper = () => {
  useEffect(() => {
          AOS.init({
            duration: 800,
            easing: "ease-out",
            once: false,
          });
        }, []);
  
  return (
    <div style={{ position: "relative" }} className="lg:px-32 md:px-22 px-3"
     data-aos="zoom-in-down"
    >
      <Swiper
        modules={[ Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        
        pagination={{ clickable: true, el: ".swiper-pagination-custom" }}
        autoplay={{ delay: 100 }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
        }}
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div           
              className="p-3 shadow-md rounded-sm max-w-[400px] w-full my-5 mx-auto max-h-[600px] h-full min-h-[480px]"
            >
              {slide.image ? (
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-auto object-cover rounded-xl"
                />
              ) : (
                <div
                >
                  No Image Available
                </div>
              )}
              <h2
                className="mt-3 text-xl font-bold text-center"
              >
                {slide.title}
              </h2>
              <p  className="text-sm text-start text-gray-500 px-3 truncate-2 py-2">{slide.content}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="swiper-pagination-custom "
        style={{ marginTop: "4px", textAlign: "center", marginBottom: "20px" }}
      />
    </div>
  );
};
export default MySwiper;
