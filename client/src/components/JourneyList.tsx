import React from "react";
import { journeyDataI, userI } from "../types";
import Journey from "./Journey";

const JourneyList: React.FC<userI> = ({ user }) => {
  return (
    <div className="journeyList overflow-y-scroll z-0 flex flex-col gap-2 -mb-2">
      {user.journeys.map((journey: journeyDataI) => (
        <Journey data={journey} id={journey._id} key={journey._id} />
      ))}
    </div>
  );
};

export default JourneyList;
