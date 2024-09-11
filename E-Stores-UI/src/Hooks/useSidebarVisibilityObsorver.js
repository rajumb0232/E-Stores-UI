import { useEffect } from "react";
import { useSellerBin } from "./useSellerBin";

export const useSidebarVisibilityObserver = (elementRef) => {
  const { setSidebarVisible } = useSellerBin();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setSidebarVisible(entry.isIntersecting);
      },
      { root: null, threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
      // console.log(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };

  }, [elementRef, setSidebarVisible]);
};
