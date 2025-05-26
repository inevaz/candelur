import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    
    //aplicar el tema al body
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    
    //aplicar el tema al body
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  return (
    <nav className="bg-white dark:bg-black shadow-md fixed w-full h-auto z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/*logo*/}          
          <div className="flex items-center">
            <Link to="/" className="flex items-center h-full w-full">
              <img 
                src="/img/candelur_logo.png" 
                alt="Candelur Logo" 
                className="h-[50px] w-[119px] block dark:hidden"
              />
              <img 
                src="/img/candelur_logo_light_text.png" 
                alt="Candelur Logo" 
                className="h-[50px] w-[117px] hidden dark:block" 
              />            </Link>          
            {/*iconos de nav*/}            <div className="flex ml-19 h-full"><Link 
                to="/productos" 
                className="px-4 flex items-center text-sm font-bold text-black dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 relative group no-underline"
              >
                Productos
                <span className="absolute bottom-0 left-0 right-0 w-[80px] h-1 bg-red-600 dark:bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mx-auto"></span>
              </Link>
              <Link 
                to="/galeria" 
                className="px-4 flex items-center text-sm font-bold text-black dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 relative group mx-5 no-underline"
              >
                Galería
                <span className="absolute bottom-0 left-0 right-0 w-[60px] h-1 bg-red-600 dark:bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mx-auto"></span>
              </Link>
              <Link 
                to="/contacto" 
                className="px-4 flex items-center text-sm font-bold text-black dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 relative group no-underline"
              >
                Contacto
                <span className="absolute bottom-0 left-0 right-0 w-[75px] h-1 bg-red-600 dark:bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mx-auto"></span>
              </Link>
            </div>
          </div>
            {/*boton darkmode*/}          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-black dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              <FontAwesomeIcon 
                icon={darkMode ? faSun : faMoon} 
                className="h-5 w-5" 
              />
            </button>
          </div>
          
          {/*responsive*/}
          <div className="flex items-center sm:hidden">
            {/*botn de menu (para el responsive)*/}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;