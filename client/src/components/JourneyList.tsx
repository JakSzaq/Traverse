import React, { useEffect } from "react";
import { JourneyDataI, JourneyListI } from "../types";
import Journey from "./Journey";
import { AnimatePresence, motion } from "framer-motion";
import { journeyVariants } from "../data/animationVariants";

const JourneyList: React.FC<JourneyListI> = ({
  user,
  journeys,
  setJourneys,
  setFavourites,
}) => {
  useEffect(() => {
    const fetchJourneys = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/users/journeys/${user.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (data.status === "fail" || data.status === "error") {
        alert("Something went wrong!");
        return;
      }
      console.log(data.data.userJourneys);
      setJourneys(data.data.userJourneys);
    };
    fetchJourneys();
  }, []);

  const sortByDate = (a: JourneyDataI, b: JourneyDataI) => {
    return Number(new Date(b.startDate)) - Number(new Date(a.startDate));
  };

  if (journeys.length == 0) {
    return (
      <div className="journey relative flex flex-col h-44 justify-center items-center mb-5 bg-primary-color w-full p-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <h2 className="text-3xl text-center font-bold -skew-y-6">
          NIE STWORZYŁEŚ JESZCZE
          <br /> ŻADNEJ PODRÓŻY :(
        </h2>
      </div>
    );
  } else {
    return (
      <AnimatePresence>
        <motion.div
          variants={journeyVariants}
          initial="initial"
          animate="animate"
          className="journeyList overflow-y-scroll snap-mandatory snap-y z-0 flex flex-col gap-2 -mb-2"
          key={journeys[0]._id}
        >
          {journeys.sort(sortByDate).map((journey: JourneyDataI) => (
            <Journey
              journey={journey}
              user={user}
              setJourneys={setJourneys}
              setFavourites={setFavourites}
              key={journey._id}
              isFavorite={false}
            />
          ))}
        </motion.div>
        {journeys.length > 1 && (
          <div className="gradient pointer-events-none w-full h-20 absolute bottom-0 bg-gradient-to-b from-[rgba(190,255,201,0)] from-0% to-[rgba(190,255,201,0.9)] to-80%"></div>
        )}
      </AnimatePresence>
    );
  }
};

export default JourneyList;
