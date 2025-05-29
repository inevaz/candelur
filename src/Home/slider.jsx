import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import {Pagination, Autoplay } from "swiper/modules";
import { ServiceData } from "../index";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Slider = () => {
  const swiperRef = useRef(null);  const infoStyles = {
    "top-right": "absolute top-[10%] sm:top-[15%] md:top-20 right-[5%] sm:right-[10%] md:right-20",
    "center-right": "absolute top-[15%] sm:top-[15%] md:top-[20%] left-[5%] sm:left-[5%] lg:right-[75%] transform -translate-y-1/2",
    "left-center": "absolute top-[10%] sm:top-[12%] md:top-[14%] left-[5%] sm:left-[5%] md:left-[5%]",
  };

  const navigate = useNavigate();

  const handleFilterClick = (content) => {
    navigate("/productos", { state: { filtroInicial: content } });
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.update(); 
        
        // Asegurar que el carrusel empieza a moverse después de cargar
        swiperRef.current.swiper.autoplay.start();
        
        // Forza una actualización adicional después de un tiempo
        setTimeout(() => {
          swiperRef.current.swiper.update();
          swiperRef.current.swiper.slideNext();
          swiperRef.current.swiper.slidePrev();
        }, 500);
      }
    }, 100); // un delay pequeño ayuda cuando hay animaciones iniciales o layout shifting
    return () => clearTimeout(timer);
  }, []);
  return (  <div
      className="flex items-center justify-center w-full flex-col lg:px-[3dvh] md:px-[2dvh] px-[1dvh]
    pt-12 sm:pt-8 md:pt-12 pb-6 sm:pb-8 md:pb-12 overflow-hidden"
    >
      {/* Carrusel */}      <Swiper
        ref={swiperRef}
        slidesPerView="auto"
        initialSlide={1}
        centeredSlides={true}
        spaceBetween={20}
        loop={true}
        preloadImages={true}
        updateOnImagesReady={true}
        loopedSlides={ServiceData.length}
        modules={[Pagination, Autoplay]}
        className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[660px] mySwiper"
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        observeParents={true}
        observer={true}
      >
        {ServiceData.map((img) => (          <SwiperSlide key={img.title}>            <div className="h-full w-full group rounded-xl overflow-hidden shadow-lg relative">
              {/* Imagen principal */}              <div
                className={`absolute inset-0 rounded-xl transition-transform duration-300 group-hover:scale-105 bg-slide-${img.filter}`}
                style={{
                  backgroundImage: `url(${img.backgroundImage})`,
                  backgroundSize: img.backgroundStyle || "cover",
                  backgroundPosition: img.backgroundPosition || "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>              {/* Overlay oscuro con contenido */}                <div className={`${infoStyles[img.styles]} flex flex-col gap-1 sm:gap-2 items-center justify-center ${img.title === "Plataformas" ? "max-w-[200px] sm:max-w-[250px] md:max-w-none" : ""}`}>                  <h1 className={`text-2xl sm:text-3xl md:text-5xl font-bold text-white ${img.title === "Plataformas" ? "text-left sm:text-left md:text-center" : "text-center"}`}>
                    {img.title}
                  </h1><Link
                    to="/productos"
                    state={{
                      filtro: img.filter.toLowerCase().replace(/\s/g, "_"),
                    }}
                    className={`w-full max-w-[150px] sm:max-w-[200px] ${img.title === "Plataformas" ? "self-start sm:self-start md:self-center" : ""}`}
                  >
                    <div className="bg-white text-center text-black text-sm sm:text-md w-full rounded-full p-1 sm:p-1.5 font-semibold hover:bg-red-600 hover:text-white transition-colors">
                      Ver productos
                    </div>
                  </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>      {/* Paginación personalizada fuera del carrusel */}
      <div className="cursor-pointer custom-pagination flex pt-3 sm:pt-4 gap-1 sm:gap-2 justify-center">
        {ServiceData.map((_, index) => (
          <div
            key={index}
            className="m-1 sm:m-2 p-1 sm:p-2 border border-black border-2 rounded-full flex items-center justify-center"
          >
            <div
              className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-black opacity-50 transition-opacity duration-300 cursor-pointer"
              onClick={() => swiperRef.current.swiper.slideTo(index)}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
