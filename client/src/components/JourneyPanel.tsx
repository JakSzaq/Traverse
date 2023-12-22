// component and api imports
import React, { useRef, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
  Marker,
  Libraries,
} from "@react-google-maps/api";

//icons and data imports
import startIcon from "../assets/icons/panel_start.svg";
import endIcon from "../assets/icons/panel_end.svg";
import pointerIcon from "../assets/icons/Pointer.svg";
import logoIcon from "../assets/icons/traverse_icon_w.svg";
import arrowIcon from "../assets/icons/arrow_icon_g.svg";
import slideIcon from "../assets/icons/slide_icon.svg";
import wrongIcon from "../assets/icons/wrong_location_icon.svg";
import clockIcon from "../assets/icons/clock_icon.svg";
import plusIcon from "../assets/icons/plus_icon.svg";
import removeIcon from "../assets/icons/remove_icon.svg";
import { transportData } from "../data/transportData";
import { journeyDataI } from "../types";

/* 
Lines commented like this are there until styling and basic functionality is done
*/

const center = { lat: 52.2291, lng: 21.0129 };

// main component for creating and showing journey with coresponding data
const JourneyPanel: React.FC<journeyDataI> = (props) => {
  const [libraries] = useState<Libraries | undefined>(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
    language: "PL",
  });

  const [map, setMap] = useState<google.maps.Map>();
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string | null>("");
  const [duration, setDuration] = useState<string | null>("");
  const [position, setPosition] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >();
  const [toggle, setToggle] = useState(false);
  const [journeyMode, setJourneyMode] = useState("");
  const [journeyType, setJourneyType] = useState("");
  const [direction, setDirection] = useState(false);

  const [journey, setJourney] = useState<journeyDataI>({
    startPlace: props.startPlace,
    endPlace: props.endPlace,
    startDate: props.startDate,
    endDate: props.endDate,
    transportType: props.transportType,
    length: props.length,
    items: props.items,
    people: props.people,
    _id: props._id,
  });
  const [item, setItem] = useState("");
  const [person, setPerson] = useState("");

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  const icon = {
    url: pointerIcon,
    scaledSize: new google.maps.Size(100, 100),
  };

  // function that calculates coordinates of chosen places and fetches necessary data from the api
  const calculateRoute = async () => {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    // calculating the route between places
    if (originRef.current !== null && destinationRef.current !== null) {
      if (
        originRef.current.value === "" ||
        destinationRef.current.value === ""
      ) {
        return;
      }
      const destinationGeocoder = new google.maps.Geocoder();
      const endPlace = destinationRef.current.value;
      destinationGeocoder.geocode(
        {
          address: endPlace,
        },
        function (results, status) {
          console.log(results);
          if (status == google.maps.GeocoderStatus.OK) {
            const lat = results![0].geometry.location.lat();
            const long = results![0].geometry.location.lng();
            const latlong = new google.maps.LatLng(lat, long);
            setPosition(latlong);
            const country = results![0].formatted_address.split(" ");
            getJourneyType(country[country.length - 1]);
            map?.panTo(latlong);
            map?.setZoom(14);
          }
        }
      );
      //calculating distance and time of journey
      const directionsService = new google.maps.DirectionsService();
      try {
        await directionsService.route(
          {
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          function (response, status) {
            if (status == "OK") {
              setDirectionsResponse(response);
              setDistance(response!.routes[0].legs[0].distance!.text);
              setDuration(response!.routes[0].legs[0].duration!.text);
            }
          }
        );
      } catch (error) {
        setDirectionsResponse(null);
        setDistance(null);
        setDuration(null);
      }
    }
  };

  // function which determines whether a journey is domestic or international
  const getJourneyType = (endCountry: string) => {
    const originGeocoder = new google.maps.Geocoder();
    const startPlace = originRef.current!.value;
    originGeocoder.geocode(
      {
        address: startPlace,
      },
      function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          const country = results![0].formatted_address.split(" ");
          const startCountry = country[country.length - 1];

          if (startCountry == endCountry) {
            setJourneyType("krajowa");
          } else {
            setJourneyType("zagraniczna");
          }
        }
      }
    );
  };

  // function that fires after pressing the submit button
  const handleCreateJourney = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    calculateRoute();
  };

  // function that switches between views of either the given place or the route itself
  const changeView = (toggle: boolean) => {
    // if (toggle) {
    //   map?.panTo(position!);
    //   map?.setZoom(14);
    // }
    setToggle(!toggle);
  };

  const handleJourneyChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setJourney({
      ...journey,
      [name]: value,
    });
  };

  return (
    <div className="content w-full h-screen grid grid-cols-2 gap-12 mt-16 mb-6 px-6 overflow-hidden">
      <div className="map h-[90vh] w-full bg-primary-color rounded-[3rem]">
        <GoogleMap
          center={center}
          zoom={10}
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            borderRadius: "50px",
            border: "3px solid #22cc3d",
            position: "relative",
            transitionDuration: "1",
            display: "flex",
            justifyContent: "center",
          }}
          options={{
            disableDefaultUI: true,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            gestureHandling: "none",
            mapId: "340546ccaf5c3fb4",
          }}
          onLoad={(map) => setMap(map)}
        >
          {directionsResponse && toggle && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          {position !== undefined && duration !== null && (
            <>
              <Marker options={{ icon: icon }} position={position} />
              <div
                className={`w-full h-full absolute flex justify-end items-end duration-300 p-6 ${
                  toggle ? "opacity-30" : "opacity-100"
                }`}
              >
                <div className="bg-[#DFFFE2] flex w-full h-[24rem] rounded-[50px] px-7 py-6">
                  <button
                    onClick={() => changeView(toggle)}
                    className="w-[24rem] h-[5rem] bg-white text-xl font-bold text-gray-400 border-4 border-gray-300 rounded-xl"
                  >
                    {toggle ? "UKRYJ TRASĘ" : "WYŚWIETL TRASĘ"}
                  </button>
                  <div className="group left h-full flex flex-col border-r-2 border-black w-[35%] pr-7 duration-300 hover:w-full">
                    <div className="top flex flex-row  justify-betweenw-full min-w-0">
                      <h3 className="w-full font-bold text-4xl text-ellipsis overflow-hidden whitespace-nowrap text-primary-color">
                        {originRef.current?.value.toUpperCase()}
                      </h3>
                      <img
                        className="w-12 duration-300 group-hover:w-20"
                        src={arrowIcon}
                      />
                    </div>
                    <h3 className="font-bold -mt-5 text-[4rem] text-ellipsis overflow-hidden whitespace-nowrap text-black">
                      {destinationRef.current?.value.toUpperCase()}
                    </h3>
                    <hr className="h-[3px] bg-black -mt-2 mb-4"></hr>
                    <div className="data flex flex-row justify-between uppercase">
                      <div className="route flex flex-col border-r-2 border-black">
                        <h4>Trasa</h4>
                        <h3>{distance}</h3>
                      </div>
                      <div className="time flex flex-col border-r-2 border-black">
                        <h4>Czas</h4>
                        <h3>{duration}</h3>
                      </div>
                      <div className="type flex flex-col border-black">
                        <h4>Rodzaj</h4>
                        <h3>{journeyType.substring(0, 4) + "."}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="right flex flex-col"></div>
                </div>
              </div>
            </>
          )}
          {
            /* TEST DATA - WILL BE REMOVED AFTER ALL STYLING IS DONE */ true && (
              <>
                <div
                  className={`w-full h-full absolute flex justify-center items-end duration-300 p-6 ${
                    toggle ? "opacity-30" : "opacity-100"
                  }`}
                >
                  <div className="time absolute top-0 w-auto px-2 h-12 mt-4 bg-[#DFFFE2] flex justify-center items-center rounded-2xl drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)]">
                    <img className="w-9" src={clockIcon} />
                    <p className="font-bold text-lg mx-5">12 GODZ 15 MIN</p>
                  </div>
                  <div className="bg-[#DFFFE2] flex w-full h-[24rem] rounded-[50px] px-7 py-6 basis-full">
                    <div className="group left h-full flex flex-col border-r-2 border-black w-[35%] pr-7 duration-300 hover:w-full min-w-0 overflow-hidden">
                      <div className="top flex flex-row  justify-betweenw-full min-w-0">
                        <h3 className="w-full font-bold text-4xl text-ellipsis overflow-hidden whitespace-nowrap text-primary-color">
                          WARSZAWA, POLAND
                        </h3>
                        <img
                          className="w-12 duration-300 group-hover:w-20 group-hover:animate-pulse"
                          src={arrowIcon}
                        />
                      </div>
                      <h3 className="font-bold -mt-5 text-[4rem] text-ellipsis overflow-hidden whitespace-nowrap text-black">
                        SŁUPSK, POLAND
                      </h3>
                      <hr className="h-[3px] bg-black -mt-2 mb-6"></hr>
                      <div className="data flex flex-row justify-between items-center uppercase">
                        <div className="route flex flex-col border-black">
                          <h4 className="text-xl -mb-2 label text-primary-color font-bold">
                            Trasa
                          </h4>
                          <h3 className="text-3xl label text-black font-bold">
                            120 KM
                          </h3>
                        </div>
                        <div className="w-0.5 h-10 bg-black"></div>
                        <div className="type flex flex-col border-black">
                          <h4 className="text-xl -mb-2 label text-primary-color font-bold">
                            Rodzaj
                          </h4>
                          <h3 className="text-3xl label text-black font-bold">
                            Kraj.
                          </h3>
                        </div>
                      </div>
                      <div className="bottom mt-8">
                        {transportData.map(
                          (mode) =>
                            mode.name == journeyMode && (
                              <div
                                className="bg-back-color flex w-full flex-col justify-center items-center rounded-3xl duration-300 text-sm p-2 gap-1.5 font-bold drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] cursor-pointer border-2 border-transparent"
                                key={mode.name}
                                onClick={() => {
                                  if (journeyMode == mode.name) {
                                    setJourneyMode("");
                                  } else {
                                    setJourneyMode(mode.name);
                                  }
                                }}
                              >
                                <h4>PODRÓŻ</h4>
                                <img src={mode.icon} />
                                <h4>{mode.text}</h4>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                    <div className="right flex flex-col min-w-0 overflow-hidden flex-1">
                      <button
                        onClick={() => changeView(toggle)}
                        className="w-auto h-[5rem] bg-white text-xl font-bold text-gray-400 border-4 border-gray-300 rounded-xl"
                      >
                        {toggle ? "UKRYJ TRASĘ" : "WYŚWIETL TRASĘ"}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )
          }
          {position !== undefined && duration == null && distance == null && (
            <>
              <Marker options={{ icon: icon }} position={position} />
              <div className="w-[95%] h-full absolute flex items-end duration-300}">
                <div className="bg-[#DFFFE2] flex flex-col items-center justify-center gap-2 w-full h-[24rem] rounded-[50px] px-7 py-6 mb-6">
                  <h2 className="text-6xl font-bold">NIESTETY</h2>
                  <h3 className="text-2xl text-center px-20">
                    Podróż do wskazanego miejsca wybranym środkiem transportu
                    nie jest możliwa
                  </h3>
                  <img className="w-24" src={wrongIcon} />
                </div>
              </div>
            </>
          )}
        </GoogleMap>
      </div>
      <div className="form bg-transparent w-full h-[90vh]">
        <form
          onSubmit={handleCreateJourney}
          className="w-full h-full grid grid-cols-2 grid-rows-[1fr_1fr_1fr_2fr_0.5fr] overflow-y-scroll gap-y-4 gap-x-10"
        >
          <div className="places w-full bg-white rounded-3xl col-span-2 py-4 px-6 relative">
            <hr className="h-1 bg-primary-color"></hr>
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
                      value={journey.startPlace}
                      onChange={handleJourneyChange}
                      className="w-80 bg-transparent h-12 font-medium text-3xl uppercase border-none outline-none"
                      ref={originRef}
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
                      value={journey.endPlace}
                      onChange={handleJourneyChange}
                      className="w-80 bg-transparent h-12 font-medium text-3xl uppercase border-none outline-none"
                      ref={destinationRef}
                    />
                  </Autocomplete>
                </label>
              </div>
            </div>
          </div>
          <div className="dates w-full bg-white rounded-3xl col-span-2 py-4 px-6 relative">
            <hr className="h-1 bg-primary-color"></hr>
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
                    value={journey.startDate.toString()}
                    onChange={handleJourneyChange}
                    className="w-80 bg-transparent h-12 font-medium text-3xl uppercase border-none outline-none"
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
                    className="w-80 bg-transparent h-12 font-medium text-3xl uppercase border-none outline-none"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="transport w-full bg-white rounded-3xl col-span-2 pt-4 pb-2 px-6 relative">
            <hr className="h-1 bg-primary-color"></hr>
            <h3 className="absolute top-2.5 bg-white pr-4 text-lg text-primary-color font-bold">
              ŚRODEK TRANSPORTU
            </h3>
            <div className="w-[100%] relative gap-3 mt-6">
              <div className="w-[95%] pb-2 flex flex-row gap-3 duration-300 overflow-hidden">
                {transportData.map((mode) => (
                  <div
                    className={` bg-back-color flex ${
                      direction ? "flex-[1_0_20%]" : "flex-[1_0_32%]"
                    } flex-col justify-center items-center rounded-3xl duration-300 text-sm p-2 gap-1.5 font-bold drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] cursor-pointer border-2 ${
                      journey.transportType == mode.name
                        ? "border-primary-color"
                        : "border-transparent"
                    }`}
                    key={mode.name}
                    onClick={() => {
                      setJourney({ ...journey, transportType: mode.name });
                    }}
                  >
                    <h4>PODRÓŻ</h4>
                    <img src={mode.icon} />
                    <h4>{mode.text}</h4>
                  </div>
                ))}
              </div>
              <img
                className={`w-[4%] absolute top-8 right-0 duration-300 cursor-pointer ${
                  direction ? "rotate-180" : "rotate-0"
                }`}
                src={slideIcon}
                onClick={() => setDirection(!direction)}
              />
            </div>
          </div>
          <div className="items w-full bg-white rounded-3xl py-4 px-6 relative">
            <hr className="h-1 bg-primary-color"></hr>
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
                          items: [...journey.items, item],
                        }),
                      setItem("")
                    )}
                  />
                </label>
              </div>
              <div className="items h-auto w-full bg-back-color border-t-[3px] border-primary-color gap-5 p-2">
                <div className="header flex flex-row justify-between pb-2 font-bold text-lg">
                  <h2>Łącznie</h2>
                  <h2>{journey.items.length}</h2>
                </div>
                <hr className="bg-black h-[2px] -mt-1 mb-2 border-0"></hr>
                <div className="itemList max-h-32 overflow-y-scroll overflow-x-hidden flex flex-col items-center justify-between">
                  {journey.items.length > 0 ? (
                    journey.items.map((item, idx) => (
                      <div className="item w-full flex justify-between items-center py-1 pl-4 pr-3 bg-white m-[2px] rounded-lg mr-4">
                        <h2 className="h-6 font-bold text-primary-color">
                          {item}
                        </h2>
                        <img
                          className="w-4 cursor-pointer duration-150 hover:scale-[125%]"
                          src={removeIcon}
                          onClick={() =>
                            setJourney({
                              ...journey,
                              items: journey.items.filter((_o, i) => idx !== i),
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
            <hr className="h-1 bg-primary-color"></hr>
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
                          people: [...journey.people, person],
                        }),
                      setPerson("")
                    )}
                  />
                </label>
              </div>
              <div className="items h-auto w-full bg-back-color border-t-[3px] border-primary-color gap-5 p-2">
                <div className="header flex flex-row justify-between pb-2 font-bold text-lg">
                  <h2>Łącznie</h2>
                  <h2>{journey.people.length}</h2>
                </div>
                <hr className="bg-black h-[2px] -mt-1 mb-2 border-0"></hr>
                <div className="itemList max-h-32 overflow-y-scroll overflow-x-hidden flex flex-col items-center justify-between">
                  {journey.people.length > 0 ? (
                    journey.people.map((person, idx) => (
                      <div className="item w-full flex justify-between items-center py-1 pl-4 pr-3 bg-white m-[2px] rounded-lg mr-4">
                        <h2 className="h-6 font-bold text-primary-color">
                          {person}
                        </h2>
                        <img
                          className="w-4 cursor-pointer duration-150 hover:scale-[125%]"
                          src={removeIcon}
                          onClick={() =>
                            setJourney({
                              ...journey,
                              people: journey.people.filter(
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
            <button
              onClick={() => console.log(journey)}
              type="submit"
              className="submit col-span-2 w-full font-bold text-5xl bg-transparent rounded-3xl flex justify-center items-center gap-5 text-white"
            >
              WYZNACZ TRASĘ <img src={logoIcon} className="w-8 fill-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

JourneyPanel.defaultProps = {
  startPlace: "",
  endPlace: "",
  startDate: new Date(),
  endDate: undefined,
  transportType: "DRIVING",
  length: "",
  items: [],
  people: [],
  _id: "",
};

export default JourneyPanel;
