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
  name: string;
  text: string;
  icon: string;
}

export interface journeyDataI {
  startPlace: string;
  endPlace: string;
  startDate: Date;
  endDate: Date;
  transportType: string;
  length: string;
  items: string[];
  people: string[];
}
