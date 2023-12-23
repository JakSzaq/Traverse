import React from "react";
import { useState } from "react";
import WelcomeGraphic from "../components/WelcomeGraphic";
import background from "../assets/welcome_background.svg";
import logo from "../assets/welcome_logo.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const variants = {
  isHovered: { transform: "skew(15deg, 0deg) scale(1.5)" },
  isNotHovered: { transform: "skew(-5deg, 0deg) scale(1.25)" },
};

const timeout = (delay: number) => {
  return new Promise((res) => setTimeout(res, delay));
};

const WelcomePage: React.FC = () => {
  const [trackHover, setTrackHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    const id = target.id;
    setClicked(true);
    await timeout(2000);
    if (id == "log") {
      navigate("/signin");
    } else if (id == "reg") {
      navigate("/signup");
    } else {
      navigate("/error");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key={1}
        className="curtain w-full h-full absolute z-30 bg-back-color top-0 transform translate-y-[-100vh]"
        animate={clicked ? "slide" : "initial"}
        variants={{
          slide: { transform: "translateY(0)" },
          initial: { transform: "translateY(-100vh)" },
        }}
        transition={{
          ease: "easeInOut",
          duration: 1,
        }}
      ></motion.div>
      <div
        key={2}
        className="content w-full h-screen relative overflow-hidden bg-back-color z-0 flex flex-col flex-wrap justify-center items-center"
      >
        <div className="overlay w-[150%] h-screen absolute top-0 bg-gradient-to-bl from-back-color from-[30%] to-gradient-color to-100% -z-10 origin-center"></div>
        <motion.img
          className="back_layer w-full h-screen absolute top-0 object-cover -z-20 transition ease-in-out duration-1000 transform skew-x-[-5deg] skew-y-0 scale-125"
          src={background}
          animate={trackHover ? "isHovered" : "isNotHovered"}
          variants={variants}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
        />
        <div className="header w-[85%] h-[100px] bg-none flex justify-between flex-wrap mt-20 mr-0 mb-10 ml-0">
          <div className="hleft">
            <h3 className="text-5xl font-semibold">Twoja podróż</h3>
            <h2 className="text-6xl font-semibold" id="text">
              zaczyna się tutaj
            </h2>
          </div>
          <div className="hright h-full bg-white p-[5px] flex justify-center items-center rounded-[35px]">
            <img className="w-[70%] cursor-pointer" src={logo} />
          </div>
        </div>
        <div className="buttons w-[85%] h-[100px] z-10 flex flex-col justify-start items-start align gap-4">
          <button
            className="btn bg-primary-color px-20 py-2 border-2 border-solid border-transparent text-2xl rounded-2xl cursor-pointer font-semibold transition duration-[250ms] hover:border-primary-color hover:bg-transparent"
            id="log"
            onClick={handleClick}
          >
            Zaloguj się
          </button>
          <button
            className="btn bg-white px-20 py-2 border-2 border-solid border-transparent text-2xl rounded-2xl cursor-pointer font-semibold transition duration-[250ms] hover:border-black hover:bg-transparent"
            id="reg"
            onMouseOver={() => setTrackHover(true)}
            onMouseOut={() => setTrackHover(false)}
            onClick={handleClick}
          >
            Utwórz nowe konto
          </button>
        </div>
        <div className="image flex-auto w-[85vw] h-auto flex justify-end items-end mb-20">
          <WelcomeGraphic />
        </div>
      </div>
    </AnimatePresence>
  );
};

export default WelcomePage;
