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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 border rounded-lg">
      {/* Primer nombre y apellido */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          name="firstName"
          placeholder="Nombre"
          value={formData.firstName}
          onChange={handleChange}
          className="px-2 py-1 border rounded w-full"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          value={formData.lastName}
          onChange={handleChange}
          className="px-2 py-1 border rounded w-full"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
      </div>

      {/* Contact number */}
      <div className="mb-4">
        <input
          type="tel"
          name="contactNumber"
          placeholder="contact number"
          value={formData.contactNumber}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
      </div>

      {/* Message */}
      <div className="mb-4">
        <textarea
          name="message"
          placeholder="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-2 py-1 border rounded resize-none"
        ></textarea>
      </div>

      {/* Botón Submit */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-800 transition duration-150"
      >
        submit
      </button>
    </form>
  );
};

export default ContactForm;