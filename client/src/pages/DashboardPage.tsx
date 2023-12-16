import arrowIcon from "../assets/icons/arrow_icon.svg";
import starIcon from "../assets/icons/star_icon.svg";
import plusIcon from "../assets/icons/plus_icon.svg";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { journeyDataI } from "../types";

const DashboardPage = () => {
  const navigate = useNavigate();
  // const [journeys, setJourneys] = useState<object[]>([{}]);
  const user = JSON.parse(localStorage.getItem("user")!);

  return (
    <div className="content w-full h-screen relative bg-back-color z-0 flex flex-col flex-wrap justify-center items-center">
      <Navbar />
      <div className="panel w-[600px] h-full flex flex-col justify-center items-center gap-6">
        <h1 className="text-7xl font-normal">
          Witaj,{" "}
          <span className="text-primary-color font-bold">{user.name}</span>
        </h1>
        <h3 className="text-4xl">Poniżej są twoje podróże</h3>
        <div className="journeys relative w-full h-[30vh] flex flex-col">
          <div className="journeyList relative overflow-scroll flex flex-col gap-2">
            {user.journeys.map((journey: journeyDataI) => (
              <div className="test last:mb-8 flex flex-col items-center bg-primary-color w-full p-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <div className="dateRow w-full flex flex-row justify-between items-center text-white font-bold text-xl">
                  <p>
                    {("0" + (new Date(journey.startDate).getMonth() + 1)).slice(
                      -2
                    ) +
                      "." +
                      ("0" + new Date(journey.startDate).getDate()).slice(-2) +
                      " - " +
                      ("0" + (new Date(journey.endDate).getMonth() + 1)).slice(
                        -2
                      ) +
                      "." +
                      ("0" + new Date(journey.endDate).getDate()).slice(-2)}
                  </p>
                  {new Date(journey.endDate).getFullYear()}
                </div>
                <div className="placeRow w-full flex flex-row justify-between items-center text-white font-bold text-3xl uppercase">
                  <p>{journey.startPlace}</p>
                  <img className="w-10" src={arrowIcon} />
                  <p>{journey.endPlace}</p>
                </div>
                <button
                  className="button w-50 h-6 flex items-center duration-500 bg-opacity-50 hover:bg-opacity-100 bg-back-color rounded-full mt-4 mb-1 px-10 py-4 font-bold text-sm"
                  onClick={() => navigate("1")}
                >
                  WYŚWIETL SZCZEGÓŁY
                </button>
              </div>
            ))}
          </div>
          <div className="gradient w-full h-20 absolute bottom-0 bg-gradient-to-b from-[rgba(190,255,201,0)] from-0% to-[rgba(190,255,201,0.9)] to-80%"></div>
          <div className="line w-full z-30 h-3 -mt-2 bg-primary-color mb-2"></div>
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
