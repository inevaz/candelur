import React, { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ServiceData } from "../index";
import { Link } from "react-router-dom";

const Slider = () => {

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    contain: true,
    loop: true,
  });
  const autoplayRef = useRef(null);
  const [selected, setSelected] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const infoStyles = {
    "top-right":
      "absolute top-[10%] sm:top-[15%] md:top-20 right-[5%] sm:right-[10%] md:right-20",
    "center-right":
      "absolute top-[15%] sm:top-[15%] md:top-[20%] left-[5%] sm:left-[5%] md:left-[10%] lg:right-[75%] transform -translate-y-1/2",
    "left-center":
      "absolute top-[10%] sm:top-[12%] md:top-[14%] left-[5%] sm:left-[5%] md:left-[5%]",
  };

  // Preload images to avoid blank slides on autoplay/scroll
  useEffect(() => {
    ServiceData.forEach((s) => {
      if (s?.backgroundImage) {
        const img = new Image();
        img.src = s.backgroundImage;
      }
    });
  }, []);

  // Embla init: pagination, autoplay, reInit on select
  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.reInit();

    // autoplay usando scrollTo para controlar duration (ms)
    const play = () => {
      stop();
      autoplayRef.current = setInterval(() => {
        if (!emblaApi) return;
        const nextIndex = (emblaApi.selectedScrollSnap() + 1) % emblaApi.scrollSnapList().length;
        // duration en ms (ej: 600). Ajustá este valor para la duración de la animación.
        emblaApi.scrollTo(nextIndex, { duration: 1000 });
      }, 5000); // intervalo entre cambios (ms)
    };
    const stop = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    play();

    return () => {
      stop();
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="py-12 slider-wrapper px-4">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {ServiceData.map((item, idx) => (
            <div key={item.title + idx} className="embla__slide home-slide">
              <div className="slide-card rounded-xl overflow-hidden relative">
                <img
                  src={item.backgroundImage}
                  alt={item.title}
                  className="slide-img object-cover w-full h-full"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black opacity-45"></div>
                <div
                  className={`${infoStyles[item.styles]} flex flex-col gap-1 sm:gap-2 items-center justify-center ${
                    item.title === "Plataformas"
                      ? "max-w-[200px] sm:max-w-[250px] md:max-w-none"
                      : ""
                  }`}
                >
                  <h1
                    className={`text-2xl sm:text-3xl md:text-5xl font-sans  font-medium text-white ${
                      item.title === "Plataformas"
                        ? "text-left sm:text-left md:text-center"
                        : "text-center"
                    }`}
                  >
                    {item.title}
                  </h1>
                  <Link
                    to="/productos"
                    state={{ filtro: item.filter.toLowerCase().replace(/\s/g, "_") }}
                    className={`w-full max-w-[150px] sm:max-w-[200px] ${
                      item.title === "Plataformas"
                        ? "self-start sm:self-start md:self-center"
                        : ""
                    }`}
                  >
                    <div className="bg-white text-center font-sans text-sm sm:text-md w-full rounded-full p-1 sm:p-1.5 font-semibold hover:bg-red-600 hover:text-white dark:text-black transition-colors">
                      Ver productos
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bullets (usa scrollSnaps para mantener comportamiento similar al anterior) */}
      <div className="flex pt-3 sm:pt-4 gap-1 sm:gap-2 justify-center">
        {scrollSnaps.map((_, idx) => (
          <button
            key={idx}
            onClick={() => emblaApi && emblaApi.scrollTo(idx)}
            className={`w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full transition-opacity duration-500 ${
              selected === idx ? "bg-red-500 opacity-100" : "bg-gray-400 opacity-70"
            }`}
            aria-label={`Ir a slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;