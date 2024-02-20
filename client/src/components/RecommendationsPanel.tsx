import React, { useState } from "react";
import { RecommendationPanelI } from "../types";
import { recommendationData } from "../data/recommendationData";
import backIcon from "../assets/icons/back_icon.svg";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const RecommendationsPanel: React.FC<RecommendationPanelI> = ({
  result,
  setIsFinished,
  setPlace,
}) => {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.5 }}
        className="w-full relative h-screen flex flex-col justify-start items-center duration-500 overflow-hidden mt-10 sm:mt-20 bg-[rgba(190,255,201,0)] lg:bg-transparent "
      >
        <div className="top flex w-full flex-col justify-center items-center">
          <h2 className="text-4xl sm:text-5xl py-10 text-center">
            Oto nasze propozycje
          </h2>
          <div className="list flex flex-col lg:flex-row gap-5">
            <h3
              onClick={() => navigate("/")}
              className="group text-3xl font-bold bg-white px-10 py-2 border-4 border-white rounded-full flex items-center justify-center gap-4 cursor-pointer"
            >
              <img
                className="w-10 duration-200 group-hover:-translate-x-2"
                src={backIcon}
              />
              WRÓĆ
            </h3>
            {recommendationData[result!].places.map((place, i) => (
              <h3
                onClick={() => {
                  setSelected(i);
                  setPlace(place);
                }}
                className={`text-3xl font-bold bg-primary-color px-10 py-2 cursor-pointer rounded-full border-4 border-transparent duration-100 hover:bg-opacity-50 flex  items-center justify-center ${
                  selected == i && "bg-white !border-primary-color"
                }`}
              >
                {recommendationData[result!].places[i].split(",")[0]}
                <p className=" absolute text-sm translate-y-7 lg:translate-y-0 lg:top-44 w-auto h-6 px-4 bg-back-color border-2 border-primary-color rounded-full">
                  {place.split(",")[1]}
                </p>
              </h3>
            ))}
            <h3
              onClick={() => setIsFinished(true)}
              className="group text-3xl font-bold bg-white px-10 py-2 border-4 border-white rounded-full flex items-center justify-center gap-4 cursor-pointer"
            >
              DALEJ
              <img
                className="w-10 rotate-180 duration-200 group-hover:translate-x-2"
                src={backIcon}
              />
            </h3>
          </div>
        </div>
        <motion.div
          key={selected}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.25,
            type: easeInOut,
          }}
          style={{
            backgroundImage: `url(${
              recommendationData[result!].images[selected]
            }`,
          }}
          className="bottom -bottom-24 md:-bottom-[36rem] lg:-bottom-[36rem] xs:w-[150%] md:w-[250%] xl:w-[200%] w-[200%] max-w-6xl h-auto aspect-square absolute rounded-full flex justify-center items-center border-8 border-primary-color md:bg-contain bg-cover bg-no-repeat -z-10"
        ></motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RecommendationsPanel;
