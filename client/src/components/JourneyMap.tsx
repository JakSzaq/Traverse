// component and api imports
import React, { useState } from "react";
import { GoogleMap, DirectionsRenderer, Marker } from "@react-google-maps/api";

// icon and image imports
import arrowIcon from "../assets/icons/arrow_icon_g.svg";
import wrongIcon from "../assets/icons/wrong_location_icon.svg";
import clockIcon from "../assets/icons/clock_icon.svg";
import pointerIcon from "../assets/icons/Pointer.svg";
import itemsIcon from "../assets/icons/items_icon.svg";
import peopleIcon from "../assets/icons/people_icon.svg";

// data and type imports
import { JourneyMapI } from "../types";

const center = { lat: 52.2291, lng: 21.0129 };

const JourneyMap: React.FC<JourneyMapI> = ({
  map,
  journey,
  directionsResponse,
  duration,
  position,
  fuelPrice,
  journeyType,
  setMap,
  originRef,
  destinationRef,
  transportData,
}) => {
  const [toggle, setToggle] = useState(false);

  const small = {
    url: pointerIcon,
    scaledSize: new google.maps.Size(50, 50),
  };

  const big = {
    url: pointerIcon,
    scaledSize: new google.maps.Size(100, 100),
  };

  // function that switches between views of either the given place or the route itself
  const changeView = (toggle: boolean) => {
    if (toggle) {
      map?.panTo(position!);
      map?.setZoom(14);
    }
    setToggle(!toggle);
  };

  const loadMap = (map: google.maps.Map) => {
    const countryLayer = map.getFeatureLayer(google.maps.FeatureType.COUNTRY);
    countryLayer.style = {
      strokeColor: "white",
      strokeWeight: 1,
    };
    const regionLayer = map.getFeatureLayer(
      google.maps.FeatureType.ADMINISTRATIVE_AREA_LEVEL_1
    );
    regionLayer.style = {
      strokeColor: "#BEFFC9",
      strokeWeight: 1,
      strokeOpacity: 0.5,
    };
    return map;
  };

  return (
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
          pointerEvents: "none",
        }}
        options={{
          disableDefaultUI: true,
          scrollwheel: false,
          disableDoubleClickZoom: true,
          gestureHandling: "none",
          mapId: "340546ccaf5c3fb4",
        }}
        onLoad={(map) => setMap(loadMap(map))}
      >
        {directionsResponse !== null && toggle && (
          <DirectionsRenderer
            directions={directionsResponse}
            options={{
              suppressMarkers: true,
              polylineOptions: { strokeColor: "white", strokeWeight: 3 },
            }}
          />
        )}
        {position !== undefined && duration !== null && (
          <>
            <Marker
              options={{ icon: toggle ? small : big }}
              position={position}
            />
            <div
              className={`w-full h-full absolute flex justify-center items-end duration-300 p-6 pointer-events-auto ${
                toggle ? "opacity-30" : "opacity-100"
              }`}
            >
              <div className="time absolute top-0 w-auto px-2 h-12 mt-4 bg-[#DFFFE2] flex justify-center items-center rounded-2xl drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)]">
                <img className="w-9" src={clockIcon} />
                <p className="font-bold text-lg mx-5">
                  {duration?.toUpperCase()}
                </p>
              </div>
              <div className="bg-[#DFFFE2] flex w-full h-[24rem] rounded-[50px] px-7 py-6 basis-full">
                <div className="group left h-full flex flex-col border-r-2 border-black w-[35%] pr-7 duration-300 hover:w-full min-w-0 overflow-hidden">
                  <div className="top flex flex-row  justify-betweenw-full min-w-0">
                    <h3 className="w-full font-bold text-4xl text-ellipsis overflow-hidden whitespace-nowrap text-primary-color">
                      {originRef.current?.value.toUpperCase()}
                    </h3>
                    <img
                      className="w-12 duration-300 group-hover:w-20 group-hover:animate-pulse"
                      src={arrowIcon}
                    />
                  </div>
                  <h3 className="font-bold -mt-5 text-[4rem] text-ellipsis overflow-hidden whitespace-nowrap text-black">
                    {destinationRef.current?.value.toUpperCase()}
                  </h3>
                  <hr className="h-[3px] bg-black -mt-2 mb-6"></hr>
                  <div className="data flex flex-row justify-between items-center uppercase">
                    <div className="route flex flex-col border-black">
                      <h4 className="text-xl -mb-2 label text-primary-color font-bold">
                        Trasa
                      </h4>
                      <h3 className="text-3xl label text-black font-bold">
                        {journey.length}
                      </h3>
                    </div>
                    <div className="w-0.5 h-10 bg-black"></div>
                    <div className="type flex flex-col border-black">
                      <h4 className="text-xl -mb-2 label text-primary-color font-bold">
                        Rodzaj
                      </h4>
                      <h3 className="text-3xl label text-black font-bold">
                        {journeyType.substring(0, 4) + "."}
                      </h3>
                    </div>
                  </div>
                  <div className="bottom mt-8">
                    {transportData.map(
                      (mode) =>
                        mode.name == journey.transportType && (
                          <div
                            className="bg-back-color flex w-full flex-col justify-center items-center rounded-3xl duration-300 text-sm p-2 gap-1.5 font-bold drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] cursor-pointer border-2 border-transparent"
                            key={mode.name}
                          >
                            <h4>PODRÓŻ</h4>
                            <img src={mode.icon} />
                            <h4>{mode.text}</h4>
                          </div>
                        )
                    )}
                  </div>
                </div>
                <div className="right flex flex-col min-w-0 overflow-hidden flex-1 pl-6 mt-2">
                  <div className="w-full h-full flex flex-col">
                    <div className="people-item-data w-full grid grid-cols-2 gap-x-10">
                      <div className="items flex flex-col">
                        <div className="header flex flex-row gap-2 mb-1">
                          <h2 className="text-4xl font-bold">RZECZY</h2>
                          <img
                            className="w-10 bg-primary-color p-2 rounded-full"
                            src={itemsIcon}
                          />
                        </div>
                        <ol className="items-list h-24 overflow-y-scroll">
                          {journey.items!.length > 0 ? (
                            journey.items?.map((item, idx) => (
                              <li
                                key={idx}
                                className="text-gray-400 font-bold text-lg leading-6 text-ellipsis overflow-hidden whitespace-nowrap"
                              >
                                {idx + 1}. {item}
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-400 font-bold text-lg leading-6 text-ellipsis overflow-hidden whitespace-nowrap">
                              Są zbędne
                            </li>
                          )}
                        </ol>
                      </div>
                      <div className="people flex flex-col">
                        <div className="header flex flex-row gap-2 mb-1">
                          <h2 className="text-4xl font-bold">OSOBY</h2>
                          <img
                            className="w-10 bg-primary-color p-2 rounded-full"
                            src={peopleIcon}
                          />
                        </div>
                        <ol className="people-list h-24 overflow-y-scroll">
                          {journey.people!.length > 0 ? (
                            journey.people?.map((person, idx) => (
                              <li
                                key={idx}
                                className="text-gray-400 font-bold text-lg leading-6 text-ellipsis overflow-hidden whitespace-nowrap"
                              >
                                {idx + 1}. {person}
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-400 font-bold text-lg leading-6 text-ellipsis overflow-hidden whitespace-nowrap">
                              Nikt oprócz mnie
                            </li>
                          )}
                        </ol>
                      </div>
                    </div>
                    <button
                      onClick={() => changeView(toggle)}
                      className="w-auto h-16 bg-white mt-4 mb-6 text-xl font-bold text-gray-400 border-4 border-gray-300 rounded-xl overflow-hidden whitespace-nowrap"
                    >
                      {toggle ? "UKRYJ TRASĘ" : "WYŚWIETL TRASĘ"}
                    </button>
                    <hr className="h-[3px] bg-black -mt-2 mb-6"></hr>
                    <div className="fuelprice w-full h-auto flex flex-row gap-4 items-end">
                      <h2 className="w-auto font-bold text-2xl uppercase leading-7 text-primary-color overflow-hidden whitespace-nowrap">
                        Szacowany <br /> koszt paliwa
                      </h2>
                      <h1 className="flex-1 h-14 flex justify-center items-center bg-primary-color rounded-full text-white font-bold text-4xl overflow-hidden whitespace-nowrap">
                        {fuelPrice !== "" ? fuelPrice + " ZŁ" : "NIE DOTYCZY"}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {position !== undefined &&
          duration == null &&
          journey.length == null && (
            <>
              <div className="w-[95%] h-full absolute flex items-end duration-300 pt-2">
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
  );
};

export default JourneyMap;
