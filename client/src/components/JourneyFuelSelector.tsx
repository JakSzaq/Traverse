import React, { useState } from "react";
import headerIcon from "../assets/icons/headerIcon.svg";
import { fuelData } from "../data/fuelData";
import { motion } from "framer-motion";
import { FuelT } from "../types";

interface FuelSelectorI {
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setFuelType: React.Dispatch<React.SetStateAction<FuelT>>;
}

const JourneyFuelSelector: React.FC<FuelSelectorI> = ({
  setIsClicked,
  setFuelType,
}) => {
  const [isHovered, setIsHovered] = useState(-1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: ".1",
      }}
      className="overlay fixed w-full h-full top-0 left-0 z-10 bg-black bg-opacity-70 flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.1,
          delay: 0.25,
        }}
        className="box w-[950px] h-4/6 bg-primary-color z-10 rounded-[30px] p-10 relative flex flex-col items-center justify-start mt-16"
      >
        <motion.img
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 20, -20, 20, -20, 0] }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            repeat: Infinity,
            repeatDelay: 10,
          }}
          className="logo absolute -top-16"
          src={headerIcon}
        />
        <h2 className="header font-bold text-white text-[2.5rem] leading-[3rem] text-center my-10 z-10">
          Dla dokładniejszych wyliczeń wybierz rodzaj paliwa, jakim zasilany
          jest twój pojazd
        </h2>
        <div className="types w-full h-full grid grid-cols-3 grid-rows-2 gap-10 z-10">
          {fuelData.map((fuelType, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setIsHovered(idx)}
              onMouseLeave={() => setIsHovered(-1)}
              onClick={() => {
                setFuelType({
                  value: fuelType.alias,
                  usage: fuelType.usage,
                });
                setIsClicked(false);
              }}
              className={`fuel rounded-2xl border-4 ${
                isHovered == idx ? "border-none" : "border-back-color"
              } flex flex-col items-center justify-center duration-100 cursor-pointer`}
              style={{
                background: isHovered == idx ? fuelType.color : "#22cc3d",
              }}
            >
              <h2
                className={`type font-bold outline-4 text-[5rem] leading-[5rem] ${
                  isHovered == idx ? "text-white" : "text-primary-color"
                }`}
                style={{
                  WebkitTextStroke:
                    isHovered == idx ? "0px white" : "2px #beffc9",
                }}
              >
                {fuelType.type}
              </h2>
              <p
                className={`type font-bold outline-4 text-3xl ${
                  isHovered == idx ? "text-white" : "text-back-color"
                }`}
              >
                {fuelType.name}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JourneyFuelSelector;
