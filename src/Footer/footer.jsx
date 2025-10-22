import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Footer = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const handleFooterLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bg-black h-full w-full flex flex-col gap-4 md:gap-7 px-4 sm:px-8 md:px-12 lg:px-20 py-8 md:py-12">
      <section className="flex font-sans flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-2 justify-between pt-6 md:pt-12">
        <button
          onClick={handleFooterLogoClick}
          className="focus:outline-none bg-transparent border-0 p-0 m-0"
          style={{ lineHeight: 0 }}
          aria-label="Ir al inicio"
        >
          <img
            className="w-[150px] sm:w-[180px] md:w-[200px] h-auto"
            src={"../img/candelur_logo_light_text.png"}
            alt="Candelur"
          />
        </button>

        <div className="h-[40px] md:h-[50px] text-white font-bold flex items-center py-0 px-3 md:px-4 gap-2 rounded-4xl border-white border-2">
          <FontAwesomeIcon
            className="text-white h-[16px] w-[16px] md:h-[20px] md:w-[20px]"
            icon={faLocationDot}
          />
          Uruguay
        </div>
      </section>      <hr className="bg-white"></hr>
      <section className="w-full">
        <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-2 items-center sm:items-start">
          <div className="flex flex-col gap-3 md:gap-4 items-center sm:items-start">
            <p className="text-white font-sans text-xl uppercase">¿Necesitas ayuda?</p>
            <ul className="text-white text-md font-sans flex flex-col gap-3 md:gap-4 items-center sm:items-start">
              <a
                href="https://www.google.com/maps?q=-34.913293869692275, -54.94214512091994" 
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                <li>Mapa del sitio</li>
              </a>

              <Link to="/contacto">
                <li>Contactanos</li>
              </Link>          </ul>
          </div>
    
          <div className="flex gap-4 mt-2 sm:mt-0">
            <a
              href="https://www.instagram.com/candelursa/ "
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rounded-full border-2 border-white p-1 hover:bg-white hover:bg-opacity-20 transition-colors">
                <FontAwesomeIcon
                  className="text-white w-[20px] sm:w-[22px] md:w-[25px]"
                  icon={faInstagram}
                />
              </div>
            </a>
            <a
              href="https://wa.me/59896388002"
              target="_blank"
              rel="noopener noreferrer" //seguridad para evitar ataques de phishing
            >
              <div className="rounded-full border-2 border-white p-1 hover:bg-white hover:bg-opacity-20 transition-colors">
                <FontAwesomeIcon
                  className="text-white w-[20px] sm:w-[22px] md:w-[25px]"
                  icon={faWhatsapp}
                />
              </div>
            </a>
          </div>        </div>
      </section>
      <hr className="bg-white"></hr>
      <div className="flex w-full justify-center sm:justify-end">
        <p className="text-white font-sans font-regular text-xs sm:text-sm md:text-base text-center sm:text-right">
          © {new Date().getFullYear()} Candelur S.A. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default Footer;
