import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import QuizForm from "../components/QuizForm";
import JourneyPanel from "../components/JourneyPanel";
import RecommendationsPanel from "../components/RecommendationsPanel";

const NewJourneyPage = () => {
  const [quizData, setQuizData] = useState<any>([0, 0, 0, 0]);
  const [isFinished, setIsFinished] = useState(false);
  const [place, setPlace] = useState("");
  const [result, setResult] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (quizData[0] == 1) {
      setIsFinished(true);
    }
    if (quizData[1] == 1) {
      setResult(0);
    }
    if (quizData[2] == 1 && quizData[3] == 1) {
      setResult(1);
    }
    if (quizData[2] == 1 && quizData[3] == 2) {
      setResult(2);
    }
    if (quizData[2] == 2 && quizData[3] == 1) {
      setResult(3);
    }
    if (quizData[2] == 2 && quizData[3] == 2) {
      setResult(4);
    }
  }, [quizData]);

  return (
    <div className="page-content w-full h-screen relative bg-back-color z-0 flex flex-col flex-wrap justify-center items-center">
      <Navbar />
      {isFinished && <JourneyPanel endPlace={place} mode={"CREATE"} />}
      {!isFinished && (
        <>
          {result == undefined ? (
            <QuizForm picks={quizData} setPicks={setQuizData} />
          ) : (
            <RecommendationsPanel
              result={result}
              setIsFinished={setIsFinished}
              setPlace={setPlace}
            />
          )}
        </>
      )}
    </div>
  );
};

export default NewJourneyPage;
