import React, { useEffect, useState, useCallback } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Galeria = () => {
  const [allImages, setAllImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [filter, setFilter] = useState("Todos");

  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const opciones = [
    { value: "Todos", label: "Todo" },
    { value: "Camion", label: "Camiones" },
    { value: "Elevador", label: "Elevadores" },
    { value: "Plataforma", label: "Plataformas" },
  ];
  const [isDark, setIsDark] = useState(false);
  
  // Detectar si el modo oscuro está activo al cargar
  useEffect(() => {
    const htmlElement = document.documentElement;
    const initialDark = htmlElement.classList.contains("dark");
    setIsDark(initialDark);

    // ver si el modo oscuro cambia para cambiar el estado
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const currentDark = htmlElement.classList.contains("dark");
          if (currentDark !== isDark) {
            setIsDark(currentDark);
          }
        }
      });
    });

    observer.observe(htmlElement, {
      attributes: true,
    });

    return () => observer.disconnect();
  }, [isDark]);
  
  //para cerrar el dropdown cuandso haces click afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);//para el cambio de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
  const fetchImagenes = async () => {
    try {
      const response = await fetch("https://candelur-backend-1.onrender.com/galery-images");
      if (!response.ok) throw new Error("No se pudieron cargar las imágenes");
      const data = await response.json();
      // Transforma el array de nombres en objetos { src, name }
      const imgs = (data.images || []).map(name => ({
        src: `https://candelur-backend-1.onrender.com/img/galery/${name}`,
        name
      }));
      setAllImages(imgs);
      setFilteredImages(imgs);
    } catch (err) {
      setAllImages([]);
      setFilteredImages([]);
    } finally {
      setLoading(false);
    }
  };
  fetchImagenes();
}, []);

  //efecto para cuando scrolleas, las imagenes aparezcan suavecitas
  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          //cuando la imagen sale de la view, se le saca la clase asi despues se vuelven a ver suavecitas
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      fadeElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, [filteredImages]);  
  
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-[15dvh] pt-12 sm:pt-10 md:pt-10 pb-16 flex gap-4 sm:gap-6 flex-col items-start">{/* Dropdown */}
      <div className="flex w-full sm:w-auto mt-2 sm:mt-0">
        <div className="dropdown-container relative w-full sm:w-auto">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`flex items-center justify-between gap-2 px-4 py-2 w-full sm:w-auto ${
              dropdownOpen ? "rounded-t-md" : "rounded-md"
            } bg-white dark:text-white dark:bg-black`}
          >
            <span className="font-medium font-sans">{filter === "Todos" ? "Filtrar" : filter}</span>

            <img src={isDark ? "/img/filter_white.svg" : "/img/filter.svg"} alt="Filtro" className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>          {dropdownOpen && (
            <ul className="absolute font-sans z-10 bg-white dark:bg-black rounded-b-md rounded-tr-md shadow-lg w-full sm:w-48">
              {opciones.map((opcion) => (
                <li
                  key={opcion.value}
                  onClick={() => {
                    setFilter(opcion.value);
                    setDropdownOpen(false);

                    if (opcion.value === "Todos") {
                      setFilteredImages(allImages);
                    } else {
                      const filtered = allImages.filter((img) =>
                        img.name
                          .toLowerCase()
                          .startsWith(opcion.value.toLowerCase())
                      );
                      setFilteredImages(filtered);
                    }
                  }}
                  className={`px-4 py-3 sm:py-2 text-center sm:text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    filter === opcion.value ? "font-bold text-red-600" : ""
                  }`}
                >
                  {opcion.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>      {/* Galería */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-2 sm:gap-3 md:gap-4 space-y-2 sm:space-y-3 md:space-y-4 w-full">
        {filteredImages.map((img, index) => (
          <div key={index} className="fade-in-section mb-2 sm:mb-3 md:mb-4">
            <img
              src={img.src}
              alt={img.name}
              onClick={() => {
                setCurrentIndex(index);
                setOpen(true);
              }}
              className="w-full rounded-lg shadow-md break-inside-avoid cursor-pointer hover:opacity-90 transition hover:scale-[1.01] duration-300"
              loading="lazy" 
            />
          </div>
        ))}
      </div>      {/* Lightbox (para ver las imagenes en grande) */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        slides={filteredImages.map((img) => ({ src: img.src }))}
        carousel={{
          padding: windowWidth < 768 ? "0px" : "16px",
          spacing: windowWidth < 768 ? "0px" : "16px"
        }}
        render={{
          buttonPrev: windowWidth < 480 ? () => null : undefined,
          buttonNext: windowWidth < 480 ? () => null : undefined
        }}
      />
    </div>
  );
};

export default Galeria;
