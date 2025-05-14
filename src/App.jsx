import { useState } from 'react'
import './App.css'
import Footer from './Footer/footer.jsx'

function App() {
  return (
    <div className='w-full '>
      <div className="h-[700px] bg-white p-10 rounded-xl shadow-lg text-center space-y-4">
        <h1 className="text-3xl font-bold text-blue-600">¡Hola, WindiCSS!</h1>
        <p className="text-gray-700">Si ves este bloque con estilos bonitos, Windi está funcionando ✅</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
          Botón de prueba
        </button>
      </div>
      <Footer/>
    </div>
  );
}

export default App;