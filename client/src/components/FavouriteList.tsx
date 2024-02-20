import React, { useEffect } from "react";
import { JourneyDataI, JourneyListI } from "../types";
import Journey from "./Journey";
import { AnimatePresence, motion } from "framer-motion";
import { journeyVariants } from "../data/animationVariants";
import starIcon from "../assets/icons/star_icon.svg";
import toast from "react-hot-toast";

const FavouriteList: React.FC<JourneyListI> = ({
  user,
  journeys,
  setJourneys,
  setFavourites,
}) => {
  useEffect(() => {
    const fetchFavourites = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/users/favourites/${user.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (data.status === "fail" || data.status === "error") {
        toast.error("Nie można załadować ulubionych!");
        return;
      }
      setFavourites(data.data.userFavourites);
    };
    fetchFavourites();
  }, []);
  const sortByDate = (a: JourneyDataI, b: JourneyDataI) => {
    return Number(new Date(b.startDate)) - Number(new Date(a.startDate));
  };

  return (
    <div className="favourites">
      <div className="test flex flex-col items-center bg-black w-full p-4 mb-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <div className="placeRow w-full flex flex-row justify-between items-center text-white font-bold text-3xl">
          <p>
            ULUBIONE{" "}
            <span className="text-yellow-300 mx-2">{journeys.length}</span>
          </p>
          <img className="w-7" src={starIcon} />
        </div>
      </div>
      <AnimatePresence>
        <motion.div
          variants={journeyVariants}
          initial="initial"
          animate="animate"
          className="favouriteList snap-mandatory snap-y overflow-y-scroll max-h-[18vh] z-0 flex flex-col gap-2 -mb-4"
        >
          {journeys.sort(sortByDate).map((favourite: JourneyDataI) => (
            <Journey
              journey={favourite}
              user={user}
              setJourneys={setJourneys}
              setFavourites={setFavourites}
              key={favourite._id}
              isFavorite={true}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FavouriteList;
