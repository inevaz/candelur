// Productos.jsx
import { useEffect, useState, Fragment } from "react";
import styled from "styled-components";

const Productos = () => {
  const [maquinarias, setMaquinarias] = useState([]);
  const [imagenesPorMaquina, setImagenesPorMaquina] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Obtener lista de maquinarias
  useEffect(() => {
    const fetchMaquinarias = async () => {
      try {
        const response = await fetch("/api/maquinarias");
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
      const response = await fetch(`/api/imagenes/${maquinaId}`);
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

  if (loading) return <p>Cargando maquinaria...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const maquinariasFiltradas =
    filtroTipo === "todos"
      ? maquinarias
      : maquinarias.filter((maquina) => maquina.tipo === filtroTipo);

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

  return (
    <div className="py-12 flex flex-col gap-6 items-center px-[25dvh]">
      <div className="flex items-center w-full justify-between">
        <h2 className="text-2xl font-bold mt-6 mb-5">Catálogo de Maquinaria</h2>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`flex items-center gap-2 px-4 py-2 ${dropdownOpen ? "rounded-t-md" : "rounded-md"} bg-white dark:text-white`}
          >
            <span className="font-bold">{filtroSingular[filtroTipo]}</span>


            <img src="/img/filter.png" alt="Filtro" className="w-6 h-6" />
          </button>

          {dropdownOpen && (
            <ul className="absolute z-10 bg-white dark:bg-gray-800 border border-gray-300 rounded-b-md rounded-tr-md shadow-lg w-48">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">
        {maquinariasFiltradas.map((maquina) => (
          <div className="flex flex-col items-center gap-1" key={maquina.id}>
            <h3 className="text-md font-bold text-gray-800 dark:text-gray-400">
              {maquina.modelo}
            </h3>
            <StyledWrapper>
              <div className="card">
                {/* Imágenes */}
                <div className="imagenes mt-2">
                  {imagenesPorMaquina[maquina.id]?.length > 0 ? (
                    <img
                      src={`/api/${imagenesPorMaquina[maquina.id][0]}`}
                      alt={`Imagen de ${maquina.modelo}`}
                      className="w-full h-auto max-h-50 object-cover rounded-md"
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
                      href={`/api/${maquina.ficha_tecnica_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="uppercase text-sm dark:text-white hover:text-[#e31e24] transition duration-150 ease-in-out"
                    >
                      Ver ficha técnica
                    </a>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm mt-2 dark:text-white">
                    Ficha técnica no disponible
                  </p>
                )}
              </div>
            </StyledWrapper>
          </div>
        ))}
      </div>
    </div>
  );
};

const StyledWrapper = styled.div`
  .card {
    box-sizing: border-box;
    width: 190px;
    height: 254px;
    background: rgba(255, 255, 255, 0.58);
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
`;

export default Productos;
