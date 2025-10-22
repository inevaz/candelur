import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSuccess(false);
    setError(false);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Error al enviar el correo: ${response.statusText}`);
      }
      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        message: "",
      });
    } catch (err) {
      setError(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex font-sans font-medium flex-col p-4 border border-black bg-white dark:bg-[#8C8C8C] dark:border-0 rounded-lg">
        {/* Nombre y Apellido */}
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            name="firstName"
            placeholder="Nombre"
            value={formData.firstName}
            onChange={handleChange}
            className="px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-red-500 h-[50px] dark:bg-[#8C8C8C] w-full placeholder-[#D0D0D0] border-[#D0D0D0]"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Apellido"
            value={formData.lastName}
            onChange={handleChange}
            className="px-2 py-1 border focus:outline-none focus:ring-1 focus:ring-red-500 rounded w-full dark:bg-[#8C8C8C] placeholder-[#D0D0D0] border-[#D0D0D0]"
            required
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
            className="w-full px-2 h-[50px] focus:outline-none focus:ring-1 focus:ring-red-500 py-1 dark:bg-[#8C8C8C] border rounded placeholder-[#D0D0D0] border-[#D0D0D0]"
            required
          />
        </div>

        {/* Teléfono */}
        <div className="mb-2">
          <input
            type="tel"
            name="contactNumber"
            placeholder="Teléfono"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full px-2 h-[50px] focus:outline-none focus:ring-1 focus:ring-red-500 py-1 dark:bg-[#8C8C8C] border rounded placeholder-[#D0D0D0] border-[#D0D0D0]"
            required
          />
        </div>

        {/* Mensaje */}
        <div className="mb-1">
          <textarea
            name="message"
            placeholder="Escribe tu mensaje"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full h-[125px] px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-500 border dark:bg-[#8C8C8C] rounded resize-none placeholder-[#D0D0D0] border-[#D0D0D0]"
            required
          ></textarea>
        </div>
        {/* ...resto del formulario... */}
        <button
          type="submit"
          disabled={isSending}
          className={`w-full px-4 py-2 rounded transition duration-150 ${
            isSending ? "bg-gray-400" : "bg-[#e31e24] hover:bg-red-800"
          } text-[#D0D0D0]`}
        >
          {isSending ? "Enviando..." : "Enviar"}
        </button>
        {success && (
          <p className="text-green-500 font-bold mb-4">¡Mensaje enviado correctamente!</p>
        )}
        {error && (
          <p className="text-red-500 font-bold mb-4">Hubo un error al enviar el mensaje.</p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;