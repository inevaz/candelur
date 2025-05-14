import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

const footer = () => {
  return (
    <div className='bg-black h-full w-full flex flex-col gap-7 px-[20dvw] py-[12dvh]'>
        <section className='flex items-center justify-between pt-12'>
            <div className='h-[80px] w-[350px] bg-gray-400 rounded-xl'>

            </div>
            <div className=' text-white font-bold flex items-center py-2 px-4 gap-2 rounded-4xl border-white border-2'>
                <FontAwesomeIcon className='text-white h-[20px] w-[20px] ' icon={faLocationDot} />
                Uruguay
            </div>
            
        </section>
        <hr className='bg-white'></hr>
        <section className='flex justify-between items-start'> 
            <div className='flex gap-15'>
                <div className='flex flex-col gap-4'>
                    <p className='text-white text-xs uppercase'>Sobre Nosotros</p>
                    <ul className='text-white font-bold flex flex-col gap-4'>
                        <li>Nuestra Compañia</li>
                        <li>Nuestra historia</li>
                        <li>Trabaja con nosotros</li>
                    </ul>
                </div>
                <div className='flex flex-col gap-4'>
                    <p className='text-white text-xs uppercase'>¿Necesitas ayuda?</p>
                    <ul className='text-white font-bold flex flex-col gap-4'>
                        <li>Preguntas frecuentes</li>
                        <li>Mapa del sitio</li>
                        <li>Contactanos</li>
                    </ul>
                </div>
                <div className='flex flex-col gap-4'>
                    <p className='text-white text-xs uppercase'>Sobre Nosotros</p>
                    <ul className='text-white font-bold flex flex-col gap-4'>
                        <li>Terminos de uso</li>
                        <li>Politica de privacidad </li>
                        <li>Configuracion de cookies</li>
                    </ul>
                </div>
            </div>
            <div className='flex gap-4'>
                <div className='rounded-full border-2 border-white p-1' ><FontAwesomeIcon className='text-white w-[25px] ' icon={faInstagram} /></div>
                <div className='rounded-full border-2 border-white p-1' ><FontAwesomeIcon className='text-white w-[25px] ' icon={faFacebookF} /></div>
                <div className='rounded-full border-2 border-white p-1' ><FontAwesomeIcon className='text-white w-[25px] ' icon={faWhatsapp} /></div>
            </div>
        </section>
        <hr className='bg-white'></hr>
        <div className='flex w-full justify-end'><p className='text-white text-bold'>© 2025 Candelure S.A. Todos los derechos reservados.</p></div>
        
    </div>
  )
}

export default footer