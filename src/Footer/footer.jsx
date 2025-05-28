import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black h-full w-full flex flex-col gap-7 px-[20dvw] py-[12dvh]">
      <section className="flex items-end gap-2 justify-between pt-12">
        <img
          className="w-[200px] h-auto"
          src={"../img/candelur_logo_light_text.png"}
          alt="Candelur"
        />

        <div className="h-[50px] text-white font-bold flex items-center py-0 px-4 gap-2 rounded-4xl border-white border-2">
          <FontAwesomeIcon
            className="text-white h-[20px] w-[20px] "
            icon={faLocationDot}
          />
          Uruguay
        </div>
      </section>
      <hr className="bg-white"></hr>
      <section className="">
        <div className="flex justify-between gap-2 items-start">
          {/* <div className='flex flex-col gap-4'>
                        <p className='text-white text-xs uppercase'>Sobre Nosotros</p>
                        <ul className='text-white font-bold flex flex-col gap-4'>
                            <li>Nuestra Compañia</li>
                            <li>Trabaja con nosotros</li>
                        </ul>
                    </div> */}
          <div className="flex flex-col gap-4">
            <p className="text-white text-xs uppercase">¿Necesitas ayuda?</p>
            <ul className="text-white font-bold flex flex-col gap-4">
              <a
                href="https://www.google.com/maps?q=-34.913293869692275, -54.94214512091994" // Cambia por tus coordenadas
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                <li>Mapa del sitio</li>
              </a>

              <Link to="/contacto">
                <li>Contactanos</li>
              </Link>
            </ul>
          </div>
    

          <div className="flex gap-4">
            <a
  href="https://www.instagram.com/candelursa/ "
  target="_blank"
  rel="noopener noreferrer"

>
  <div className="rounded-full border-2 border-white p-1">
              <FontAwesomeIcon
                className="text-white w-[25px] "
                icon={faInstagram}
              />
            </div>
</a>
                        <a
              href="https://wa.me/59896388002"
              target="_blank"
              rel="noopener noreferrer" //seguridad para evitar ataques de phishing
            >
              <div className="rounded-full border-2 border-white p-1">
                <FontAwesomeIcon
                  className="text-white w-[25px] "
                  icon={faWhatsapp}
                />
              </div>
            </a>
          </div>
        </div>
      </section>
      <hr className="bg-white"></hr>
      <div className="flex w-full justify-end">
        <p className="text-white text-bold">
          © 2025 Candelur S.A. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default Footer;
