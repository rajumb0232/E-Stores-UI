import { useEffect } from "react";
import { useStarter } from "../Context/Starter";

export const useSidebarVisibilityObserver = (elementRef) => {
  const { setSidebarVisible } = useStarter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setSidebarVisible(entry.isIntersecting);
      },
      { root: null, threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
      console.log(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };

  }, [elementRef, setSidebarVisible]);
};
