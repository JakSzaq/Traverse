// component and api imports
import React, { useEffect, useRef, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import { useJsApiLoader, Libraries } from "@react-google-maps/api";
import JourneyForm from "./JourneyForm";

// data and type imports
import { transportData } from "../data/transportData";
import {
  FuelPricesI,
  JourneyMode,
  JourneyPanelI,
  JourneyPropsI,
  TransportType,
  UserT,
} from "../types";
import JourneyMap from "./JourneyMap";
import JourneyPlaces from "./JourneyPlaces";
import { useNavigate } from "react-router-dom";

// main component for creating and showing journey with coresponding data
const JourneyPanel: React.FC<JourneyPanelI> = (props) => {
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
  const [startPosition, setStartPosition] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >();
  const [journeyType, setJourneyType] = useState("");
  const [mode, setMode] = useState<JourneyMode>(props.mode);
  const [currentMode, setCurrentMode] = useState<JourneyMode>();

  const [fuelPrices, setFuelPrices] = useState<FuelPricesI | undefined>();
  const [cost, setCost] = useState<string>("");
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [data, setData] = useState<JourneyPropsI>();

  const [journey, setJourney] = useState<JourneyPropsI>({
    startPlace: props.startPlace,
    endPlace: props.endPlace,
    startDate: props.startDate,
    endDate: props.endDate,
    transportType: props.transportType,
    length: props.length,
    items: props.items,
    people: props.people,
    fuel: props.fuel,
    _id: props._id,
  });

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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
            map?.setZoom(14);
          }
        }
      );

      const calculateCost = (length: number) => {
        return (
          (length / 100) *
          journey.fuel!.usage *
          parseFloat(journey.fuel!.value.replace(",", "."))
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
              if (journeyLength == undefined) return;
              const journeyLengthNumeric = getNumericValue(journeyLength);
              const journeyDuration =
                response!.routes[0].legs[0].duration!.text;
              setDirectionsResponse(response);
              setJourney({
                ...journey,
                length: journeyLength,
                startPlace: originRef.current?.value,
                endPlace: destinationRef.current?.value,
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

  const calculateExistingRoute = async () => {
    // calculating the route between places
    if (journey.startPlace === "" || journey.endPlace === "") {
      return;
    }
    const destinationGeocoder = new google.maps.Geocoder();
    const endPlace = journey.endPlace;
    destinationGeocoder.geocode(
      {
        address: endPlace,
      },
      function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          const lat = results![0].geometry.location.lat();
          const long = results![0].geometry.location.lng();
          const latlng = new google.maps.LatLng(lat, long);
          setPosition(latlng);
          const country = results![0].formatted_address.split(" ");
          getJourneyType(country[country.length - 1]);
          map?.panTo(latlng);
          map?.setZoom(14);
        }
      }
    );

    const calculateCost = (length: number) => {
      return (
        (length / 100) *
        journey.fuel!.usage *
        parseFloat(journey.fuel!.value.replace(",", "."))
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
          origin: journey.startPlace!,
          destination: journey.endPlace!,
          travelMode: google.maps.TravelMode[transportT!],
        },
        function (response, status) {
          if (status == "OK") {
            const journeyLength = response!.routes[0].legs[0].distance!.text;
            if (journeyLength == undefined) return;
            const journeyLengthNumeric = getNumericValue(journeyLength);
            const journeyDuration = response!.routes[0].legs[0].duration!.text;
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
  };

  // function which determines whether a journey is domestic or international
  const getJourneyType = (endCountry: string) => {
    const originGeocoder = new google.maps.Geocoder();
    const startPlace =
      mode == "VIEW" ? journey.startPlace : originRef.current!.value;
    originGeocoder.geocode(
      {
        address: startPlace,
      },
      function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          setStartPosition(results![0].geometry.location);
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
    const user: UserT = JSON.parse(localStorage.getItem("user")!);
    if (mode == "CREATE") {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/users/journeys/${user.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            startPlace: journey.startPlace,
            endPlace: journey.endPlace,
            startDate: journey.startDate,
            endDate: journey.endDate,
            transportType: journey.transportType,
            journeyType: journeyType,
            items: journey.items,
            people: journey.people,
            length: journey.length,
            fuel: journey.fuel,
          }),
        }
      );
      const data = await response.json();
      if (
        data.status === "fail" ||
        data.status === "error" ||
        data == undefined
      ) {
        alert("Something went wrong!");
        return;
      }

      navigate(`/dashboard/${data.data.journey._id}`);
    } else if (mode == "EDIT") {
      console.log(journey);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/users/journeys/${user.id}/${
          journey._id
        }`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            startPlace: originRef.current?.value,
            endPlace: destinationRef.current?.value,
            startDate: journey.startDate,
            endDate: journey.endDate,
            transportType: journey.transportType,
            journeyType: journeyType,
            items: journey.items,
            people: journey.people,
            length: journey.length,
            fuel: journey.fuel,
          }),
        }
      );
      const data = await response.json();
      if (
        data.status === "fail" ||
        data.status === "error" ||
        data == undefined
      ) {
        alert("Something went wrong!");
        return;
      }
      setData(data);
      navigate(`/dashboard/${data.data.journey._id}`);
    }
  };

  const getFuelPrices = async () => {
    if (fuelPrices !== undefined) {
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/users/fuelPrices`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    const latest = new Date(data.data.prices[0].updatedAt);
    const today =
      new Date().getDate() +
      "-" +
      new Date().getMonth() +
      "-" +
      new Date().getFullYear();
    const latestDate =
      latest.getDate() + "-" + latest.getMonth() + "-" + latest.getFullYear();
    if (today == latestDate) {
      setFuelPrices(data.data.prices[0]);
    } else {
      await fetchNewPrices();
    }
  };

  const fetchNewPrices = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/users/fuelPrices`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    setFuelPrices(data.data.prices[0]);
  };

  useEffect(() => {
    if (mode == "VIEW" && isLoaded) {
      calculateExistingRoute();
      getFuelPrices();
    }
  }, [mode, isLoaded]);

  useEffect(() => {
    if (currentMode == "EDIT") {
      setMode("EDIT");
      setDirectionsResponse(null);
    }
  }, [currentMode]);

  useEffect(() => {
    if (data !== undefined) {
      setJourney(data);
      setMode("VIEW");
      setCurrentMode("VIEW");
    }
  }, [data]);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div className="content w-full h-screen grid grid-cols-2 gap-12 mt-16 px-6 overflow-hidden">
      <JourneyMap
        map={map}
        journey={journey}
        directionsResponse={directionsResponse}
        duration={duration}
        position={position}
        startPosition={startPosition}
        fuelPrice={cost}
        journeyType={journeyType}
        setMap={setMap}
        transportData={transportData}
        mode={mode}
        markers={markers}
      />
      {mode == "VIEW" && isLoaded && (
        <JourneyPlaces
          journey={journey}
          position={position}
          map={map}
          markers={markers}
          setMarkers={setMarkers}
          setMode={setCurrentMode}
        />
      )}
      {mode == "CREATE" || mode == "EDIT" ? (
        <JourneyForm
          journey={journey}
          setJourney={setJourney}
          originRef={originRef}
          destinationRef={destinationRef}
          transportData={transportData}
          createJourney={handleCreateJourney}
          setMode={setMode}
          fuelPrices={fuelPrices}
          getFuelPrices={getFuelPrices}
        />
      ) : (
        <></>
      )}
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
  fuel: {
    value: "",
    usage: 0,
  },
  mode: "CREATE",
  _id: "",
};

export default JourneyPanel;
