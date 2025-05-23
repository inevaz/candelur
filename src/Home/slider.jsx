import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { ServiceData } from "../index";

const Slider = () => {
  const swiperRef = useRef(null);
  const infoStyles = {
    "top-right": "absolute top-6 right-10",
    "center-right": "absolute top-[50%] right-10 transform -translate-y-1/2",
    "left-center": "absolute top-[30%] left-10",
  };
  return (
    <div className="flex items-center justify-center w-full flex-col lg:px-[3dvh] md:px-[2dvh] sm:px-[0dvh]
    py-12">
      {/* Carrusel */}
      <Swiper
        ref={swiperRef}
        slidesPerView={1.2}
        centeredSlides={true}
        spaceBetween={30}
        loop={true}
        modules={[FreeMode, Pagination]}
        className="w-full h-[600px] mySwiper"
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
      >
        {ServiceData.map((img) => (
          <SwiperSlide key={img.title}>
            <div className="h-full w-full group rounded-xl overflow-hidden shadow-lg cursor-pointer relative">
              {/* Imagen principal */}
              <div
                className="absolute inset-0 rounded-xl bg-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${img.backgroundImage})`,
                  backgroundSize: img.backgroundStyle || "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>

              {/* Overlay oscuro con contenido */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 flex flex-col justify-end p-6 rounded-xl">
                <div className={infoStyles[img.infoVariant]}>
                  <h1 className="text-xl font-bold text-white">{img.title}</h1>
                  <p className="text-sm font-light text-white">{img.content}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Paginación personalizada fuera del carrusel */}
      <div className="cursor-pointer custom-pagination flex pt-4 gap-2 justify-center">
        {ServiceData.map((_, index) => (
          <div
            key={index}
            className="m-2 p-2 border border-black border-2 rounded-full flex items-center justify-center"
          >
            <div
              className="w-2.5 h-2.5 rounded-full bg-black opacity-50 transition-opacity duration-300 cursor-pointer"
              onClick={() => swiperRef.current.swiper.slideTo(index)}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;