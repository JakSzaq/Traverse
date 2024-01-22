// component and api imports
import React, { useRef, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import { useJsApiLoader, Libraries } from "@react-google-maps/api";
import JourneyForm from "./JourneyForm";

// data and type imports
import { transportData } from "../data/transportData";
import { FuelT, JourneyPropsI, TransportType } from "../types";
import JourneyMap from "./JourneyMap";

/* 
Lines commented like this are there until styling and basic functionality is done
*/

// main component for creating and showing journey with coresponding data
const JourneyPanel: React.FC<JourneyPropsI> = (props) => {
  const [libraries] = useState<Libraries | undefined>(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
    language: "PL",
  });

  const [map, setMap] = useState<google.maps.Map>();
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [duration, setDuration] = useState<string | null>("");
  const [position, setPosition] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >();
  const [journeyType, setJourneyType] = useState("");

  const [fuel, setFuel] = useState<FuelT>();
  const [cost, setCost] = useState<string>("");
  const [journey, setJourney] = useState<JourneyPropsI>({
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

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  // function that calculates coordinates of chosen places and fetches necessary data from the api
  const calculateRoute = async () => {
    setDirectionsResponse(null);
    setJourney({
      ...journey,
      length: "",
    });
    setDuration("");
    setCost("");
    // calculating the route between places
    if (
      originRef.current !== null &&
      destinationRef.current !== null &&
      journey.transportType !== undefined
    ) {
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
          if (status == google.maps.GeocoderStatus.OK) {
            const lat = results![0].geometry.location.lat();
            const long = results![0].geometry.location.lng();
            const latlong = new google.maps.LatLng(lat, long);
            setPosition(latlong);
            const country = results![0].formatted_address.split(" ");
            getJourneyType(country[country.length - 1]);
            map?.panTo(latlong);
          }
        }
      );

      const calculateCost = (length: number) => {
        return (
          (length / 100) *
          fuel!.usage *
          parseFloat(fuel!.value.replace(",", "."))
        )
          .toFixed(2)
          .toString();
      };

      const getNumericValue = (journeyLength: string) => {
        const length = journeyLength.replace(/\s/g, "-").split("-");
        if (length.length <= 2) {
          return parseFloat(length[0]);
        } else {
          return parseFloat(length[0] + length[1]);
        }
      };

      const checkTransportType = () => {
        if (
          journey.transportType !== undefined &&
          journey.transportType !== "FLYING"
        ) {
          return journey.transportType;
        }
      };

      const transportT = checkTransportType();

      //calculating distance and time of journey
      const directionsService = new google.maps.DirectionsService();
      try {
        await directionsService.route(
          {
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            travelMode: google.maps.TravelMode[transportT!],
          },
          function (response, status) {
            if (status == "OK") {
              const journeyLength = response!.routes[0].legs[0].distance!.text;
              const journeyLengthNumeric = getNumericValue(journeyLength);
              console.log(journeyLengthNumeric);
              const journeyDuration =
                response!.routes[0].legs[0].duration!.text;
              setDirectionsResponse(response);
              setJourney({
                ...journey,
                length: journeyLength,
              });
              if (transportT == TransportType.DRIVING) {
                setCost(calculateCost(journeyLengthNumeric));
              }
              setDuration(journeyDuration);
            }
          }
        );
      } catch (error) {
        setDirectionsResponse(null);
        setJourney({
          ...journey,
          length: undefined,
        });
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
    setJourney({
      ...journey,
      startPlace: originRef.current?.value,
      endPlace: destinationRef.current?.value,
    });
    return false;
  };

  return (
    <div className="content w-full h-screen grid grid-cols-2 gap-12 mt-16 px-6 overflow-hidden">
      <JourneyMap
        map={map}
        journey={journey}
        directionsResponse={directionsResponse}
        duration={duration}
        position={position}
        fuelPrice={cost}
        journeyType={journeyType}
        setMap={setMap}
        originRef={originRef}
        destinationRef={destinationRef}
        transportData={transportData}
      />
      <JourneyForm
        journey={journey}
        setJourney={setJourney}
        originRef={originRef}
        destinationRef={destinationRef}
        setFuelPrice={setFuel}
        transportData={transportData}
        createJourney={handleCreateJourney}
      />
    </div>
  );
};

JourneyPanel.defaultProps = {
  startPlace: "",
  endPlace: "",
  startDate: new Date().toISOString().substring(0, 10),
  endDate: "",
  transportType: undefined,
  length: "",
  items: [],
  people: [],
  _id: "",
};

export default JourneyPanel;
