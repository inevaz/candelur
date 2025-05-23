import React, { useState } from 'react';

const ContactForm = () => {
  // Estado para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    message: '',
  });

  // Manejador para actualizar el estado cuando se cambia un campo
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejador para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado con los datos:', formData);
    // Aquí puedes agregar lógica para enviar los datos, por ejemplo:
    // fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-4 border border-black bg-white rounded-lg">
      {/* Primer nombre y apellido */}
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          name="firstName"
          placeholder="Nombre"
          value={formData.firstName}
          onChange={handleChange}
          className="px-2 py-1 border-2 rounded h-[50px] w-full"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          value={formData.lastName}
          onChange={handleChange}
          className="px-2 py-1 border-2 rounded w-full"
        />
      </div>

      {/* Email */}
      <div className="mb-2">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-2 h-[50px] py-1 border-2 rounded"
        />
      </div>

      {/* Contact number */}
      <div className="mb-2">
        <input
          type="tel"
          name="contactNumber"
          placeholder="Telefono"
          value={formData.contactNumber}
          onChange={handleChange}
          className="w-full px-2 h-[50px] py-1 border-2 rounded"
        />
      </div>

      {/* Message */}
      <div className="mb-1">
        <textarea
          name="message"
          placeholder="Escribe tu mensaje"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full h-[125px] px-2 py-1 border-2 rounded resize-none"
        ></textarea>
      </div>

      {/* Botón Submit */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-[#e31e24] text-white rounded hover:bg-red-800 transition duration-150"
      >
        Enviar
      </button>
    </form>
  );
};

export default ContactForm;