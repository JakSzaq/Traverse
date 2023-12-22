import React, { useState } from "react";
import { journeyDataI } from "../types";
import arrowIcon from "../assets/icons/arrow_icon.svg";
import starIcon from "../assets/icons/star_icon.svg";
import trashIcon from "../assets/icons/remove_icon.svg";
import { useNavigate } from "react-router-dom";

const Journey: React.FC<{ data: journeyDataI; id: string }> = ({
  data,
  id,
}) => {
  const [isHovered, setIsHovered] = useState(0);
  const navigate = useNavigate();
  return (
    <div
      onMouseEnter={() => setIsHovered(1)}
      onMouseLeave={() => setIsHovered(0)}
      className={`journey relative !first:mb-0 last:mb-4 flex flex-col justify-center items-center bg-primary-color w-full p-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] before:content-[''] before:absolute before:bg-yellow-400 before:duration-500 before:-left-full before:w-[100%] before:-z-50 before:h-full after:content-[''] after:absolute after:bg-red-500 after:duration-500 after:left-full after:w-[100%] after:-z-50 after:h-full ${
        isHovered == 2 && "before:hover:left-0 "
      } ${isHovered == 3 && "after:hover:left-0 "}`}
    >
      <div className="dateRow w-full flex flex-row justify-between items-center text-white font-bold text-xl">
        <p>
          {("0" + (new Date(data.startDate).getMonth() + 1)).slice(-2) +
            "." +
            ("0" + new Date(data.startDate).getDate()).slice(-2) +
            " - " +
            ("0" + (new Date(data.endDate).getMonth() + 1)).slice(-2) +
            "." +
            ("0" + new Date(data.endDate).getDate()).slice(-2)}
        </p>
        {new Date(data.endDate).getFullYear()}
      </div>
      <div className="placeRow w-full flex flex-row justify-between items-center text-white font-bold text-3xl uppercase">
        <p className="w-auto max-w-[11rem] text-ellipsis overflow-hidden whitespace-nowrap">
          {data.startPlace.split(",", 1)[0]}
        </p>
        <img className="w-10 absolute right-[47%]" src={arrowIcon} />
        <p className="w-auto max-w-[11rem] text-ellipsis overflow-hidden whitespace-nowrap">
          {data.endPlace.split(",", 1)[0]}
        </p>
      </div>
      <div className="buttons w-full flex flex-row justify-between items-center mt-4 mb-1 ">
        <div
          onMouseEnter={() => setIsHovered(2)}
          onMouseLeave={() => setIsHovered(1)}
          className={`w-8 h-8 p-[6px] flex justify-center items-center rounded-full duration-300 hover:bg-yellow-400 bg-back-color bg-opacity-50 hover:bg-opacity-100 cursor-pointer opacity-0 ${
            isHovered !== 0 && "!opacity-100"
          }`}
        >
          <img className="w-full invert brightness-0" src={starIcon} />
        </div>
        <button
          className="button w-50 h-6 flex items-center duration-300 bg-opacity-50 hover:bg-opacity-100 bg-back-color rounded-full px-10 py-4 font-bold text-sm"
          onClick={() => navigate(id.toString())}
        >
          WYŚWIETL SZCZEGÓŁY
        </button>
        <div
          onMouseEnter={() => setIsHovered(3)}
          onMouseLeave={() => setIsHovered(1)}
          className={`w-8 h-8 p-[8px] flex justify-center items-center rounded-full duration-300 hover:bg-red-500 bg-back-color bg-opacity-50 hover:bg-opacity-100 cursor-pointer opacity-0 ${
            isHovered !== 0 && "!opacity-100"
          }`}
        >
          <img className="w-full invert brightness-0" src={trashIcon} />
        </div>
      </div>
    </div>
  );
};

export default Journey;
