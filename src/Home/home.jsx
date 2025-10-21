import React, { useState, useEffect, useRef } from 'react'
import Slider from './slider'

const home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const [brandsVisible, setBrandsVisible] = useState(false);
  const textRef = useRef(null);
  const brandsRef = useRef(null);

  //el texto
  const fullText = "Ofrecemos soluciones en maquinaria para distintos tipos de proyectos, con opciones tanto de alquiler como de venta. Consultanos para encontrar el equipo que mejor se adapte a tus necesidades.";

  //MARCAS  (por si en un futuro papa lenzi nos pasa mas y asi agregamos)
  const marcas = [
    { id: 1, name: "JLG", src: "/img/jlg_logo.png", url: "https://www.jlg.com/en" },
    { id: 2, name: "Genie", src: "/img/genie_logo.png", url: "https://www.genielift.com/es" },
    { id: 3, name: "Manitou", src: "/img/manitou_logo.png", url: "https://www-manitou--group-com.translate.goog/en/?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc" },
    { id: 4, name: "MKG", src: "/img/mkg_logo.png", url: "https://www-mkg--export-com.translate.goog/?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc" }
  ];  //useEffect para detectar cuando el texto entra en vista
  useEffect(() => {
    const observer = new IntersectionObserver( //observer para detectar la visibilidad del texto
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTextVisible(true);
          } else {
            setTextVisible(false); //desactivar la visibilidad si sale de la vista
          }
        });
      },
      {
        threshold: 0.3, //se activa cuando el 30% del texto es visible
        rootMargin: '-50px' //se activa 50px antes de que sea completamente visible
      }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  //observer pero para el contenedor de marcas
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setBrandsVisible(true);
          } else {
            setBrandsVisible(false);
          }
        });
      },
      {
        threshold: 0.1, //menos porque quedaba raro
        rootMargin: '-30px' 
      }
    );

    if (brandsRef.current) {  //si el contenedor de marcas existe, lo observa
      observer.observe(brandsRef.current);
    }

    return () => { //limpia el observer cuando ya no esta en ese componente
      if (brandsRef.current) {
        observer.unobserve(brandsRef.current);
      }
    };
  }, []);

  // rotacion auto para las marcas
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 2) % marcas.length); //para que cambien de a 2
    }, 4000); //4 seg

    return () => clearInterval(interval);
  }, [marcas.length]);

  //funcion para obtener las 2 marcas que se esten mostrando en ese momento
  //es para que se muestren las marcas de a 2 y no de a 1
  const getCurrentBrands = () => {
    const brands = [];
    for (let i = 0; i < 2; i++) {
      brands.push(marcas[(currentIndex + i) % marcas.length]);
    }
    return brands;
  };

  //cmponente principal
  return ( 
    <div className="w-full h-full bg-white dark:bg-[#555555]">
      <Slider />      {/*seccion texto */}
      <section ref={textRef} className="w-full py-16 px-8 flex items-center justify-center min-h-[600px]">
        <div className="max-w-6xl mx-auto text-center flex items-center justify-center">
          <h2 className={`text-black text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed transform transition-all duration-1500 ease-out ${
            textVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}>
            {fullText}
          </h2>
        </div>
      </section>      {/* Sección de marcas */}
      {/*
      <section className="w-full bg-white dark:bg-[#555555] py-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 ref={brandsRef} className={`text-black dark:text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-12 transform transition-all duration-1500 ease-out ${
            brandsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}>
            Marcas
          </h2>
          
          contenedor marcas 
          <div className="max-w-4xl mx-auto">            Logos 
            <div className="flex justify-center items-center gap-20 md:gap-32 mb-8">
              {getCurrentBrands().map((marca, index) => (
                <a
                  key={`${marca.id}-${currentIndex}`}
                  href={marca.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group cursor-pointer transform transition-all duration-700 ease-out animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-40 h-32 md:w-52 md:h-40 bg-white dark:bg-white rounded-lg shadow-lg border border-gray-200 dark:border-gray-200 p-6 flex items-center justify-center group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                    <img 
                      src={marca.src} 
                      alt={`Logo ${marca.name}`}
                      className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />               
                    <span className="text-gray-600 dark:text-gray-600 font-semibold text-xl hidden">
                      {marca.name}
                    </span>
                  </div>
                </a>
              ))}
            </div>        
            <div className="flex justify-center items-center gap-3">
              {[0, 2].map((startIndex) => (
                <button
                  key={startIndex}
                  onClick={() => setCurrentIndex(startIndex)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === startIndex
                      ? 'bg-black dark:bg-white scale-125' 
                      : 'bg-gray-300 dark:bg-gray-300 hover:bg-gray-400 dark:hover:bg-gray-400'
                  }`}
                  aria-label={`Ver marcas ${startIndex / 2 + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      */}
    </div>
  )
}

export default home