import { useState, useEffect, useMemo } from "react";
import { refGenerics as RG } from "../types";

export const useIsVisible = <T extends React.RefObject<RG>>(
  ref: T
): boolean => {
  const [isInView, setIsInView] = useState(false);
  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting)),
    []
  );

  useEffect(() => {
    observer.observe(ref!.current!);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isInView;
};
