import plusIcon from "../assets/icons/plus_icon.svg";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import JourneyList from "../components/JourneyList";
import { JourneyDataI, UserT } from "../types";
import FavouriteList from "../components/FavouriteList";
import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";

const DashboardPage = () => {
  const navigate = useNavigate();
  const user: UserT = JSON.parse(localStorage.getItem("user")!);
  const [journeys, setJourneys] = useState<JourneyDataI[]>([]);
  const [favourites, setFavourites] = useState<JourneyDataI[]>([]);
  const [isLoaded, setIsLoaded] = useState({
    journeys: false,
    favourites: false,
  });

  useEffect(() => {
    setIsLoaded({ ...isLoaded, journeys: true });
  }, [journeys]);

  useEffect(() => {
    setIsLoaded({ ...isLoaded, favourites: true });
  }, [favourites]);

  if (!isLoaded.journeys && !isLoaded.favourites) {
    return <LoadingScreen />;
  }

  return (
    <div className="content w-full h-screen relative bg-back-color z-0 flex flex-col flex-wrap justify-center items-center">
      <Navbar />
      <div className="panel-wrap absolute top-0 pt-16 sm:pt-20 w-full bg-back-color h-auto flex flex-col justify-center items-center gap-6">
        <div className="panel w-[95%] sm:w-[600px] h-auto flex flex-col overflow-y-scroll justify-center items-center gap-6">
          <h1 className="text-5xl xs:text-6xl sm:text-7xl font-normal -mb-4 whitespace-nowrap">
            Witaj,{" "}
            <span className="text-primary-color font-bold">{user.name}</span>
          </h1>
          <h3 className="text-3xl xs:text-4xl text-center sm:text-left">
            Poniżej są twoje podróże
          </h3>
          <div className="journeys relative w-full h-auto max-h-[19rem] sm:max-h-[13rem] flex flex-col">
            <JourneyList
              user={user}
              journeys={journeys}
              setJourneys={setJourneys}
              setFavourites={setFavourites}
            />
            <div className="line w-full z-30 h-[4px] min-h-[6px] bg-primary-color mb-2"></div>
          </div>
          <div className="favorites w-full">
            <FavouriteList
              user={user}
              journeys={favourites}
              setJourneys={setJourneys}
              setFavourites={setFavourites}
            />
            <div className="line w-full h-[4px] mt-4 min-h-[6px] bg-black"></div>
          </div>
          <p className="font-bold h-auto text-lg leading-6 spacing tracking-wide text-center sm:text-left">
            W każdej chwili możesz utworzyć nową podróż według własnych
            preferencji lub z naszą pomocą
          </p>
          <div
            className="group h-auto create w-full cursor-pointer"
            onClick={() => navigate("new")}
          >
            <div className="border-t-4 mb-10 lg:mb-0 border-primary-color flex flex-col items-center bg-white w-full p-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] duration-500 shadow-[inset_0_0_0_#22cc3d] text-black hover:shadow-[inset_0_110px_0_#22cc3d] xs:hover:shadow-[inset_0_75px_0_#22cc3d]">
              <div className="placeRow w-full flex gap-2 xs:gap-0 flex-col xs:flex-row justify-between items-center font-bold text-3xl">
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
    </div>
  );
};

export default DashboardPage;
