

const Card = ({ maquinarias }) => {
  return (
    
      <div className="card">
        {maquinarias.map((maquina) => (
          <li
            key={maquina.id}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {maquina.marca} - {maquina.modelo}
            </h3>
            <p className="text-gray-600 capitalize">
              Tipo: {maquina.tipo.replace("_", " ")}
            </p>

            {/* Mostrar descripción si existe */}
            {maquina.descripcion && (
              <p className="mt-2 text-sm text-gray-500">
                {maquina.descripcion}
              </p>
            )}

            {/* Botón para descargar la ficha técnica */}
            {maquina.ficha_tecnica_path ? (
              <a
                href={`http://127.0.0.1:8000/${maquina.ficha_tecnica_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-blue-500 hover:underline text-sm"
              >
                🔍 Ver Ficha Técnica
              </a>
            ) : (
              <p className="text-gray-400 text-sm mt-2">
                Ficha técnica no disponible
              </p>
            )}
          </li>
        ))}
      </div>
    </StyledWrapper>
  );
};



export default Card;
