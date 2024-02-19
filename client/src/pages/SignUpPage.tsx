import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import authLogo from "../assets/icons/auth_logo_icon.svg";
import background from "../assets/welcome_background.svg";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    if (e.currentTarget.name == "email") {
      setEmail(e.currentTarget.value);
    } else if (e.currentTarget.name == "name") {
      setName(e.currentTarget.value);
    } else if (e.currentTarget.name == "passwordConf") {
      setPasswordConf(e.currentTarget.value);
    } else {
      setPassword(e.currentTarget.value);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/users/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          passwordConfirm: passwordConf,
        }),
      }
    );
    const data = await response.json();
    if (data.status == "fail" || data.status == "error") {
      toast.error(data.message);
    } else {
      toast.success("Pomyślnie utworzono konto!");
      setTimeout(() => {
        setEmail("");
        setName("");
        setPassword("");
        navigate("/signin");
      }, 1000);
    }
  };

  return (
    <div className="w-full h-screen bg-back-color overflow-hidden flex justify-center items-center relative">
      <div className="w-full h-screen relative overflow-hidden bg-back-color z-0 flex flex-col flex-wrap justify-center items-center">
        <div className="overlay w-[120%] h-screen absolute top-0 bg-[rgba(190,255,201,.9)] origin-center">
          <img
            src={background}
            className="back_layer w-full h-screen absolute top-0 object-cover -z-20 transform skew-x-[20deg] scale-105"
          ></img>
        </div>
      </div>
      <div className="content overflow-y-scroll pt-10 px-14 flex flex-col justify-between items-center absolute top-0 w-[24rem] h-screen bg-white drop-shadow-[0_0_30px_rgb(34,204,61)]">
        <div className="form w-full flex flex-col justify-evenly items-center gap-8">
          <img
            className="w-24 mb-10 duration-200 drop-shadow-[0_0_0px_rgb(34,204,61)] hover:rotate-12 cursor-pointer"
            src={authLogo}
            onClick={() => navigate("/")}
          />
          <form
            onSubmit={handleSignUp}
            className="w-full flex flex-col items-center justify-center gap-8"
          >
            <h2 className="header font-bold text-[2.6rem] leading-10">
              REJESTRACJA
            </h2>
            <div className="w-full flex items-center justify-center">
              <input
                className="peer w-full border-2 text-md p-2 text-center font-semibold border-gray-400 placeholder:text-black duration-200 focus:border-primary-color rounded-lg outline-none"
                name="email"
                type="email"
                autoComplete="on"
                value={email}
                placeholder=""
                onChange={handleChange}
                required
              />
              <span className="absolute center duration-200 text-gray-500 peer-focus:text-primary-color peer-focus:-translate-y-[1.35rem] peer-[&:not(:placeholder-shown)]:-translate-y-[1.35rem] peer-focus:text-sm peer-[&:not(:placeholder-shown)]:text-sm font-semibold tracking-wide pointer-events-none px-2 rounded-full bg-white">
                Email
              </span>
            </div>
            <div className="peer w-full flex items-center justify-center">
              <input
                className="peer w-full border-2 text-md p-2 text-center font-semibold border-gray-400 placeholder:text-black duration-200 focus:border-primary-color rounded-lg outline-none"
                name="name"
                type="text"
                autoComplete="on"
                value={name}
                placeholder=""
                onChange={handleChange}
                required
              />
              <span className="absolute center duration-200 text-gray-500 peer-focus:text-primary-color peer-focus:-translate-y-[1.35rem] peer-[&:not(:placeholder-shown)]:-translate-y-[1.35rem] peer-focus:text-sm peer-[&:not(:placeholder-shown)]:text-sm font-semibold tracking-wide pointer-events-none px-2 rounded-full bg-white">
                Imię
              </span>
            </div>
            <div className="peer w-full flex items-center justify-center">
              <input
                className="peer w-full border-2 text-md p-2 text-center font-semibold border-gray-400 placeholder:text-black duration-200 focus:border-primary-color rounded-lg outline-none"
                name="password"
                type="password"
                autoComplete="on"
                value={password}
                placeholder=""
                onChange={handleChange}
                required
              />
              <span className="absolute center duration-200 text-gray-500 peer-focus:text-primary-color peer-focus:-translate-y-[1.35rem] peer-[&:not(:placeholder-shown)]:-translate-y-[1.35rem] peer-focus:text-sm peer-[&:not(:placeholder-shown)]:text-sm font-semibold tracking-wide pointer-events-none px-2 rounded-full bg-white">
                Hasło
              </span>
            </div>
            <div className="peer w-full flex items-center justify-center">
              <input
                className="peer w-full border-2 text-md p-2 text-center font-semibold border-gray-400 placeholder:text-black duration-200 focus:border-primary-color rounded-lg outline-none"
                name="passwordConf"
                type="password"
                autoComplete="off"
                value={passwordConf}
                placeholder=""
                onChange={handleChange}
                required
              />
              <span className="absolute center duration-200 text-gray-500 peer-focus:text-primary-color peer-focus:-translate-y-[1.35rem] peer-[&:not(:placeholder-shown)]:-translate-y-[1.35rem] peer-focus:text-sm peer-[&:not(:placeholder-shown)]:text-sm font-semibold tracking-wide pointer-events-none px-2 rounded-full bg-white">
                Powtórz hasło
              </span>
            </div>
            <input
              className="peer cursor-pointer w-full text-lg p-2 text-center font-bold placeholder:text-black duration-200 border-2 border-primary-color bg-primary-color hover:bg-back-color rounded-lg outline-none"
              type="submit"
              value="UTWÓRZ KONTO"
            />
          </form>
          <p className="prompt font-bold">
            Masz już konto?{" "}
            <a
              className="link text-primary-color cursor-pointer hover:underline underline-offset-4"
              onClick={() => navigate("/signin")}
            >
              Zaloguj się
            </a>
          </p>
          <div className="w-full h-[0.125rem] bg-gray-400 flex justify-center items-center">
            <p className="bg-white text-xs px-3 text-gray-500">LUB</p>
          </div>
          <ul className="oAuths w-full flex flex-col text-center gap-3 font-semibold pointer-events-none opacity-30">
            <li className="w-full border-[1px] border-black py-2 rounded-md">
              Zarejestruj się przez Google
            </li>
            <li className="border-[1px] border-black py-2 rounded-md">
              Zarejestruj się przez Github
            </li>
          </ul>
        </div>
        <div className="footer text-sm m-4">TRAVERSE © 2024</div>
      </div>
    </div>
  );
};

export default SignUpPage;
