// components/WhatsAppCustomMessage.jsx
import { useState } from "react";

export default function WhatsAppCustomMessage({ filtroTipo }) {
  const [showInput, setShowInput] = useState(false);
  const [modelo, setModelo] = useState("");

  const phoneNumber = "59896388002"; // Número correcto de Candelur

  const tipoTexto = {
    plataforma: "plataforma",
    elevador: "elevador",
    camion_grua: "camión grúa",
    todos: "equipo",
  };

  const handleSend = () => {
    const tipo = tipoTexto[filtroTipo] || "equipo";
    const msg = `Hola, me interesaría saber más sobre la ${tipo} ${modelo}.`;
    const encodedMsg = encodeURIComponent(msg);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMsg}`, "_blank");
  };

  return (
    <div>
      {/* Botón flotante */}
      <button
        onClick={() => setShowInput(!showInput)}
        className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
        aria-label="WhatsApp"
      >
        🟢
      </button>

      {/* Mini formulario */}
      {showInput && (
        <div className="fixed bottom-20 right-5 bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded shadow-lg z-50 w-64">
          <p className="mb-2 text-sm">
            ¿Sobre qué {tipoTexto[filtroTipo] || "equipo"} te gustaría consultar?
          </p>
          <input
            type="text"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            placeholder="Ej: modelo X123"
            className="w-full px-2 py-1 border rounded text-sm mb-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <button
            onClick={handleSend}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
          >
            Enviar a WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
