//interface for quizData file, when selecting 'use our recommendations' option in the first prompt
export interface QuizDataI {
  header: string;
  qnText: string[];
  qnImage: string[];
}

//interface for quizForm component, for storing options selected by user
export interface QuizFormI extends QuizDataI {
  question: number;
  setQuestion: React.Dispatch<React.SetStateAction<number>>;
  select: (num: number) => void;
}

//interface for transportData file, when choosing from available transport types in JourneyForm component
export interface TransportDataI {
  name: TransportType | "FLYING";
  text: string;
  icon: string;
}

//interface for creating, updating, mapping and deleting journey data
export interface JourneyDataI {
  startPlace: string;
  endPlace: string;
  startDate: Date | string;
  endDate: Date | string;
  transportType: TransportType | "FLYING";
  length: string;
  items: string[];
  people: string[];
  _id: string;
}

export enum TransportType {
  DRIVING = "DRIVING",
  BICYCLING = "BICYCLING",
  WALKING = "WALKING",
}

//interface for creating JourneyPanel component with either given data or no data
export interface JourneyPropsI extends Partial<JourneyDataI> {}

export interface JourneyFormI {
  journey: JourneyPropsI;
  setJourney: React.Dispatch<React.SetStateAction<JourneyPropsI>>;
  originRef: React.RefObject<HTMLInputElement>;
  destinationRef: React.RefObject<HTMLInputElement>;
  setFuelPrice: React.Dispatch<React.SetStateAction<FuelT>>;
  transportData: TransportDataI[];
  createJourney: (e: React.FormEvent<HTMLFormElement>) => Promise<boolean>;
}

export interface JourneyMapI {
  map: google.maps.Map | undefined;
  journey: JourneyPropsI;
  directionsResponse: google.maps.DirectionsResult | null;
  duration: string | null;
  position: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
  fuelPrice: string | undefined;
  journeyType: string;
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | undefined>>;
  originRef: React.RefObject<HTMLInputElement>;
  destinationRef: React.RefObject<HTMLInputElement>;
  transportData: TransportDataI[];
}
//interface for user authentication
export type UserT = {
  email: string;
  id: string;
  journeys: JourneyDataI[];
  name: string;
};

//interface for Journey component
export interface UserI {
  user: UserT;
}

export type FuelT =
  | {
      value: string;
      usage: number;
    }
  | undefined;

export interface FuelDataI {
  type: string;
  alias: string;
  name: string;
  color: string;
  usage: number;
}

export interface FuelPricesI {
  PB95: string;
  PB98: string;
  ON: string;
  ONPLUS: string;
  LPG: string;
  EV: string;
  currency: string;
  //updatedAt: Date;
}

export type refGenerics =
  | HTMLButtonElement
  | HTMLInputElement
  | HTMLImageElement
  | null;
