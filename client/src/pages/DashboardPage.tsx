import React, { useState } from "react";
import arrowIcon from "../assets/icons/arrow_icon.svg";
import starIcon from "../assets/icons/star_icon.svg";
import plusIcon from "../assets/icons/plus_icon.svg";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [journeys, setJourneys] = useState<object[]>([{}]);

  return (
    <div className="content w-full h-screen relative bg-back-color z-0 flex flex-col flex-wrap justify-center items-center">
      <Navbar />
      <div className="panel w-[500px] h-full flex flex-col justify-center items-center gap-6">
        <h1 className="text-7xl font-normal">
          Witaj, <span className="text-primary-color font-bold">Tomek</span>
        </h1>
        <h3 className="text-4xl">Poniżej są twoje podróże</h3>
        <div className="journeys w-full">
          {/* journeys.map((journey) => {}) */}{" "}
          <div className="test flex flex-col items-center bg-primary-color w-full p-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <div className="dateRow w-full flex flex-row justify-between items-center text-white font-bold text-xl">
              <p>26.09 - 28.09</p>
              <p>2023</p>
            </div>
            <div className="placeRow w-full flex flex-row justify-between items-center text-white font-bold text-3xl">
              <p>WARSZAWA</p>
              <img className="w-10" src={arrowIcon} />
              <p>NOWY JORK</p>
            </div>
            <button
              className="button w-50 h-6 flex items-center duration-500 bg-opacity-50 hover:bg-opacity-100 bg-back-color rounded-full mt-4 mb-1 px-10 py-4 font-bold text-sm"
              onClick={() => navigate("1")}
            >
              WYŚWIETL SZCZEGÓŁY
            </button>
          </div>
          <div className="line w-full h-1.5 bg-primary-color my-2"></div>
        </div>
        <div className="favorites w-full">
          {/* favorites.map((favorite) => {}) */}{" "}
          <div className="test">
            <div className="test flex flex-col items-center bg-black w-full p-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <div className="placeRow w-full flex flex-row justify-between items-center text-white font-bold text-3xl">
                <p>
                  ULUBIONE <span className="text-yellow-300 mx-2">0</span>
                </p>
                <img className="w-7" src={starIcon} />
              </div>
            </div>
            <div className="line w-full h-1.5 bg-black my-2"></div>
          </div>
        </div>
        <p className="font-bold text-lg leading-6 spacing tracking-wide">
          W każdej chwili możesz utworzyć nową podróż według własnych
          preferencji lub z naszą pomocą
        </p>
        <div
          className="group create w-full cursor-pointer"
          onClick={() => navigate("new")}
        >
          <div className=" border-t-4 border-primary-color test flex flex-col items-center bg-white w-full p-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] duration-500 shadow-[inset_0_0_0_#22cc3d] text-black hover:shadow-[inset_0_75px_0_#22cc3d]">
            <div className="placeRow w-full flex flex-row justify-between items-center font-bold text-3xl">
              <p className="group-hover:invert duration-300">NOWA PODRÓŻ</p>
              <img
                className="group-hover:invert duration-300 w-8"
                src={plusIcon}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
