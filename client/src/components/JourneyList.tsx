import React from "react";
import { JourneyDataI, UserI } from "../types";
import Journey from "./Journey";

const JourneyList: React.FC<UserI> = ({ user }) => {
  if (user.journeys.length == 0) {
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
      <div className="journeyList overflow-y-scroll z-0 flex flex-col gap-2 -mb-2">
        {user.journeys.map((journey: JourneyDataI) => (
          <Journey data={journey} id={journey._id} key={journey._id} />
        ))}
      </div>
    );
  }
};

export default JourneyList;
