import '@fontsource/krub/400.css'; // Peso normal
import '@fontsource/krub/700.css'; // Negrita (opcional)
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Footer from './Footer/footer.jsx'
import Navbar from './Navbar/navbar.jsx'
import Productos from './Productos/productos.jsx'
import Galeria from './Galeria/galeria.jsx'
import Contacto from './Contacto/contacto.jsx'
import Home from './Home/home.jsx'
import ScrollToTop from './ScroltoTop.jsx'
import WhatsAppButton from './components/WhatsappButton.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="w-full flex flex-col bg-[#CECECE] dark:bg-[#141414]">
        <Navbar />
        <ScrollToTop />
        <main className="flex-grow pt-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <WhatsAppButton /> {/*boton wp */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
