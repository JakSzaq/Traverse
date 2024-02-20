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
    <div className="w-[100%] pb-[3vh] absolute top-0 h-auto pt-24 overflow-y-scroll bg-back-color flex flex-col justify-center items-center duration-500">
      <div className="w-40 rounded-full h-2.5 bg-gray-700 flex items-center justify-between relative">
        <p className="-m-10 text-3xl">{question + 1}</p>
        <p className="-m-10 text-3xl">4</p>
        <div
          className={`bg-primary-color absolute duration-300 h-2.5 rounded-full flex items-center justify-between`}
          style={{ width: (question + 1) * 2.5 + "rem" }}
        ></div>
      </div>
      <div className="top w-full flex flex-col sm:flex-row gap-5 py-10 justify-center items-center">
        <img
          className="w-10 cursor-pointer duration-200 hover:-translate-x-2"
          src={backIcon}
          onClick={() => setQuestion(question - 1)}
        />
        <h2 className="text-3xl sm:text-5xl sm:py-4 w-full sm:w-auto text-center">
          {header}
        </h2>
      </div>
      <div className="bottom w-[90%] flex flex-col lg:flex-row gap-6 lg:gap-3 justify-center items-center">
        <div
          style={{
            backgroundImage: `url(${qnImage[0]})`,
          }}
          className="group group-hover:bg relative z-0 flex flex-col justify-between w-[90vw] h-[90vw] lg:w-[35vw] lg:h-[35vw] 2xl:w-[30vw] 2xl:h-[30vw] p-3 xs:p-5 sm:p-10 border-black border-[1px] cursor-pointer duration-500 hover:-translate-y-5 bg-[length:120%_120%] hover:bg-[left_-5rem]"
          onClick={() => select(1)}
        >
          <div className="overlay absolute top-0 left-0 w-full h-full -z-10 duration-500 bg-back-color/80 group-hover:bg-back-color/50"></div>
          <h2 className="txt1 text-3xl xs:text-[2.5rem] leading-10 xl:text-5xl font-bold">
            {qnText[0]}
          </h2>
          <h2 className="num1 self-end justify-self-end text-7xl xs:text-9xl font-bold">
            {"0" + (question * 2 + 1)}
          </h2>
        </div>
        <div
          style={{
            backgroundImage: `url(${qnImage[1]})`,
          }}
          className="group relative z-0 flex flex-col justify-between w-[90vw] h-[90vw] lg:w-[35vw] lg:h-[35vw] 2xl:w-[30vw] 2xl:h-[30vw] p-3 xs:p-5 sm:p-10 border-black border-[1px] cursor-pointer duration-500 hover:-translate-y-5 bg-[length:120%_120%] hover:bg-[left_-5rem]"
          onClick={() => select(2)}
        >
          <div className="overlay absolute top-0 left-0 w-full h-full -z-10 duration-500 bg-back-color/80 group-hover:bg-back-color/50"></div>
          <h2 className="txt1 text-3xl xs:text-[2.5rem] leading-10 xl:text-5xl font-bold">
            {qnText[1]}
          </h2>
          <h2 className="num1 self-end justify-self-end text-7xl xs:text-9xl font-bold">
            {"0" + (question * 2 + 2)}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default QuizPrompt;
