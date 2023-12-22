export interface QuizDataI {
  header: string;
  qnText: string[];
  qnImage: string[];
}

export interface QuizFormI extends QuizDataI {
  question: number;
  setQuestion: React.Dispatch<React.SetStateAction<number>>;
  select: (num: number) => void;
}

export interface TransportDataI {
  name: "DRIVING" | "BICYCLING" | "WALKING" | "FLYING";
  text: string;
  icon: string;
}

export interface journeyDataI {
  startPlace: string;
  endPlace: string;
  startDate: Date;
  endDate: Date;
  transportType: "DRIVING" | "BICYCLING" | "WALKING" | "FLYING";
  length: string;
  items: string[];
  people: string[];
  _id: string;
}

export type userT = {
  email: string;
  id: string;
  journeys: journeyDataI[];
  name: string;
};

export interface userI {
  user: userT;
}
