// component and api imports
import React, { useEffect, useRef, useState } from "react";
import JourneyFuelSelector from "./JourneyFuelSelector";
import { Autocomplete } from "@react-google-maps/api";
import { AnimatePresence, motion } from "framer-motion";
import { useIsVisible } from "../hooks/useIsVisible";

// icon and image imports
import startIcon from "../assets/icons/panel_start.svg";
import endIcon from "../assets/icons/panel_end.svg";
import logoIcon from "../assets/icons/traverse_icon_w.svg";
import slideIcon from "../assets/icons/slide_icon.svg";
import plusIcon from "../assets/icons/plus_icon.svg";
import removeIcon from "../assets/icons/remove_icon.svg";
import arrowDownIcon from "../assets/icons/arrow_down_icon.svg";

// data and type imports
import { JourneyFormI, FuelPricesI, FuelT } from "../types";
import { fuelData } from "../data/fuelData";

const JourneyForm: React.FC<JourneyFormI> = ({
  journey,
  setJourney,
  originRef,
  destinationRef,
  transportData,
  createJourney,
  fuelPrices,
  getFuelPrices,
}) => {
  const [item, setItem] = useState("");
  const [person, setPerson] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [fuelType, setFuelType] = useState<FuelT>();
  const [isClicked, setIsClicked] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const isVisible = useIsVisible(imageRef);

  useEffect(() => {
    if (fuelPrices !== undefined && journey.fuel == undefined) {
      handleClick();
    }
  }, [fuelPrices]);

  useEffect(() => {
    if (fuelPrices !== undefined) {
      Object.keys(fuelPrices).map((key) => {
        if (key == fuelType?.value) {
          setJourney({
            ...journey,
            fuel: {
              value: fuelPrices[key as keyof FuelPricesI].toString(),
              usage: fuelType.usage,
            },
          });
        }
      });
    }
  }, [fuelType]);

  const handleJourneyChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setJourney({
      ...journey,
      [name]: value,
    });
  };

  const handleClick = () => {
    setIsClicked(true);
  };

  const resetFuelData = () => {
    setFuelType(undefined);
    setJourney({
      ...journey,
      fuel: {
        value: "",
        usage: 0,
      },
    });
  };

  useEffect(() => {
    journey.transportType !== "DRIVING" && resetFuelData();
    journey.transportType == "DRIVING" && getFuelPrices();
  }, [journey.transportType]);

  useEffect(() => {
    if (fuelType == undefined && journey.fuel !== undefined) {
      const fuel = fuelData.find((fuel) => fuel.usage === journey.fuel?.usage);
      if (fuel == undefined) return;
      setFuelType({
        value: fuel!.alias,
        usage: fuel!.usage,
      });
    }
  }, [fuelType]);

  return (
    <div className="form bg-transparent w-full h-[90vh]">
      <AnimatePresence>
        {isClicked === true ? (
          <JourneyFuelSelector
            setIsClicked={setIsClicked}
            setFuelType={setFuelType}
          />
        ) : (
          <></>
        )}
      </AnimatePresence>
      <form
        onSubmit={createJourney}
        className="w-full h-full grid grid-cols-2 grid-rows-[1fr_1fr_1fr_2fr_0.5fr] overflow-y-scroll gap-y-4 gap-x-10"
      >
        <div className="place w-full bg-white rounded-3xl col-span-2 py-4 px-6 relative">
          <hr className="h-[2px] bg-primary-color"></hr>
          <h3 className="absolute top-2.5 bg-white pr-4 text-lg text-primary-color font-bold">
            MIEJSCA
          </h3>
          <div className="inputs flex flex-row flex-wrap justify-between mt-5">
            <div className="input flex flex-col">
              <h2 className="text-3xl font-bold mb-2">POCZĄTEK</h2>
              <label className="flex flex-row items-center justify-between h-14 bg-back-color py-4 px-6 rounded-full">
                <img src={startIcon} className="w-7 mr-4" />
                <Autocomplete>
                  <input
                    type="text"
                    id="startPlace"
                    name="startPlace"
                    placeholder="..."
                    defaultValue={journey.startPlace}
                    className="w-80 bg-transparent h-12 font-medium text-3xl uppercase border-none outline-none"
                    ref={originRef}
                    required
                  />
                </Autocomplete>
              </label>
            </div>
            <div className="input flex flex-col">
              <h2 className="text-3xl font-bold mb-2">KONIEC</h2>
              <label className="flex flex-row items-center justify-between h-14 bg-back-color py-4 px-6 rounded-full">
                <img src={endIcon} className="w-7 mr-4" />
                <Autocomplete>
                  <input
                    type="text"
                    id="endPlace"
                    name="endPlace"
                    placeholder="..."
                    defaultValue={journey.endPlace}
                    className="w-80 bg-transparent h-12 font-medium text-3xl uppercase border-none outline-none"
                    ref={destinationRef}
                    required
                  />
                </Autocomplete>
              </label>
            </div>
          </div>
        </div>
        <div className="dates w-full bg-white rounded-3xl col-span-2 py-4 px-6 relative">
          <hr className="h-[2px] bg-primary-color"></hr>
          <h3 className="absolute top-2.5 bg-white pr-4 text-lg text-primary-color font-bold">
            DATA
          </h3>
          <div className="inputs flex flex-row flex-wrap justify-between mt-5 mr-0">
            <div className="input flex flex-col">
              <h2 className="text-3xl font-bold mb-2">WYJAZD</h2>
              <label className="flex flex-row items-center justify-between h-14 bg-back-color py-4 px-6 rounded-full">
                <img src={startIcon} className="w-7 mr-4" />
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  placeholder=""
                  value={journey.startDate?.toString()}
                  onChange={handleJourneyChange}
                  className="w-80 bg-transparent h-12 font-medium text-3xl uppercase border-none outline-none"
                  required
                />
              </label>
            </div>
            <div className="input flex flex-col">
              <h2 className="text-3xl font-bold mb-2">POWRÓT</h2>
              <label className="flex flex-row items-center justify-between h-14 bg-back-color py-4 px-6 rounded-full">
                <img src={endIcon} className="w-7 mr-4" />
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  placeholder=""
                  onChange={handleJourneyChange}
                  value={
                    journey.endDate == undefined
                      ? undefined
                      : journey.endDate.toString()
                  }
                  required
                  className="w-80 bg-transparent h-12 font-medium text-3xl uppercase border-none outline-none"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="transport w-full bg-white rounded-3xl col-span-2 pt-4 pb-2 px-6 relative">
          <hr className="h-[2px] bg-primary-color"></hr>
          <h3 className="absolute top-2.5 bg-white pr-4 text-lg text-primary-color font-bold">
            ŚRODEK TRANSPORTU
          </h3>
          <div className="w-[100%] relative gap-3 mt-6">
            <div className="w-[95%] pb-2 flex flex-row gap-3 duration-300 overflow-hidden">
              {transportData.map((mode) => (
                <div
                  className={` bg-back-color flex ${
                    expanded ? "flex-[1_0_20%]" : "flex-[1_0_32%]"
                  } relative overflow-hidden flex-col justify-center items-center rounded-3xl duration-300 text-sm px-2 py-[.25rem] gap-1.5 font-bold drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] cursor-pointer border-2 ${
                    journey.transportType == mode.name
                      ? "border-primary-color"
                      : "border-transparent"
                  }`}
                  key={mode.name}
                  onClick={() => {
                    setJourney({ ...journey, transportType: mode.name });
                    mode.name == "DRIVING" && handleClick();
                  }}
                >
                  <h4>PODRÓŻ</h4>
                  <img src={mode.icon} />
                  <h4>{mode.text}</h4>
                  <AnimatePresence>
                    {mode.name == "DRIVING" && fuelType !== undefined ? (
                      <>
                        <motion.h2
                          initial={{ x: 100 }}
                          animate={{ x: 0 }}
                          exit={{ x: 100 }}
                          className="absolute w-20 h-full py-1 rounded-l-full duration-100 -right-2 flex flex-wrap text-center justify-center  items-center border-2 border-primary-color  "
                        >
                          {fuelType.value}
                        </motion.h2>
                      </>
                    ) : undefined}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <img
              className={`w-[4%] absolute top-8 right-0 duration-300 cursor-pointer ${
                expanded ? "rotate-180" : "rotate-0"
              }`}
              src={slideIcon}
              onClick={() => setExpanded(!expanded)}
            />
          </div>
        </div>
        <div className="items w-full bg-white rounded-3xl py-4 px-6 relative">
          <hr className="h-[2px] bg-primary-color"></hr>
          <h3 className="absolute top-2.5 bg-white pr-4 text-lg text-primary-color font-bold">
            TWOJE RZECZY
          </h3>
          <div className="h-full flex flex-col justify-start items-center mt-6 gap-3">
            <div className="input flex flex-col w-full">
              <label className="flex flex-row items-center justify-between h-10 bg-back-color py-4 px-2 rounded-2">
                <input
                  type="text"
                  id="items"
                  name="items"
                  placeholder="np. ubrania"
                  value={item}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setItem(e.currentTarget.value)
                  }
                  className="w-full bg-transparent h-10 font-medium text-lg border-none outline-none"
                />
                <img
                  src={plusIcon}
                  className="w-7 cursor-pointer"
                  onClick={() => (
                    item != "" &&
                      setJourney({
                        ...journey,
                        items: [...journey.items!, item],
                      }),
                    setItem("")
                  )}
                />
              </label>
            </div>
            <div className="items h-auto w-full bg-back-color border-t-[3px] border-primary-color gap-5 px-2 pb-2 pt-1">
              <div className="header flex flex-row justify-between pb-2 font-bold text-lg">
                <h2>Łącznie</h2>
                <h2>{journey.items!.length}</h2>
              </div>
              <hr className="bg-black h-[2px] -mt-1 mb-2 border-0"></hr>
              <div className="itemList max-h-32 overflow-y-scroll overflow-x-hidden flex flex-col items-center justify-between">
                {journey.items!.length > 0 ? (
                  journey.items!.map((item, idx) => (
                    <div
                      key={idx}
                      className="item w-full flex justify-between items-center py-1 pl-4 pr-3 bg-white m-[2px] rounded-lg mr-4"
                    >
                      <h2 className="h-6 font-bold text-primary-color">
                        {item}
                      </h2>
                      <img
                        className="w-4 cursor-pointer duration-150 hover:scale-[125%]"
                        src={removeIcon}
                        onClick={() =>
                          setJourney({
                            ...journey,
                            items: journey.items!.filter((_o, i) => idx !== i),
                          })
                        }
                      />
                    </div>
                  ))
                ) : (
                  <h2>Jeszcze nie dodano żadnych rzeczy</h2>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="people w-full bg-white rounded-3xl py-4 px-6 relative">
          <hr className="h-[2px] bg-primary-color"></hr>
          <h3 className="absolute top-2.5 bg-white pr-4 text-lg text-primary-color font-bold">
            TWOJE OSOBY
          </h3>
          <div className="h-full flex flex-col justify-start items-center mt-6 gap-3">
            <div className="input flex flex-col w-full">
              <label className="flex flex-row items-center justify-between h-10 bg-back-color py-4 px-2 rounded-2">
                <input
                  type="text"
                  id="people"
                  name="people"
                  placeholder="np. tomek"
                  value={person}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPerson(e.currentTarget.value)
                  }
                  className="w-full bg-transparent h-10 font-medium text-lg border-none outline-none"
                />
                <img
                  src={plusIcon}
                  className="w-7 cursor-pointer"
                  onClick={() => (
                    person != "" &&
                      setJourney({
                        ...journey,
                        people: [...journey.people!, person],
                      }),
                    setPerson("")
                  )}
                />
              </label>
            </div>
            <div className="people h-auto w-full bg-back-color border-t-[3px] border-primary-color gap-5 px-2 pb-2 pt-1">
              <div className="header flex flex-row justify-between pb-2 font-bold text-lg">
                <h2>Łącznie</h2>
                <h2>{journey.people!.length}</h2>
              </div>
              <hr className="bg-black h-[2px] -mt-1 mb-2 border-0"></hr>
              <div className="peopleList max-h-32 overflow-y-scroll overflow-x-hidden flex flex-col items-center justify-between">
                {journey.people!.length > 0 ? (
                  journey.people!.map((person, idx) => (
                    <div
                      key={idx}
                      className="person w-full flex justify-between items-center py-1 pl-4 pr-3 bg-white m-[2px] rounded-lg mr-4"
                    >
                      <h2 className="h-6 font-bold text-primary-color">
                        {person}
                      </h2>
                      <img
                        className="w-4 cursor-pointer duration-150 hover:scale-[125%]"
                        src={removeIcon}
                        onClick={() =>
                          setJourney({
                            ...journey,
                            people: journey.people!.filter(
                              (_o, i) => idx !== i
                            ),
                          })
                        }
                      />
                    </div>
                  ))
                ) : (
                  <h2>Jeszcze nie dodano żadnych osób</h2>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="btn-container cursor-pointer col-span-2 h-24 bg-primary-color rounded-3xl flex justify-center items-center relative overflow-hidden before:content-[''] before:absolute before:bg-[rgba(255,255,255,.5)] before:duration-1000 before:skew-x-[-45deg] before:hover:skew-x-[-45deg] before:-left-56 before:hover:left-[110%] before:w-44 before:h-44">
          <AnimatePresence>
            {!isVisible && (
              <motion.div
                onClick={() =>
                  buttonRef.current?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: ".25",
                }}
                className="fixed bottom-0 w-20 h-20 rounded-full mb-7 animate-bounce bg-[rgba(255,255,255,.5)] flex justify-center backdrop-blur-3x; items-center drop-shadow-[0_0_20px_rgba(34,204,61,1)]"
              >
                <img className="absolute h-12" src={arrowDownIcon} />
              </motion.div>
            )}
          </AnimatePresence>
          <button
            ref={buttonRef}
            type="submit"
            className="submit col-span-2 w-full h-full font-bold text-5xl bg-transparent rounded-3xl flex justify-center items-center gap-5 text-white"
          >
            WYZNACZ TRASĘ{" "}
            <img ref={imageRef} src={logoIcon} className="w-8 fill-white" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default JourneyForm;
