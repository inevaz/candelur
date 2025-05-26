import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { ServiceData } from "../index";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Slider = () => {
  const swiperRef = useRef(null);
  const infoStyles = {
    "top-right": "absolute top-20 right-20",
    "center-right": "absolute top-[20%] right-[75%] transform -translate-y-1/2",
    "left-center": "absolute top-[14%] left-[5%]",
  };

  const navigate = useNavigate();

  const handleFilterClick = (content) => {
    navigate("/productos", { state: { filtroInicial: content } });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.update(); // 👈 forza a recalcular
      }
    }, 100); // un delay pequeño ayuda cuando hay animaciones iniciales o layout shifting
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="flex items-center justify-center w-full flex-col lg:px-[3dvh] md:px-[2dvh] sm:px-[0dvh]
    py-12"
    >
      {/* Carrusel */}
      <Swiper
        ref={swiperRef}
        slidesPerView={1.2}
        spaceBetween={30}
        centeredSlides={true}
        initialSlide={1}
        modules={[FreeMode, Pagination]}
        className="w-full h-[660px] mySwiper"
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        observeParents={true}
        observer={true}
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
                <div className={`${infoStyles[img.styles]} flex flex-col gap-2 items-center justify-center`}>
                  <h1 className="text-5xl font-bold text-white">
                      {img.title}
                    </h1>
                  <Link
                    to="/productos"
                    state={{
                      filtro: img.filter.toLowerCase().replace(/\s/g, "_"),
                    }}
                    className="w-full"
                  >
                    <div className="bg-white text-center text-black text-md w-full rounded-full p-1 font-semibold hover:bg-red-600 hover:text-white">
                      Ver productos
                    </div>
                  </Link>
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
