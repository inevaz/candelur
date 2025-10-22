const Card = ({ maquinarias }) => {
  return (
    <StyledWrapper>
      <div className="card">
        {maquinarias.map((maquina) => (
          <li
            key={maquina.id}
            className="border rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {maquina.modelo}
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
                href={`https://candelur.com.uy/${maquina.ficha_tecnica_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block font-sans text-blue-500 hover:underline text-sm"
              >
                🔍 Ver Ficha Técnica
              </a>
            ) : (
              <p className="text-gray-400 font-sans text-sm mt-2">
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
