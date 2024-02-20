//custom backgrounds
import wroclaw from "../assets/images/recommendations/wroclaw.jpg";
import torun from "../assets/images/recommendations/torun.jpg";
import krakow from "../assets/images/recommendations/krakow.jpg";
import madryt from "../assets/images/recommendations/madryt.jpg";
import kreta from "../assets/images/recommendations/kreta.jpg";
import florencja from "../assets/images/recommendations/florencja.jpg";
import oslo from "../assets/images/recommendations/oslo.jpg";
import berno from "../assets/images/recommendations/berno.jpg";
import amsterdam from "../assets/images/recommendations/amsterdam.jpg";
import kapsztad from "../assets/images/recommendations/kapsztad.jpg";
import rio from "../assets/images/recommendations/rio.jpg";
import sydney from "../assets/images/recommendations/sydney.jpg";
import ottawa from "../assets/images/recommendations/ottawa.jpg";
import rejkiawik from "../assets/images/recommendations/rejkiawik.jpg";
import seoul from "../assets/images/recommendations/seoul.jpg";

//interface
import { RecommendationDataI } from "../types";

//quiz prompts
export const recommendationData: RecommendationDataI[] = [
  {
    places: ["Wrocław, Polska", "Kraków, Polska", "Toruń, Polska"],
    images: [wroclaw, krakow, torun],
  },
  {
    places: ["Madryt, Hiszpania", "Kreta, Grecja", "Florencja, Włochy"],
    images: [madryt, kreta, florencja],
  },
  {
    places: ["Oslo, Norwegia", "Berno, Szwajcaria", "Amsterdam, Holandia"],
    images: [oslo, berno, amsterdam],
  },
  {
    places: ["Kapsztad, RPA", "Rio De Janeiro, Brazylia", "Sydney, Australia"],
    images: [kapsztad, rio, sydney],
  },
  {
    places: [
      "Ottawa, Kanada",
      "Rejkiawik, Islandia",
      "Seoul, Korea Południowa",
    ],
    images: [ottawa, rejkiawik, seoul],
  },
];
