//default backgrounds
import plain from "../assets/images/quiz_plain.png";
import color from "../assets/images/quiz_color.png";

//custom backgrounds
import local from "../assets/images/quiz_local.png";
import international from "../assets/images/quiz_international.png";
import europe from "../assets/images/quiz_europe.png";
import world from "../assets/images/quiz_world.png";
import warm from "../assets/images/quiz_warm.png";
import cold from "../assets/images/quiz_cold.png";

//interface
import { QuizDataI } from "../types";

//quiz prompts
export const quizData: QuizDataI[] = [
  {
    header: "Wybierz czego potrzebujesz",
    qnText: [
      "DOSTOSUJ SAMODZIELNIE PODRÓŻ",
      "SKORZYSTAJ Z NASZYCH REKOMENDACJI",
    ],
    qnImage: [plain, color],
  },
  {
    header: "Wybierz typ podróży",
    qnText: ["PODRÓŻ KRAJOWA", "PODRÓŻ ZAGRANICZNA"],
    qnImage: [local, international],
  },
  {
    header: "Wybierz zasięg podróży",
    qnText: ["EUROPA", "ŚWIAT"],
    qnImage: [europe, world],
  },
  {
    header: "Wybierz klimat kraju",
    qnText: ["CIEPŁY", "ZIMNY"],
    qnImage: [warm, cold],
  },
];
