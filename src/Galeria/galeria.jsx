import React, { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Galeria = () => {
  const [allImages, setAllImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [filter, setFilter] = useState("Todos");

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

    // Observar cambios en las clases del <html>
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

  useEffect(() => {
    const importImages = async () => {
      const modules = import.meta.glob("../galery/*.{jpeg,jpg}");
      const entries = Object.entries(modules);

      const imageData = await Promise.all(
        entries.map(async ([path, importFn]) => {
          const mod = await importFn();
          const fileName = path.split("/").pop();
          return { src: mod.default, name: fileName };
        })
      );

      setAllImages(imageData);
      setFilteredImages(imageData);
    };

    importImages();
  }, []);

  return (
    <div className="px-[15dvh] py-15 flex gap-6 flex-col items-start">
      {/* Dropdown */}
      <div className="flex">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`flex items-center gap-2 px-4 py-2 ${
              dropdownOpen ? "rounded-t-md" : "rounded-md"
            } bg-white dark:text-white dark:bg-black`}
          >
            <span className="font-bold">{filter === "Todos" ? "Filtrar" : filter}</span>

            <img src={isDark ? "/img/filter_white.svg" : "/img/filter.svg"} alt="Filtro" className="w-6 h-6 text-white" />
          </button>

          {dropdownOpen && (
            <ul className="absolute z-10 bg-white dark:bg-black rounded-b-md rounded-tr-md shadow-lg w-48">
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
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    filter === opcion.value ? "font-bold text-red-600" : ""
                  }`}
                >
                  {opcion.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Galería */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {filteredImages.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={img.name}
            onClick={() => {
              setCurrentIndex(index);
              setOpen(true);
            }}
            className="w-full mb-4 rounded-lg shadow-md break-inside-avoid cursor-pointer hover:opacity-90 transition"
          />
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        slides={filteredImages.map((img) => ({ src: img.src }))}
      />
    </div>
  );
};

export default Galeria;
