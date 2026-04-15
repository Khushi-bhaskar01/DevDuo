import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InitialLoader from "./components/InitialLoader";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import CustomCursor from "./components/CustomCursor";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("devDuoInitialLoad");
    if (hasLoaded) {
      setShowLoader(false);
    }
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem("devDuoInitialLoad", "true");
    setShowLoader(false);
  };

  return (
    <>
      <CustomCursor />
      {showLoader && <InitialLoader onComplete={handleLoaderComplete} />}
      {!showLoader && (
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      )}
    </>
  );
}