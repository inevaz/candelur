// Productos.jsx
import { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Lottie from '@lottielab/lottie-player/react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const Productos = () => {
  const [maquinarias, setMaquinarias] = useState([]);
  const [imagenesPorMaquina, setImagenesPorMaquina] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const filtroDesdeURL = searchParams.get("tipo");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (filtroDesdeURL) {
      setFiltroTipo(filtroDesdeURL);
    }
  }, [filtroDesdeURL]);

  useEffect(() => {
    if (location.state?.filtro) {
      setFiltroTipo(location.state.filtro);
    }
  }, [location.state]);

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

  // Obtener lista de maquinarias
  useEffect(() => {
    const fetchMaquinarias = async () => {
      try {
        const response = await fetch("https://candelur-backend-1.onrender.com/maquinarias");
        if (!response.ok)
          throw new Error(`Error al cargar los datos: ${response.statusText}`);
        const data = await response.json();
        setMaquinarias(data);

        // Una vez cargadas las máquinas, obtenemos sus imágenes
        data.forEach((maquina) => {
          fetchImagenes(maquina.id);
        });

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMaquinarias();
  }, []);

  // Función reutilizable para obtener imágenes de una máquina
  const fetchImagenes = async (maquinaId) => {
    try {
      const response = await fetch(`https://candelur-backend-1.onrender.com/imagenes/${maquinaId}`);
      if (!response.ok)
        throw new Error(
          `No se encontraron imágenes para la máquina ${maquinaId}`
        );

      const data = await response.json();
      setImagenesPorMaquina((prev) => ({
        ...prev,
        [maquinaId]: data.imagenes || [],
      }));
    } catch (err) {
      setImagenesPorMaquina((prev) => ({
        ...prev,
        [maquinaId]: [],
      }));
    }
  };

  //if (loading) return <p>Cargando maquinaria...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const maquinariasFiltradas = maquinarias.filter((maquina) => {
    const matchesTipo = filtroTipo === "todos" || maquina.tipo === filtroTipo;

    const searchTermLower = searchTerm.trim().toLowerCase();
    if (!searchTermLower) return matchesTipo;

    const matchesSearch =
      maquina.marca.toLowerCase().includes(searchTermLower) ||
      maquina.modelo.toLowerCase().includes(searchTermLower) ||
      maquina.tipo.toLowerCase().includes(searchTermLower);

    return matchesTipo && matchesSearch;
  });

  const opciones = [
    { label: "Todos", value: "todos" },
    { label: "Plataformas", value: "plataforma" },
    { label: "Elevadores", value: "elevador" },
    { label: "Camiones grúa", value: "camion_grua" },
  ];

  const filtroSingular = {
    todos: "Filtrar",
    plataforma: "Plataforma",
    elevador: "Elevador",
    camion_grua: "Camión grúa",
  };


