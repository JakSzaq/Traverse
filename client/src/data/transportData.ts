import carIcon from "../assets/icons/car_icon.svg";
import bikeIcon from "../assets/icons/bicycle_icon.svg";
import pedestrianIcon from "../assets/icons/pedestrian_icon.svg";
import planeIcon from "../assets/icons/plane_icon.svg";
import { TransportDataI } from "../types";
import { TransportType } from "../types";

export const transportData: TransportDataI[] = [
  {
    name: TransportType.DRIVING,
    text: "SAMOCHODEM",
    icon: carIcon,
  },
  {
    name: TransportType.BICYCLING,
    text: "ROWEREM",
    icon: bikeIcon,
  },
  {
    name: TransportType.WALKING,
    text: "PIESZO",
    icon: pedestrianIcon,
  },
  {
    name: "FLYING",
    text: "SAMOLOTEM",
    icon: planeIcon,
  },
];
