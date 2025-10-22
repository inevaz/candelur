import React, { useState, useEffect, useRef } from "react";
import Slider from "./slider";

const home = () => {
  const [textVisible, setTextVisible] = useState(false);
  const textRef = useRef(null);
  const [imageVisible, setImageVisible] = useState([false, false, false]);
  const imageRefs = [useRef(null), useRef(null), useRef(null)];

  //el texto
  const fullText =
    "Candelur S.A. inició sus actividades a comienzos del año 2000 en el departamento de Maldonado, dedicándose al alquiler de autoelevadores, tanto con operador como sin operador.";

  // Animación de aparición solo para el texto principal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setTextVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-50px",
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

   useEffect(() => {
    const observers = imageRefs.map((ref, idx) => {
      return new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageVisible((prev) => {
                const updated = [...prev];
                updated[idx] = true;
                return updated;
              });
            }
          });
        },
        { threshold: 0.3 }
      );
    });

    imageRefs.forEach((ref, idx) => {
      if (ref.current) observers[idx].observe(ref.current);
    });

    return () => {
      imageRefs.forEach((ref, idx) => {
        if (ref.current) observers[idx].unobserve(ref.current);
      });
    };
  }, [imageRefs]);

  //cmponente principal
  return (
    <div className="w-full h-full bg-[#F5F5F5] dark:bg-[#0A0A0A]">
      <Slider /> {/*seccion texto */}
      <section
        className="w-full dark:bg-[#0A0A0A] flex flex-col gap-42 mt-4 h-full pb-24">

          <div
          ref={textRef}
          className="w-full bg-black dark:bg-[#ADADAD] h-[600px] mx-auto text-center flex items-center justify-center"
        >
          <h2
            style={{ willChange: "transform, opacity" }}
            className={`text-white dark:text-black text-center px-32 sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-relaxed transform transition-all duration-1000 ease-out ${
              textVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            {fullText}
          </h2>
        </div>


         {/* Imagen 1 */}
        <div className="w-full h-[700px] relative">
          <div
            ref={imageRefs[0]}
            className={`absolute w-[60%] top-30 right-[15dvw] rounded-xl overflow-hidden shadow-lg transition-all duration-1000 ease-out
              ${imageVisible[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <img
              src={"./img/Candelur2.jpg"}
              alt={"Candelur_1"}
              className="object-fit w-full h-[600px]"
            />
          </div>
          <div className="dark:text-black dark:bg-[#ADADAD] absolute top-0 left-[15dvw] flex rounded-xl shadow-lg bg-white p-12 flex-col gap-4 w-[28%]">
            <h2 className="font-sans font-black text-xl">
              Nuestro propósito es impulsar el crecimiento de la industria con soluciones integrales y confiables.
            </h2>
            <p className="font-sans font-medium">
              Motivados por las necesidades del sector, el apoyo de nuestros clientes y la experiencia de casi 20 años en el rubro por parte de nuestros fundadores, ampliamos nuestros servicios para ofrecer una propuesta más completa. Incorporamos la importación y venta de autoelevadores y plataformas, y diversificamos el área de arrendamiento con una amplia gama de equipos: plataformas y canastos para trabajos en altura, tijeras, brazos telescópicos y articulados, plataformas personales, grúas, hidrogrúas, camiones de transporte, apiladores y portapallets, entre otros.
            </p>
          </div>
        </div>

        {/* Imagen 2 */}
        <div className="w-full h-[700px] relative">
          <div
            ref={imageRefs[1]}
            className={`absolute w-[60%] top-30 left-[15dvw] rounded-xl overflow-hidden shadow-lg transition-all duration-1000 ease-out
              ${imageVisible[1] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <img
              src={"./img/Candelur3.jpg"}
              alt={"Candelur_1"}
              className="object-fit w-full h-[600px]"
            />
          </div>
          <div className="dark:text-black dark:bg-[#ADADAD] absolute top-0 right-[15dvw] flex rounded-xl shadow-lg bg-white p-12 flex-col gap-2 w-[24%]">
            <h2 className="font-sans font-black text-xl">
              Nuestro compromiso es brindar soluciones seguras y eficientes para cada tipo de traslado.
            </h2>
            <p className="font-sans font-medium">
              Nos especializamos en la carga, transporte, descarga y colocación de todo tipo de mercaderías, incluso en lugares de difícil acceso. Gracias a nuestra experiencia y equipamiento, garantizamos un servicio confiable para una amplia variedad de necesidades: desde contenedores, equipos y herramientas hasta obras de arte, cajas fuertes, maquinaria, calderas, vehículos, embarcaciones y estructuras livianas como casitas infantiles.
            </p>
          </div>
        </div>

        {/* Imagen 3 */}
        <div className="w-full h-[700px] relative">
          <div
            ref={imageRefs[2]}
            className={`absolute w-[60%] top-30 right-[15dvw] rounded-xl overflow-hidden shadow-lg transition-all duration-700 ease-out
              ${imageVisible[2] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <img
              src={"./img/Candelur1.jpg"}
              alt={"Candelur_1"}
              className="object-fit w-full h-[600px]"
            />
          </div>
          <div className="dark:text-black dark:bg-[#ADADAD] absolute top-0 left-[15dvw] flex rounded-xl shadow-lg bg-white p-12 flex-col gap-2 w-[22%]">
            <h2 className="font-sans font-black text-xl">
              Nuestra alianza potencia el servicio y amplía nuestras soluciones.
            </h2>
            <p className="font-sans font-medium">
              Gracias a una alianza comercial, ofrecemos servicios de alquiler de manipuladores telescópicos (Manitou), minicargadores (Bobcat) y compresores de aire. Esta colaboración nos permite brindar equipos confiables, eficientes y adaptados a las distintas necesidades de nuestros clientes, fortaleciendo nuestra capacidad de respuesta en cada proyecto.
            </p>
          </div>
        </div>

        
      </section>{" "}
      {/* Sección de marcas */}
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
                      ? 'bg-black dark:bg-white scale-140' 
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
  );
};

export default home;
