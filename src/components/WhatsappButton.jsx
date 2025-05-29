
export default function WhatsAppButton() {
  console.log("WhatsAppButton se está renderizando"); // Para debug
  const phoneNumber = "59896388002"; 
  const message = encodeURIComponent("¡Hola! Me contacto desde su página web. Me interesa conocer más sobre sus servicios de alquiler y venta de maquinaria.");
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-[9999] flex items-center justify-center transition-all duration-300 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <svg
        className="w-6 h-6 fill-current"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.883.742 5.69 2.148 8.172L.098 31.062l6.66-2.088a15.898 15.898 0 0 0 9.242 2.892c8.837 0 16-7.163 16-15.998C32 7.56 24.837.396 16 .396zm0 29.2c-2.64 0-5.219-.725-7.469-2.092l-.535-.316-3.957 1.243 1.295-3.85-.348-.577a13.185 13.185 0 0 1-2.016-7.012c0-7.293 5.945-13.237 13.238-13.237 7.289 0 13.236 5.944 13.236 13.237 0 7.289-5.946 13.234-13.236 13.234zm7.473-9.711c-.41-.205-2.41-1.19-2.785-1.326-.375-.139-.648-.205-.922.204s-1.059 1.326-1.297 1.6c-.238.273-.477.307-.887.102-.41-.204-1.73-.637-3.293-2.03-1.217-1.085-2.04-2.422-2.278-2.832-.238-.41-.026-.63.179-.835.183-.182.41-.477.613-.716.205-.239.273-.41.41-.683.137-.273.068-.512-.034-.716-.102-.205-.922-2.227-1.262-3.048-.332-.796-.672-.688-.922-.703l-.785-.013c-.273 0-.716.102-1.09.477-.375.375-1.43 1.395-1.43 3.41 0 2.014 1.46 3.964 1.664 4.239.204.273 2.873 4.375 6.969 6.132.973.418 1.73.666 2.324.854.977.307 1.867.263 2.57.16.785-.117 2.41-.988 2.75-1.943.341-.956.341-1.775.239-1.943-.102-.17-.375-.273-.785-.478z"/>
      </svg>
    </a>
  );
}
