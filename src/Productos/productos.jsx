import React from 'react';
import Carrusel from '../Productos/carrusel'

const Productos = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Productos</h1>
      <Carrusel/>
    </div>
  );
};

export default Productos;
