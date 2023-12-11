import React from "react";
import { QuizFormI } from "../types";
import backIcon from "../assets/icons/back_icon.svg";

const QuizPrompt: React.FC<QuizFormI> = ({
  question,
  setQuestion,
  select,
  header,
  qnText,
  qnImage,
}) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center duration-500">
      <div className="w-40 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 flex items-center justify-between relative">
        <p className="-m-10 text-3xl">{question + 1}</p>
        <p className="-m-10 text-3xl">4</p>
        <div
          className={`bg-primary-color absolute duration-300 h-2.5 rounded-full flex items-center justify-between`}
          style={{ width: (question + 1) * 2.5 + "rem" }}
        ></div>
      </div>
      <div className="top flex flex-row gap-5 justify-center items-center">
        <img
          className="w-10 cursor-pointer duration-500 hover:-translate-x-2"
          src={backIcon}
          onClick={() => setQuestion(question - 1)}
        />
        <h2 className="text-5xl py-10">{header}</h2>
      </div>
      <div className="bottom flex lg:flex-row sm:flex-col gap-3 justify-center items-center">
        <div
          style={{
            backgroundImage: `url(${qnImage[0]})`,
          }}
          className="group group-hover:bg relative z-0 flex flex-col justify-between w-[30vw] h-[30vw] p-10 border-black border-[1px] cursor-pointer duration-500 hover:-translate-y-5 bg-[length:120%_120%] hover:bg-[left_-5rem]"
          onClick={() => select(1)}
        >
          <div className="overlay absolute top-0 left-0 w-full h-full -z-10 duration-500 bg-back-color/80 group-hover:bg-back-color/50"></div>
          <h2 className="txt1 text-5xl font-bold">{qnText[0]}</h2>
          <h2 className="num1 self-end justify-self-end text-9xl font-bold">
            {"0" + (question * 2 + 1)}
          </h2>
        </div>
        <div
          style={{
            backgroundImage: `url(${qnImage[1]})`,
          }}
          className="group relative z-0 flex flex-col justify-between w-[30vw] h-[30vw] p-10 border-black border-[1px] cursor-pointer duration-500 hover:-translate-y-5 bg-[length:120%_120%] hover:bg-[left_-5rem]"
          onClick={() => select(2)}
        >
          <div className="overlay absolute top-0 left-0 w-full h-full -z-10 duration-500 bg-back-color/80 group-hover:bg-back-color/50"></div>
          <h2 className="txt1 text-5xl font-bold">{qnText[1]}</h2>
          <h2 className="num1 self-end justify-self-end text-9xl font-bold">
            {"0" + (question * 2 + 2)}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default QuizPrompt;
