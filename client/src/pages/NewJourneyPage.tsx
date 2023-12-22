import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import QuizForm from "../components/QuizForm";
import JourneyPanel from "../components/JourneyPanel";
import { journeyDataI } from "../types";

const defaultProps: journeyDataI = {
  startPlace: "",
  endPlace: "",
  startDate: new Date(),
  endDate: "",
  transportType: "DRIVING",
  length: "",
  items: [],
  people: [],
  _id: "",
};

const NewJourneyPage = () => {
  const [quizData, setQuizData] = useState<any>([0, 0, 0, 0]);
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    if (quizData[0] == 1) {
      setIsFinished(true);
      setResult("A");
    }
    if (quizData[1] == 1) {
      setIsFinished(true);
    }
    if (quizData[3] == 1) {
      setIsFinished(true);
    }
    if (quizData[3] == 2) {
      setIsFinished(true);
    }
  }, [quizData]);

  return (
    <div className="content w-full h-screen relative bg-back-color z-0 flex flex-col flex-wrap justify-center items-center">
      <Navbar />
      {result == "A" && <JourneyPanel {...defaultProps} />}
      {!isFinished && <QuizForm picks={quizData} setPicks={setQuizData} />}
    </div>
  );
};

export default NewJourneyPage;
