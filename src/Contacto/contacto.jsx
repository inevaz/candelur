import ContactForm from "./contactForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Contacto = () => {
  return (
    <div className="px-[15dvh] py-20 flex w-full flex-col gap-14">
      <div className="flex w-full items-center justify-between gap-6">
        <div className="w-full flex flex-col text-justify gap-6">
          <h1 className="font-krub h-[40px] font-bold text-3xl">Formulario de contacto</h1>
          <ContactForm />
        </div>
        <div className="w-full h-full flex flex-col text-justify justify-between gap-6">
          <div className="h-[40px] flex flex-col justify-between">
            <h1 className="font-krub font-bold text-3xl">Ubicación</h1>
            <p className="font-krub pt-1">Av. Cachimba del Rey 396 - Maldonado</p>
          </div>
          
          <div className="h-full gap-2 flex flex-col justify-between">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.6970709168645!2d-54.94395824619739!3d-34.9140508887624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95751abe4b95e2c5%3A0x643beae657b280c0!2sCandelur!5e0!3m2!1sen!2suy!4v1747927821127!5m2!1sen!2suy"
              className="w-full h-[380px] rounded-lg shadow-md"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 ">
        <h2 className="font-krub font-bold text-3xl">Más formas de contacto</h2>
        <div className="flex gap-12 w-full pl-2">
          <div className="flex gap-5">
            <FontAwesomeIcon className="w-8 h-8" icon={faEnvelope} />
            <p className="font-krub">info@candelur.com.uy</p>
          </div>
          <div className="flex gap-5">
            <FontAwesomeIcon className="w-8 h-8" icon={faClock} />
            <p className="font-krub">Lunes a Viernes de 08:00 a 18:00hrs</p>
          </div>
        </div>
        <div className="flex gap-31 w-full pl-2">
          <div className="flex gap-5">
            <FontAwesomeIcon className="w-8 h-8" icon={faWhatsapp} />
            <p className="font-krub">096 388 002</p>
          </div>
          <div className="flex gap-5">
            <FontAwesomeIcon className="w-8 h-8" icon={faPhone} />
            <p className="font-krub">(598) 4224 2444</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
