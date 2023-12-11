import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuizPrompt from "./QuizPrompt";
import { quizData } from "../data/quizData";

type data = {
  picks: number[];
  setPicks: React.Dispatch<React.SetStateAction<number[]>>;
};

const QuizForm: React.FC<data> = ({ picks, setPicks }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const navigate = useNavigate();

  const handleSelect = (num: number) => {
    const question = picks.map((pick, i) => {
      if (currentQ === i) {
        return (pick = num);
      } else {
        return pick;
      }
    });
    setPicks(question);
    setCurrentQ(currentQ + 1);
  };

  useEffect(() => {
    if (currentQ < 0) {
      navigate(-1);
    }
  }, [currentQ]);
  switch (currentQ) {
    case 0:
      return (
        <QuizPrompt
          question={currentQ}
          setQuestion={setCurrentQ}
          select={handleSelect}
          header={quizData[0].header}
          qnText={quizData[0].qnText}
          qnImage={quizData[0].qnImage}
        />
      );
    case 1:
      return (
        <QuizPrompt
          question={currentQ}
          setQuestion={setCurrentQ}
          select={handleSelect}
          header={quizData[1].header}
          qnText={quizData[1].qnText}
          qnImage={quizData[1].qnImage}
        />
      );
    case 2:
      return (
        <QuizPrompt
          question={currentQ}
          setQuestion={setCurrentQ}
          select={handleSelect}
          header={quizData[2].header}
          qnText={quizData[2].qnText}
          qnImage={quizData[2].qnImage}
        />
      );
    case 3:
      return (
        <QuizPrompt
          question={currentQ}
          setQuestion={setCurrentQ}
          select={handleSelect}
          header={quizData[3].header}
          qnText={quizData[3].qnText}
          qnImage={quizData[3].qnImage}
        />
      );
  }
};

export default QuizForm;
