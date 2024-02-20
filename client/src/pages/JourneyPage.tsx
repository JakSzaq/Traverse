import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import JourneyPanel from "../components/JourneyPanel";
import LoadingScreen from "../components/LoadingScreen";
import { JourneyPropsI, UserT } from "../types";
import toast from "react-hot-toast";

const JourneyPage = () => {
  const { id } = useParams();
  const user: UserT = JSON.parse(localStorage.getItem("user")!);
  const [isLoaded, setIsLoaded] = useState(false);
  const [journey, setJourney] = useState<JourneyPropsI>();
  const navigate = useNavigate();

  useEffect(() => {
    const getJourney = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/users/journeys/${
          user.id
        }/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await response.json();
      if (result.data.journey == undefined) {
        navigate("error");
      }
      if (result.status === "fail" || result.status === "error") {
        toast.error("Nie można pobrać danych podróży!");
        return;
      }
      setJourney({
        ...result.data.journey,
        startDate: new Date(result.data.journey.startDate)
          .toISOString()
          .substring(0, 10),
        endDate: new Date(result.data.journey.endDate)
          .toISOString()
          .substring(0, 10),
      });
    };
    getJourney();
  }, [id]);

  useEffect(() => {
    setIsLoaded(true);
  }, [journey]);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div className="page-content w-full h-screen relative bg-back-color z-0 flex flex-col flex-wrap justify-center items-center">
      <Navbar />
      {journey !== undefined && <JourneyPanel {...journey} mode="VIEW" />}
    </div>
  );
};

export default JourneyPage;
