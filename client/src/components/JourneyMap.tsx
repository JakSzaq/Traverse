// component and api imports
import React, { useEffect, useState } from "react";
import { GoogleMap, DirectionsRenderer, Marker } from "@react-google-maps/api";

// icon and image imports
import arrowIcon from "../assets/icons/arrow_icon_g.svg";
import wrongIcon from "../assets/icons/wrong_location_icon.svg";
import clockIcon from "../assets/icons/clock_icon.svg";
import pointerIcon from "../assets/icons/Pointer.svg";
import startIcon from "../assets/icons/start_icon.svg";
import itemsIcon from "../assets/icons/items_icon.svg";
import peopleIcon from "../assets/icons/people_icon.svg";
import expandIcon from "../assets/icons/expand_icon.svg";
import shrinkIcon from "../assets/icons/shrink_icon.svg";

// data and type imports
import { JourneyMapI } from "../types";

const center = { lat: 52.2291, lng: 21.0129 };

const JourneyMap: React.FC<JourneyMapI> = ({
  map,
  journey,
  directionsResponse,
  duration,
  position,
  startPosition,
  fuelPrice,
  journeyType,
  setMap,
  transportData,
  mode,
  markers,
}) => {
  const [toggle, setToggle] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
    markers.map((marker) => marker.setVisible(false));
    if (toggle) {
      map?.panTo(position!);
      map?.setZoom(16);
      markers.map((marker) => marker.setVisible(true));
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
    map.setZoom(14);
    return map;
  };

  const panToPoint = (
    point: google.maps.LatLng | google.maps.LatLngLiteral
  ) => {
    map?.panTo(point);
    map?.setZoom(16);
  };

  useEffect(() => {
    if (mode == "EDIT") {
      markers.map((marker) => marker.setVisible(false));
      map?.panTo(position!);
    }
  }, [mode]);

  return (
    <div
      className={`map lg:h-[90vh] duration-100 w-full bg-primary-color rounded-[3rem] ${
        expanded ? "h-[90vh]" : "h-[30vh]"
      }`}
    >
      <GoogleMap
        id="map"
        center={mode == "VIEW" ? position : center}
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
          pointerEvents: "all",
        }}
        options={{
          clickableIcons: false,
          disableDefaultUI: true,
          scrollwheel: true,
          disableDoubleClickZoom: false,
          gestureHandling: "greedy",
          mapId: "340546ccaf5c3fb4",
        }}
        onLoad={(map) => setMap(loadMap(map))}
      >
        {directionsResponse !== null && toggle && (
          <DirectionsRenderer
            key={journey._id}
            directions={directionsResponse}
            options={{
              suppressMarkers: true,
              polylineOptions: { strokeColor: "white", strokeWeight: 3 },
            }}
          />
        )}
        <img
          onClick={() => setExpanded(!expanded)}
          className="xs:flex lg:hidden expand scale-75 lg:scale-100 absolute top-0 right-0 m-4 rounded-lg border-2 border-white w-12 h-12 duration-100 bg-primary-color p-1.5 cursor-pointer"
          src={expanded ? shrinkIcon : expandIcon}
        ></img>
        {mode == "VIEW" &&
          position !== undefined &&
          startPosition !== undefined && (
            <div className="w-full h-full absolute justify-center items-end pointer-events-none">
              <h2
                className={`h-12 w-full lg:hidden absolute bottom-0 items-center justify-center backdrop-blur-3xl hover:bg-back-color rounded-full drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] text-center text-xs xs:text-sm sm:text-xl font-bold ${
                  expanded ? "hidden" : "flex"
                }`}
              >
                POWIĘKSZ MAPĘ ABY ZOBACZYĆ SZCZEGÓŁY PODRÓŻY
              </h2>
              <Marker
                options={{ icon: toggle ? small : big }}
                position={position}
                onClick={() => panToPoint(position)}
              />
              <Marker
                options={{
                  icon: {
                    url: startIcon,
                    scaledSize: new google.maps.Size(50, 50),
                    origin: new google.maps.Point(0, -10),
                  },
                }}
                position={startPosition}
                onClick={() => panToPoint(startPosition)}
              />
              <div
                className={`w-full h-full absolute justify-center items-end lg:flex duration-300 p-6 pointer-events-none ${
                  expanded ? "flex" : "hidden"
                }`}
              >
                <div
                  className={`time absolute top-0 left-0 lg:left-auto w-auto px-2 scale-75 lg:scale-100 h-12 mt-4 pointer-events-auto bg-map-color flex justify-center items-center rounded-2xl drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] translate-y-[-55px] duration-500 ${
                    toggle ? "translate-y-[-55px]" : "translate-y-[0px]"
                  }`}
                >
                  <img className="w-9" src={clockIcon} />
                  <p className="font-bold text-lg mx-3 xs:mx-5">
                    {duration?.toUpperCase()}
                  </p>
                </div>
                <div
                  className={`bg-map-color flex flex-col lg:flex-row items-center justify-center w-full h-[24rem] rounded-[50px] px-7 py-6 basis-full duration-500 pointer-events-auto ${
                    toggle ? "translate-y-[400px]" : "translate-y-[0px]"
                  }`}
                >
                  <button
                    className={`absolute -top-20 h-16 w-full flex items-center justify-center bg-map-color hover:bg-back-color rounded-full drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] text-xl font-bold duration-500 transition-opacity ${
                      toggle
                        ? "delay-200 opacity-100 pointer-events-all"
                        : "delay-0 opacity-0 pointer-events-none"
                    }`}
                    onClick={() => changeView(toggle)}
                  >
                    UKRYJ TRASĘ
                  </button>
                  <div className="w-full h-full flex flex-wrap lg:flex-nowrap overflow-y-scroll snap-mandatory snap-y">
                    <div className="group left snap-center snap-always h-full flex flex-col lg:border-r-2 border-black w-full lg:w-[35%] lg:pr-7 duration-300 hover:w-full min-w-0 lg:overflow-hidden">
                      <div className="top flex flex-row justify-between w-full min-w-0 lg:mb-4">
                        <h3 className="w-full font-bold text-3xl lg:text-4xl text-ellipsis overflow-hidden whitespace-nowrap text-primary-color">
                          {journey.startPlace !== undefined
                            ? journey.startPlace!.toUpperCase()
                            : ""}
                        </h3>
                        <img
                          className="w-12 duration-300 group-hover:w-20 group-hover:animate-pulse"
                          src={arrowIcon}
                        />
                      </div>
                      <h3 className="font-bold inline-block text-5xl lg:-mt-5 lg:text-[4rem] text-ellipsis overflow-hidden whitespace-nowrap text-black">
                        {journey.endPlace !== undefined
                          ? journey.endPlace!.toUpperCase()
                          : ""}
                      </h3>
                      <hr className="h-[3px] bg-black mt-2 mb-6"></hr>
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
                    <div className="right snap-center snap-always flex flex-col min-w-0 overflow-hidden flex-1 pl-1 lg:pl-6 mt-2 mb-6 lg:mb-0">
                      <div className="w-full h-full flex flex-col">
                        <div className="people-item-data w-full grid sm:grid-cols-2 gap-y-6 gap-x-10">
                          <div className="items flex flex-col">
                            <div className="header flex flex-row justify-center lg:justify-start gap-2 mb-3 lg:mb-1">
                              <h2 className="text-4xl font-bold">RZECZY</h2>
                              <img
                                className="w-10 bg-primary-color p-2 rounded-full"
                                src={itemsIcon}
                              />
                            </div>
                            <ol className="items-list w-full h-24 overflow-y-scroll">
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
                            <div className="header flex flex-row justify-center lg:justify-start gap-2 mb-3 lg:mb-1">
                              <h2 className="text-4xl font-bold">OSOBY</h2>
                              <img
                                className="w-10 bg-primary-color p-2 rounded-full"
                                src={peopleIcon}
                              />
                            </div>
                            <ol className="people-list w-full h-24 overflow-y-scroll">
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
                          WYŚWIETL TRASĘ
                        </button>
                        <hr className="h-[3px] bg-black -mt-2 mb-6"></hr>
                        <div className="fuelprice w-full h-auto flex flex-col sm:flex-row gap-4 text-center sm:text-start items-center lg:items-end">
                          <h2 className="w-auto font-bold text-2xl uppercase leading-7 text-primary-color overflow-hidden">
                            Szacowany <br className="hidden sm:flex" /> koszt
                            paliwa
                          </h2>
                          <h1 className="flex-1 w-full px-10 py-2 sm:p-0 h-14 flex justify-center items-center bg-primary-color rounded-full text-white font-bold text-4xl overflow-hidden whitespace-nowrap">
                            {fuelPrice !== ""
                              ? fuelPrice + " ZŁ"
                              : "NIE DOTYCZY"}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="lg:hidden gradient pointer-events-none w-full h-20 absolute bottom-0 left-0 rounded-2xl bg-gradient-to-b from-[rgba(190,255,201,0)] from-0% to-[rgba(190,255,201,0.9)] to-80%"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        {position !== undefined &&
          duration == null &&
          journey.length == null && (
            <>
              <div className="w-[95%] h-full absolute flex items-end duration-300 pt-2">
                <div className="bg-map-color flex flex-col items-center justify-center gap-2 w-full h-[24rem] rounded-[50px] px-7 py-6 mb-6">
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
