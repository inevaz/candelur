import React, { useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const Galeria = () => {
  const [allImages, setAllImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [filter, setFilter] = useState('Todos');

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const importImages = async () => {
      const modules = import.meta.glob('../galery/*.{jpeg,jpg}');
      const entries = Object.entries(modules);

      const imageData = await Promise.all(
        entries.map(async ([path, importFn]) => {
          const mod = await importFn();
          const fileName = path.split('/').pop();
          return { src: mod.default, name: fileName };
        })
      );

      setAllImages(imageData);
      setFilteredImages(imageData);
    };

    importImages();
  }, []);

  const handleFilter = (e) => {
    const type = e.target.value;
    setFilter(type);

    if (type === 'Todos') {
      setFilteredImages(allImages);
    } else {
      const filtered = allImages.filter((img) =>
        img.name.toLowerCase().startsWith(type.toLowerCase())
      );
      setFilteredImages(filtered);
    }
  };

  return (
    <div className="px-[15dvh] py-10 flex flex-col items-start">
      {/* Dropdown */}
      <div className="mb-6 text-center">
        <select
          value={filter}
          onChange={handleFilter}
          className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Todos">Todo</option>
          <option value="Camion">Camiones</option>
          <option value="Elevador">Elevadores</option>
          <option value="Plataforma">Plataformas</option>
        </select>
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
