import React, { useEffect, useState } from "react";
import { PlaceDetailsI } from "../types";

import BackIcon from "../assets/icons/back_icon.svg";
import PhoneIcon from "../assets/icons/phone_icon.svg";
import WebIcon from "../assets/icons/web_icon.svg";
import rateIcon from "../assets/icons/rate_icon.svg";

const PlaceDetails: React.FC<PlaceDetailsI> = ({
  element,
  setSelectedPlace,
  service,
}) => {
  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null
  );
  const [photo, setPhoto] = useState(0);
  const status =
    element.business_status == "OPERATIONAL"
      ? "FUNKCJONUJE"
      : element.business_status == "CLOSED_TEMPORARILY"
      ? "ZAMKNIĘTE TYMCZASOWO"
      : "ZAMKNIĘTE NA STAŁE";

  const changePhoto = (value: string) => {
    if (value == "prev") {
      if (photo == 0) {
        setPhoto(place?.photos?.length! - 1);
      } else {
        setPhoto((photo) => photo - 1);
      }
    } else {
      if (photo == place?.photos?.length! - 1) {
        setPhoto(0);
      } else {
        setPhoto((photo) => photo + 1);
      }
    }
  };

  useEffect(() => {
    service?.getDetails(
      {
        placeId: element.place_id!,
      },
      function (place, status) {
        if (status !== "OK") return;
        setPlace(place);
      }
    );
    setPhoto(0);
  }, [element]);
  return (
    <>
      {place !== null && (
        <div className="flex flex-col h-full w-full gap-4">
          <div className="header relative h-12 flex flex-row items-center justify-center gap-6">
            <img
              className={
                "w-10 absolute left-0 cursor-pointer duration-100 hover:translate-x-2"
              }
              src={BackIcon}
              onClick={() => setSelectedPlace(undefined)}
            />
            <h2
              className={`ml-20 font-bold ${
                element.name?.length! > 50 ? "text-lg" : "text-2xl"
              }`}
            >
              {element.name}
            </h2>
            <div className="functions w-auto h-10 flex items-center justify-center px-6 border-4 border-primary-color rounded-full text-primary-color font-bold text-">
              {status}
            </div>
            {status == "FUNKCJONUJE" && (
              <div
                className={`functions w-auto whitespace-nowrap h-10 flex items-center justify-center px-6 border-4 border-primary-color rounded-full  text-black font-bold ${
                  place?.opening_hours?.isOpen(new Date()) == true
                    ? "bg-back-color"
                    : "bg-red-200"
                }`}
              >
                {place?.opening_hours?.isOpen(new Date()) == true
                  ? "OTWARTE TERAZ"
                  : "ZAMKNIĘTE TERAZ"}
              </div>
            )}
          </div>
          <div className="content shadow-[inset_0_0_10px_rgba(0,0,0,.25)] rounded-2xl px-6 py-4 overflow-hidden flex flex-col gap-2">
            <div className="top flex flex-row items-center justify-start gap-6 w-full">
              <div className="address w-full max-w-sm flex flex-col duration-300 hover:max-w-full">
                <h2 className="font-bold text-2xl text-primary-color">Adres</h2>
                <h2 className="font-bold text-3xl text-black text-ellipsis overflow-hidden whitespace-nowrap">
                  {place.vicinity?.split(",")[0]}
                </h2>
              </div>
              <div className="min-w-[4px] h-16 bg-primary-color "></div>
              <div className="w-full contact flex flex-col">
                {place.formatted_phone_number !== undefined && (
                  <h2 className="font-bold text-2xl text-black flex flex-row gap-4 select-text">
                    <img src={PhoneIcon} /> {place.formatted_phone_number}
                  </h2>
                )}
                {place.website !== undefined && (
                  <a
                    href={String(place.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group font-bold max-w-md relative text-2xl text-black flex flex-row gap-4 cursor-pointer overflow-hidden"
                  >
                    <img src={WebIcon} />{" "}
                    <span className="before:duration-200 before:flex before:items-center before:text-black before:text-2xl before:font-bold before:justify-start before:content-['Otwórz_stronę_w_nowej_karcie'] before:absolute before:h-8 before:w-full overflow-hidden text-ellipsis whitespace-nowrap before:translate-y-8 group-hover:before:translate-y-0 before:bg-white ">
                      {place.website}
                    </span>
                  </a>
                )}
              </div>
            </div>
            <div className="description h-full w-full flex flex-row">
              <div className="relative photos w-[50%] h-[19rem] p-2 !pl-0 flex items-end justify-center">
                <img
                  className="h-64 w-full rounded-2xl duration-100 object-cover"
                  src={String(place.photos![photo].getUrl())}
                />
                <div className="controls absolute top-0 translate-y-4 w-[75%] flex flex-row items-center justify-between gap-10 bg-back-color px-4 py-1 border-4 border-white drop-shadow-[0_0_5px_rgba(0,0,0,.25)] rounded-full">
                  <img
                    onClick={() => changePhoto("prev")}
                    className="w-8 cursor-pointer"
                    src={BackIcon}
                  />
                  <h2 className="font-bold text-2xl">ZDJĘCIA</h2>
                  <img
                    onClick={() => changePhoto("next")}
                    className="w-8 rotate-180 cursor-pointer"
                    src={BackIcon}
                  />
                </div>
                <div className="photo-count absolute bottom-0 bg-back-color w-auto h-8 px-5 flex items-center justify-center rounded-full font-bold border-2 border-black drop-shadow-[0_0_5px_rgba(0,0,0,.25)]">
                  <h2>
                    {photo + 1} | {place.photos?.length}
                  </h2>
                </div>
              </div>
              <div className="reviews w-[50%] flex flex-col items-center overflow-hidden">
                <h2 className="font-bold text-primary-color mb-2 text-2xl pb-0">
                  Opinie o miejscu
                </h2>
                <div className="review-list h-64 overflow-y-scroll snap-mandatory snap-y w-full">
                  {place.reviews == undefined ? (
                    <div className="h-64 bg-back-color rounded-xl flex items-center justify-center  p-10 ">
                      <h2 className="text-3xl font-bold">
                        Brak opinii o miescu :/
                      </h2>
                    </div>
                  ) : (
                    <>
                      {place.reviews?.map((review, i) => (
                        <div
                          key={review.author_name}
                          className="review h-auto mb-4 bg-back-color snap-center snap-always rounded-xl p-4 flex flex-col gap-2"
                        >
                          <div className="flex flex-row justify-between items-between">
                            <div className="header flex flex-row gap-2">
                              <img
                                className="w-12 h-12 rounded-full border-2 border-primary-color"
                                alt={i.toString()}
                                src={review.profile_photo_url}
                              />
                              <div>
                                <h2 className="font-bold text-2xl max-w-[12rem] -mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
                                  {review.author_name}
                                </h2>
                                <h3>{review.relative_time_description}</h3>
                              </div>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                              <h2 className="font-bold text-4xl -mb-1">
                                {review.rating}
                              </h2>
                              <img className="w-10" src={rateIcon} />
                            </div>
                          </div>
                          <hr className="h-1 bg-primary-color"></hr>
                          <h2 className="text-ellipsis overflow-hidden ">
                            {review.text}
                          </h2>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceDetails;
