import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { RxArrowTopRight } from "react-icons/rx";

import img1 from "../../img/Plataforma-05.jpeg";
import img2 from "../../img/Elevador-04.jpeg";
import img3 from "../../img/Camion-Grua-23.jpeg";

const ImageTrackList = [
  { id: 1, src: img1, alt: "Plataforma" },
  { id: 2, src: img2, alt: "Elevador" },
  { id: 3, src: img3, alt: "Camión Grua" },
];

const Slider = () => {
  return (
    <div className="flex items-center justify-center flex-col h-screen bg-[#CECECE] dark:bg-[#3A3A3A]">
      <Swiper
        breakpoints={{
          // cuando el ancho es >= 340px
          340: {
            slidesPerView: 2,
            spaceBetween: 35,
          },
          // cuando el ancho es >= 700px
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="max-w-[90%] lg:max-w-[80%]"
      >
        {ImageTrackList.map((img) => (
          <SwiperSlide
            key={img.id}
          >
            <div
              className="flex flex-col gap-6 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer"
              style={{
                backgroundImage: `url(${img.src})`
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${img.src})` }}
              />
              <div className="absolute inset-0 bg-black opacity-10 group´-hover:opacity-50" />
              <div className="relative flex flex-col gap-3">
              <img.icon className="text-blue-600 group-hover:text-blue400 w-[32px] h-[32px]"/>
              <h1 className="text-xl lg:text-2xl" >
                {img.title}
              </h1>
              <p className="lg:text-[18px]">{img.content}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
