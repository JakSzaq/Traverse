import React, { useEffect, useState } from "react";
import { JourneyI } from "../types";
import arrowIcon from "../assets/icons/arrow_icon.svg";
import starIcon from "../assets/icons/star_icon.svg";
import trashIcon from "../assets/icons/remove_icon.svg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { journeyVariants } from "../data/animationVariants";
import toast from "react-hot-toast";

const Journey: React.FC<JourneyI> = ({
  journey,
  user,
  setJourneys,
  setFavourites,
  isFavorite,
}) => {
  const [isHovered, setIsHovered] = useState(0);
  const [outdated, setIsOutdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      Number(new Date(journey.endDate)) + 86400000 < Number(new Date()) &&
      !isFavorite
    ) {
      setIsOutdated(true);
    } else {
      setIsOutdated(false);
    }
  }, [journey]);

  const removeJourney = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/users/journeys/${user.id}/${
        journey._id
      }`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    const result = await response.json();
    if (result.status === "fail" || result.status === "error") {
      toast.error("Nie udało się usunąć podróży!");
      return;
    }
    toast.success("Pomyślnie usunięto podróż!");
    setJourneys(result.journeys);
  };

  const addToFavourites = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/users/favourites/${user.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(journey),
      }
    );
    const result = await response.json();
    if (result.status === "fail" || result.status === "error") {
      toast.error("Nie udało się dodać do ulubionych!");
      return;
    }
    if (result.data.isFavourite) {
      toast.success("Usunięto podróż z ulubionych!");
    } else {
      toast.success("Dodano podróż do ulubionych!");
    }
    setFavourites(result.data.favourites);
  };

  return (
    <motion.div
      variants={journeyVariants}
      onMouseEnter={() => setIsHovered(1)}
      onMouseLeave={() => setIsHovered(0)}
      className={`journey relative overflow-x-clip snap-center snap-always last:mb-4 flex flex-col justify-center items-center ${
        isFavorite ? "bg-black" : "bg-primary-color"
      } w-full p-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] before:content-[''] before:absolute before:bg-yellow-400 before:duration-500 before:-left-full before:w-[100%] before:-z-50 before:h-full after:content-[''] after:absolute after:bg-red-500 after:duration-500 after:left-full after:w-[100%] after:-z-50 after:h-full ${
        isHovered == 2 && "before:hover:left-0 "
      } ${isHovered == 3 && "after:hover:left-0 "} ${
        outdated && "bg-opacity-50"
      }`}
    >
      <div className="dateRow w-full flex flex-row justify-between items-center text-white font-bold text-xl">
        <p>
          {("0" + new Date(journey.startDate).getDate()).slice(-2) +
            "." +
            ("0" + (new Date(journey.startDate).getMonth() + 1)).slice(-2) +
            " - " +
            ("0" + new Date(journey.endDate).getDate()).slice(-2) +
            "." +
            ("0" + (new Date(journey.endDate).getMonth() + 1)).slice(-2)}
        </p>
        {new Date(journey.endDate).getFullYear()}
      </div>
      <div className="placeRow w-full flex flex-row justify-between items-center text-white font-bold text-3xl uppercase">
        <p className="w-auto max-w-[11rem] text-ellipsis overflow-hidden whitespace-nowrap">
          {journey.startPlace.split(",", 1)[0]}
        </p>
        <img className="w-10 absolute right-[47%]" src={arrowIcon} />
        <p className="w-auto max-w-[11rem] text-ellipsis overflow-hidden whitespace-nowrap">
          {journey.endPlace.split(",", 1)[0]}
        </p>
      </div>
      <div className="buttons w-full flex flex-row justify-between items-center mt-4 mb-1 ">
        <div
          onClick={() => addToFavourites()}
          onMouseEnter={() => setIsHovered(2)}
          onMouseLeave={() => setIsHovered(1)}
          className={`w-8 h-8 p-[6px] flex justify-center items-center rounded-full duration-300 hover:bg-yellow-400 bg-back-color bg-opacity-50 hover:bg-opacity-100 cursor-pointer opacity-0 ${
            isHovered !== 0 && "opacity-100"
          } ${
            isFavorite
              ? "!opacity-0 pointer-events-none"
              : "pointer-events-auto"
          }`}
        >
          <img className="w-full invert brightness-0" src={starIcon} />
        </div>
        <button
          className={`button w-50 h-6 flex items-center duration-300 bg-opacity-50 hover:bg-opacity-100 ${
            isFavorite ? "bg-yellow-400" : "bg-back-color"
          } rounded-full px-10 py-4 font-bold text-sm`}
          onClick={() => navigate(journey._id.toString())}
        >
          WYŚWIETL SZCZEGÓŁY
        </button>
        <div
          onClick={() => (isFavorite ? addToFavourites() : removeJourney())}
          onMouseEnter={() => setIsHovered(3)}
          onMouseLeave={() => setIsHovered(1)}
          className={`w-8 h-8 p-[8px] flex justify-center items-center rounded-full duration-300 hover:bg-red-500 ${
            isFavorite ? "bg-yellow-400" : "bg-back-color"
          } bg-opacity-50 hover:bg-opacity-100 cursor-pointer opacity-0 ${
            isHovered !== 0 && "!opacity-100"
          }`}
        >
          <img className="w-full invert brightness-0" src={trashIcon} />
        </div>
      </div>
    </motion.div>
  );
};

export default Journey;
