import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import errorIcon from "../assets/icons/error_icon.svg";
import logoIcon from "../assets/icons/traverse_icon.svg";
import { useCountdown } from "../hooks/useCountdown";

const ErrorPage = () => {
  const [time, label] = useCountdown(10);
  const navigate = useNavigate();

  if (time == 0 && label == "sekund") {
    navigate("/");
  }

  return (
    <div className="h-screen w-full bg-back-color flex flex-col justify-center items-center gap-10 relative">
      <h2 className="text-4xl font-bold mt-10 -skew-y-6 z-10">ZABŁĄDZIŁEŚ</h2>
      <img className="w-20 z-10" src={errorIcon} />
      <h2 className="font-medium z-10">
        Ta strona nie istnieje lub nie masz do niej dostępu
      </h2>
      <img className="absolute w-full h-[90vh] z-0 opacity-10" src={logoIcon} />
      <h2 className="font-bold -mt-8">
        Zostaniesz przeniesiony na stronę główną za {time} {label}
      </h2>
    </div>
  );
};

export default ErrorPage;
