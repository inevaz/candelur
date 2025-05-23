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
            className={`flex items-center gap-2 px-4 py-2 border border-gray-300 ${
              dropdownOpen ? "rounded-t-md" : "rounded-md"
            } bg-white dark:text-white`}
          >
            <span className="font-bold">{filter === "Todos" ? "Filtrar" : filter}</span>

            <img src="/img/filter.png" alt="Filtro" className="w-6 h-6" />
          </button>

          {dropdownOpen && (
            <ul className="absolute z-10 bg-white dark:bg-gray-800 border border-gray-300 rounded-b-md rounded-tr-md shadow-lg w-48">
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
