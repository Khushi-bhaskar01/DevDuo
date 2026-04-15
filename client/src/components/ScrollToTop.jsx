import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force instantaneous scroll reset
    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.body.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    
    resetScroll();
    const timeout = setTimeout(resetScroll, 10);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
