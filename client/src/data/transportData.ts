import carIcon from "../assets/icons/car_icon.svg";
import bikeIcon from "../assets/icons/bicycle_icon.svg";
import pedestrianIcon from "../assets/icons/pedestrian_icon.svg";
import planeIcon from "../assets/icons/plane_icon.svg";
import { TransportDataI } from "../types";

export const transportData: TransportDataI[] = [
  {
    name: "DRIVING",
    text: "SAMOCHODEM",
    icon: carIcon,
  },
  {
    name: "BICYCLING",
    text: "ROWEREM",
    icon: bikeIcon,
  },
  {
    name: "WALKING",
    text: "PIESZO",
    icon: pedestrianIcon,
  },
  {
    name: "FLYING",
    text: "SAMOLOTEM",
    icon: planeIcon,
  },
];
