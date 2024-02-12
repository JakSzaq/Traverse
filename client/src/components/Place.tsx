import React from "react";
import { PlaceI } from "../types";
import rateIcon from "../assets/icons/rate_icon.svg";

const Place: React.FC<PlaceI> = ({ element, map, setSelectedPlace }) => {
  const handleClick = () => {
    map?.setCenter(element.geometry!.location!);
    map?.setZoom(16);
    setSelectedPlace(element);
  };
  return (
    <div
      onClick={() => handleClick()}
      className="relative flex-1 place-card before:duration-200 w-full h-28 before:flex before:items-center before:text-white before:text-xl before:font-bold before:justify-center before:content-['ZOBACZ_NA_MAPIE'] before:absolute before:h-28 before:w-full overflow-hidden before:translate-y-28 before:skew-y-[8deg] before:hover:skew-y-0 before:hover:translate-y-0 before:bg-primary-color  bg-back-color hover:cursor-pointer"
    >
      <div className="header h-8 bg-primary-color flex items-center justify-start px-2 text-white font-bold">
        <h2 className="w-64 duration-100 text-ellipsis overflow-hidden whitespace-nowrap">
          {element.name}
        </h2>
      </div>
      <div className="flex flex-row h-20 items-center justify-between px-4">
        <div className="rating flex flex-row gap-2 items-center justify-center">
          <h2 className="text-4xl">{element.rating}</h2>
          <img src={rateIcon}></img>
        </div>
        <hr className="h-[75%] w-0.5 bg-primary-color"></hr>
        <div className="rating flex flex-col items-center justify-center">
          <h2 className="text-md">Opinie o miejscu</h2>
          <h2 className="text-2xl">{element.user_ratings_total}</h2>
        </div>
      </div>
    </div>
  );
};

export default Place;
