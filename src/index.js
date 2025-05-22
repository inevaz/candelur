import {
  RxCrop,
  RxDesktop,
  RxPencil2,
  RxReader,
} from "react-icons/rx";

export const ServiceData = [
  {
    icon: RxCrop,
    title: "Development",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: "/img/Camion-Grua-23.jpeg",
    backgroundStyle: "100% 113%", // estilo personalizado para esta imagen
    infoStyle: "absolute top-6 right-10", 
  },
  {
    icon: RxPencil2,
    title: "Branding",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: "/img/Plataforma-05.jpeg",
    backgroundStyle: "100% 107%", // diferente estilo para esta
    infoStyle: "absolute top-[50%] right-10",
  },
  {
    icon: RxDesktop,
    title: "Design",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: "/img/Elevador-04.jpeg",
    backgroundStyle: "cover", // combinación de valores
    infoStyle: "absolute top-[30%] left-10",
  }
];