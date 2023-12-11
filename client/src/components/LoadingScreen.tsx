import React from "react";
import icon from "../assets/icons/traverse_icon.svg";

const LoadingScreen: React.FC = () => {
  return (
    <div className="content w-full h-screen overflow-hidden relative bg-back-color z-0 flex flex-col flex-wrap items-center">
      <div className="bg-layer w-full h-screen flex justify-center items-center absolute">
        <svg
          className="transform scale-[11]"
          width="81"
          height="153"
          viewBox="0 0 81 153"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="traverse_icon"
            d="M40.9286 147.417L74.5286 47.9304C85.2444 -10.3553 -5.0556 -8.25532 5.92863 47.9304L29.0286 122.83L54.2286 47.9304C61.7 18.3 8.15918 23.9 33 56.1"
            stroke="#93FFA4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="h-3/6 pt-16 z-10 flex flex-col justify-between items-center">
        <img className="w-8" src={icon} />
        <h2 className="text-4xl justify-self-center">To potrwa chwilę...</h2>
      </div>
    </div>
  );
};

export default LoadingScreen;