const renderSkeleton = () => (
  <div className="flex flex-col items-center gap-1">
    {/* Skeleton del titulo*/}
    <Skeleton 
      height={20} 
      width={128} 
      baseColor={isDark ? "#4a4a4a" : "#f0f0f0"} 
      highlightColor={isDark ? "#6a6a6a" : "#e0e0e0"} 
    />
    
    <StyledWrapper>
      <div className="card skeleton-card">
        {/* contenedor principal */}
        <div className="w-full h-full flex flex-col items-center justify-center bg-white">
          {/* animacion de lottie */}
          <div className="w-16 h-16 mb-2 flex items-center justify-center">
            <Lottie 
              src="https://cdn.lottielab.com/l/Ez2VYXWRieFjeK.json"
              autoplay
              loop
              style={{ width: 64, height: 64 }}
            />
          </div>
          
          {/* Ttxt cargando */}
          <p className="text-gray-600 text-sm font-medium -mt-1">Cargando...</p>
        </div>
      </div>
    </StyledWrapper>
  </div>
);
  return (
    <div className="py-12 flex flex-col gap-6 items-center px-[25dvh]">
      <div className="flex items-center w-full justify-between">
        <h2 className="text-2xl font-bold mt-6">Catálogo de Maquinaria</h2>
        <div className="relative flex gap-4">
          {/* Campo de búsqueda */}
          <input
            type="text"
            placeholder="Buscar por nombre"
            className="px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 dark:bg-black dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`flex items-center gap-2 px-4 py-2 ${
              dropdownOpen ? "rounded-t-md" : "rounded-md"
            } bg-white dark:text-white  dark:bg-black`}
          >
            <span className="font-bold">{filtroSingular[filtroTipo]}</span>
            <img
              src={isDark ? "/img/filter_white.svg" : "/img/filter.svg"}
              alt="Filtro"
              className="w-6 h-6 text-white"
            />
          </button>

          {dropdownOpen && (
            <ul className="absolute -right-[81px] top-[38px] z-10 bg-white dark:bg-black rounded-b-md rounded-tr-md shadow-lg w-48">
              {opciones.map((opcion) => (
                <li
                  key={opcion.value}
                  onClick={() => {
                    setFiltroTipo(opcion.value);
                    setDropdownOpen(false);
                  }}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    filtroTipo === opcion.value ? "font-bold text-red-600" : ""
                  }`}
                >
                  {opcion.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
  {loading ? (
    // Si está cargando, muestra 8 skeletons blancos
    Array.from({ length: 8 }).map((_, index) => (
      <div key={index}>
        {renderSkeleton()}
      </div>
    ))
  ) : (
    // Si no está cargando, muestra las maquinarias reales
    maquinariasFiltradas.map((maquina) => (
          <div className="flex flex-col items-center gap-1" key={maquina.id}>
            <h3 className="text-md font-bold text-gray-800 dark:text-gray-400">
              {maquina.modelo}
            </h3>
            <StyledWrapper>
              <div className="card">
                {/* Imágenes */}
                <div className="w-full h-full flex flex-col items-center justify-center">
                  {imagenesPorMaquina[maquina.id]?.length > 0 ? (
                    <img
                      src={`https://candelur-backend-1.onrender.com/${imagenesPorMaquina[maquina.id][0]}`}
                      alt={`Imagen de ${maquina.modelo}`}
                      className="h-full max-h-[250px] max-w-[240px] p-2"
                    />
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Sin imagen disponible
                    </p>
                  )}
                </div>

                {/* Botón ficha técnica */}
                {maquina.ficha_tecnica_path ? (
                  <div className="flex item-center justify-center">
                    <a
                      href={`https://candelur-backend-1.onrender.com/${maquina.ficha_tecnica_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="uppercase text-sm dark:text-black hover:text-[#e31e24] transition duration-150 ease-in-out"
                    >
                      Ver ficha técnica
                    </a>
                  </div>
                ) : (                  <p className="text-gray-400 text-sm mt-2 dark:text-white">
                    Ficha técnica no disponible
                  </p>
                )}
              </div>
            </StyledWrapper>
          </div>
        ))
  )}
</div>
    </div>
  );
};

const StyledWrapper = styled.div`
  .card {
    box-sizing: border-box;
    width: 250px;
    height: 300px;
    background: white;
    border: 4px solid rgba(166, 166, 166, 0.45);
    box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
    backdrop-filter: blur(6px);
    border-radius: 17px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    font-weight: bolder;
    color: black;
    flex-direction: column;
    padding: 5px;
  }

  .card:hover {
    border: 1px solid black;
    transform: scale(1.05);
  }

  .card:active {
    transform: scale(0.95) rotateZ(1.7deg);
  }

  /* cards skeleton  */
  .skeleton-card {
    background: white !important;
    opacity: 0.95;
    pointer-events: none;
    border: 4px solid rgba(200, 200, 200, 0.5);
  }

  /* desactivar el hover para las cards skeleton */
  .skeleton-card:hover {
    transform: none;
    border: 4px solid rgba(200, 200, 200, 0.5);
    background: white !important;
  }

  .skeleton-card:active {
    transform: none;
  }
`;
export default Productos;
