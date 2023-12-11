import { useEffect, useState } from "react";

const useCountdown = (time: number) => {
  const [countDown, setCountDown] = useState(time);

  useEffect(() => {
    if (countDown === 0) {
      setCountDown(0);
    }

    const interval = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number): [number, string] => {
  const [label, setLabel] = useState<string>("");
  useEffect(() => {
    if (countDown < 4 && countDown > 1) {
      setLabel("sekundy");
    } else if (countDown == 1) {
      setLabel("sekundę");
    } else {
      setLabel("sekund");
    }
  }, [countDown]);

  return [countDown, label];
};

export { useCountdown };
