import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import hotelIcon from "../assets/icons/hotel_icon.svg";
import restaurantIcon from "../assets/icons/restaurant_icon.svg";
import attractionIcon from "../assets/icons/attraction_icon.svg";
import logoIcon from "../assets/icons/traverse_icon_w.svg";
import arrowDownIcon from "../assets/icons/arrow_down_icon.svg";
import hotelMarker from "../assets/icons/hotel_marker.svg";
import restaurantMarker from "../assets/icons/restaurant_marker.svg";
import attractionMarker from "../assets/icons/attraction_marker.svg";

import { useIsVisible } from "../hooks/useIsVisible";
import { JourneyPlacesI } from "../types";
import Place from "./Place";
import PlaceDetails from "./PlaceDetails";
import LoadingScreen from "./LoadingScreen";
const JourneyPlaces: React.FC<JourneyPlacesI> = ({
  journey,
  position,
  map,
  markers,
  setMarkers,
  setMode,
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const isVisible = useIsVisible(imageRef);
  const [headers, setHeaders] = useState<google.maps.places.PlaceResult[]>();
  const [hotels, setHotels] = useState<google.maps.places.PlaceResult[]>();
  const [restaurants, setRestaurants] =
    useState<google.maps.places.PlaceResult[]>();
  const [attractions, setAttractions] =
    useState<google.maps.places.PlaceResult[]>();
  const [selectedPlace, setSelectedPlace] = useState<
    google.maps.places.PlaceResult | undefined
  >();

  const [service, setService] = useState<google.maps.places.PlacesService>();
  const [isLoaded, setIsLoaded] = useState(false);
  const newMarkers: google.maps.Marker[] = [];

  const getPlaces = () => {
    const service = new google.maps.places.PlacesService(map!);
    setService(service);
    service.nearbySearch(
      {
        location: position,
        radius: 5000,
        type: "tourist_attraction",
        rankBy: google.maps.places.RankBy.PROMINENCE,
      },
      (results, status) => {
        if (status !== "OK" || !results) return;
        setHeaders(
          results
            .filter((header) => header.user_ratings_total)
            .sort(sortPlaces)
            .slice(0, 2)
        );
      }
    );
    service.nearbySearch(
      {
        location: position,
        radius: 5000,
        type: "lodging",
        keyword: "hotel",
      },
      (results, status) => {
        if (status !== "OK" || !results) return;
        setHotels(
          results
            .filter((hotel) => hotel.user_ratings_total)
            .sort(sortPlaces)
            .slice(0, 3)
        );
      }
    );
    service.nearbySearch(
      {
        location: position,
        radius: 5000,
        type: "restaurant",
      },
      (results, status) => {
        if (status !== "OK" || !results) return;
        setRestaurants(
          results
            .filter((restaurant) => restaurant.user_ratings_total)
            .sort(sortPlaces)
            .slice(0, 3)
        );
      }
    );
    service.nearbySearch(
      {
        location: position,
        radius: 5000,
        type: "tourist_attraction",
        rankBy: google.maps.places.RankBy.PROMINENCE,
      },
      (results, status) => {
        if (status !== "OK" || !results) return;
        setAttractions(
          results
            .filter((attraction) => attraction.user_ratings_total)
            .sort(sortPlaces)
            .slice(0, 3)
        );
      }
    );
  };

  async function addPlaces(
    places: google.maps.places.PlaceResult[],
    map: google.maps.Map,
    type: string
  ) {
    for (const place of places) {
      if (place.geometry && place.geometry.location) {
        const image = {
          url: String(
            type == "HOTEL"
              ? hotelMarker
              : type == "RESTAURANT"
              ? restaurantMarker
              : attractionMarker
          ),
          size: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 59),
          scaledSize: new google.maps.Size(50, 50),
        };

        const marker = new google.maps.Marker({
          map,
          icon: image,
          title: place.name,
          position: place.geometry.location,
        });

        newMarkers.push(marker);

        setMarkers([...markers, ...newMarkers]);

        marker.addListener("click", () => {
          map.setCenter(place.geometry!.location!);
          setSelectedPlace(place);
        });
      }
    }
  }

  const sortPlaces = (
    a: google.maps.places.PlaceResult,
    b: google.maps.places.PlaceResult
  ) => {
    if (
      Number(a.user_ratings_total! * a.rating!) <
      Number(b.user_ratings_total! * b.rating!)
    ) {
      return 1;
    }
    if (
      Number(a.user_ratings_total! * a.rating!) >
      Number(b.user_ratings_total! * b.rating!)
    ) {
      return -1;
    }
    return 0;
  };

  useEffect(() => {
    if (position !== undefined) {
      getPlaces();
    }
  }, [position]);

  useEffect(() => {
    if (hotels !== undefined && map !== undefined) {
      addPlaces(hotels, map, "HOTEL");
    }
  }, [hotels]);

  useEffect(() => {
    if (restaurants !== undefined && map !== undefined) {
      addPlaces(restaurants, map, "RESTAURANT");
    }
  }, [restaurants]);

  useEffect(() => {
    if (attractions !== undefined && map !== undefined) {
      addPlaces(attractions, map, "ATTRACTION");
    }
  }, [attractions]);

  useEffect(() => {
    if (selectedPlace == undefined) {
      map?.setCenter(position!);
    }
  }, [selectedPlace]);

  useEffect(() => {
    if (
      headers !== undefined &&
      hotels !== undefined &&
      restaurants !== undefined &&
      attractions !== undefined
    ) {
      setIsLoaded(true);
    }
  }, [headers, hotels, restaurants, attractions]);

  return (
    <div className="places bg-transparent w-full h-[90vh] overflow-y-scroll flex flex-col justify-between gap-6">
      {isLoaded ? (
        <div className="content bg-white rounded-3xl h-full">
          <div className="heading w-full bg-white rounded-3xl col-span-2 py-4 px-6 relative">
            <hr className="h-[2px] bg-primary-color"></hr>
            <h3 className="absolute top-2.5 bg-white pr-4 text-lg text-primary-color font-bold">
              INFORMACJE O MIEJSCU
            </h3>
          </div>
          <div className="data flex flex-col flex-wrap justify-between mt-2 px-5">
            <div className="header h-14 flex flex-col w-full">
              <h2 className="text-5xl font-bold mb-2 text-ellipsis overflow-hidden whitespace-nowrap">
                NAJLEPSZE W {journey.endPlace?.toUpperCase()}
              </h2>
            </div>
            <div className="images flex flex-row w-full duration-200 h-20 hover:h-40 mt-2 pb-4 gap-5">
              <img
                className="h-full w-full bg-transparent rounded-[100px_10px_10px_10px] shadow-[inset_0_0_10px_rgba(34,204,61,1)] object-cover"
                src={
                  headers !== undefined
                    ? String(
                        headers[0].photos![0].getUrl({
                          maxWidth: headers[0].photos![0].width,
                          maxHeight: headers[0].photos![0].height,
                        })
                      )
                    : ""
                }
              ></img>
              <img
                className="h-full w-full bg-transparent rounded-[10px_100px_10px_10px] shadow-[inset_0_0_10px_rgba(34,204,61,1)] object-cover"
                src={
                  headers !== undefined
                    ? String(
                        headers[1].photos![0].getUrl({
                          maxWidth: headers[1].photos![0].width,
                          maxHeight: headers[1].photos![0].height,
                        })
                      )
                    : ""
                }
              ></img>
            </div>
            <hr className="separator h-1 bg-primary-color mt-2 mb-4" />
            {selectedPlace == undefined ? (
              <div className="places">
                <div className="hotels flex flex-col">
                  <div className="place-header flex flex-row items-center gap-2 text-3xl font-bold">
                    <h3>NOCLEGI</h3>
                    <div className="img-wrap w-10 h-10 bg-primary-color rounded-full flex justify-center items-center">
                      <img src={hotelIcon}></img>
                    </div>
                  </div>
                  <div className="place-list w-full flex flex-row gap-4 my-4">
                    {hotels !== undefined &&
                      hotels.map((hotel, i) => (
                        <Place
                          element={hotel}
                          map={map}
                          key={i}
                          setSelectedPlace={setSelectedPlace}
                        />
                      ))}
                  </div>
                </div>
                <div className="restaurants flex flex-col">
                  <hr className="separator h-1 bg-primary-color mt-2 mb-4" />
                  <div className="place-header flex flex-row items-center gap-2 text-3xl font-bold">
                    <h3>RESTAURACJE</h3>
                    <div className="img-wrap w-10 h-10 bg-primary-color rounded-full flex justify-center items-center">
                      <img src={restaurantIcon}></img>
                    </div>
                  </div>
                  <div className="place-list w-full flex flex-row gap-4 my-4">
                    {restaurants !== undefined &&
                      restaurants.map((restaurant, i) => (
                        <Place
                          element={restaurant}
                          map={map}
                          key={i}
                          setSelectedPlace={setSelectedPlace}
                        />
                      ))}
                  </div>
                </div>
                <div className="attractions flex flex-col">
                  <hr className="separator h-1 bg-primary-color mt-2 mb-4" />
                  <div className="place-header flex flex-row items-center gap-2 text-3xl font-bold">
                    <h3>ATRAKCJE</h3>
                    <div className="img-wrap w-10 h-10 bg-primary-color rounded-full flex justify-center items-center">
                      <img src={attractionIcon}></img>
                    </div>
                  </div>
                  <div className="place-list w-full flex flex-row gap-4 my-4">
                    {attractions !== undefined &&
                      attractions.map((attraction, i) => (
                        <Place
                          element={attraction}
                          map={map}
                          key={i}
                          setSelectedPlace={setSelectedPlace}
                        />
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <PlaceDetails
                element={selectedPlace}
                setSelectedPlace={setSelectedPlace}
                service={service}
              />
            )}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
      <div className="btn-container cursor-pointer col-span-2 min-h-[6rem] bg-primary-color rounded-3xl flex justify-center items-center relative overflow-hidden before:content-[''] before:absolute before:bg-[rgba(255,255,255,.5)] before:duration-1000 before:skew-x-[-45deg] before:hover:skew-x-[-45deg] before:-left-56 before:hover:left-[110%] before:w-44 before:h-44">
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
          onClick={() => setMode("EDIT")}
          type="submit"
          className="submit col-span-2 w-full h-full font-bold text-5xl bg-transparent rounded-3xl flex justify-center items-center gap-5 text-white"
        >
          EDYTUJ PODRÓŻ{" "}
          <img ref={imageRef} src={logoIcon} className="w-8 fill-white" />
        </button>
      </div>
    </div>
  );
};

export default JourneyPlaces;
