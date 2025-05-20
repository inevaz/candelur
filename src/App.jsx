import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Footer from './Footer/footer.jsx'
import Navbar from './Navbar/navbar.jsx'
import Productos from './Productos/productos.jsx'
import Galeria from './Galeria/galeria.jsx'
import Contacto from './Contacto/contacto.jsx'

function App() {  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#CECECE] dark:bg-[#3A3A3A]">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<div className="p-8 bg-white dark:bg-[#555555] m-4 rounded shadow">Página Principal</div>} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;