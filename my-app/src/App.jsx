import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center space-y-4">
        <h1 className="text-3xl font-bold text-blue-600">¡Hola, WindiCSS!</h1>
        <p className="text-gray-700">Si ves este bloque con estilos bonitos, Windi está funcionando ✅</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
          Botón de prueba
        </button>
      </div>
    </div>
  );
}

export default App;