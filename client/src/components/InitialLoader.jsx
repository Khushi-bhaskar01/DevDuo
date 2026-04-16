import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const STATUS_WORDS = [
  "SYSTEM BOOT",
  "PROTOCOL INITIALIZED",
  "CORE LOADING",
  "DEVICES READY",
  "DEVDIO ONLINE"
];

export default function InitialLoader({ onComplete }) {
  const [statusIndex, setStatusIndex] = useState(0);
  const overlayRef = useRef(null);
  const curtainTopRef = useRef(null);
  const curtainBotRef = useRef(null);
  const ringsRef = useRef(null);
  const statusRef = useRef(null);
  const contentRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    // Safety fallback: if anything hangs, finish after 8s
    const safetyTimer = setTimeout(() => {
      onComplete();
    }, 8000);

    const ctx = gsap.context(() => {
      const mainTl = gsap.timeline({
        onComplete: () => {
          clearTimeout(safetyTimer);
          onComplete();
        }
      });

      // Status cycling
      const statusInterval = setInterval(() => {
        setStatusIndex((prev) => (prev < STATUS_WORDS.length - 1 ? prev + 1 : prev));
      }, 1000);

      // Start state
      mainTl.set([curtainTopRef.current, curtainBotRef.current], { y: "0%" });
      
      // Phase 0: Boot
      mainTl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });
      
      mainTl.fromTo(frameRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power4.out" },
        0.2
      );

      mainTl.fromTo(ringsRef.current,
        { scale: 0.5, opacity: 0, rotate: -45 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1.5, ease: "power3.out" },
        0.4
      );

      mainTl.fromTo(statusRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.8
      );

      // Spin rings
      gsap.to(".loader-orbit-one", { rotate: 360, duration: 8, repeat: -1, ease: "none" });
      gsap.to(".loader-orbit-two", { rotate: -360, duration: 12, repeat: -1, ease: "none" });

      // Phase 1: Brand Reveal
      const brandTl = gsap.timeline();
      
      brandTl.to([ringsRef.current, statusRef.current], {
        opacity: 0,
        y: -30,
        scale: 0.9,
        duration: 0.8,
        ease: "power2.inOut",
        onStart: () => clearInterval(statusInterval)
      });

      brandTl.fromTo(logoRef.current,
        { opacity: 0, y: 30, scale: 0.8, filter: "blur(10px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out" },
        "+=0.2"
      );

      brandTl.fromTo(".loader-title-line",
        { opacity: 0, y: 50, skewY: 5, filter: "blur(8px)" },
        { opacity: 1, y: 0, skewY: 0, filter: "blur(0px)", duration: 1.2, stagger: 0.15, ease: "power4.out" },
        "-=0.8"
      );

      brandTl.fromTo(taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.5"
      );

      mainTl.add(brandTl, 2.5);

      // Phase 2: Open curtains
      const exitTl = gsap.timeline();
      
      exitTl.to(contentRef.current, {
        opacity: 0,
        scale: 1.05,
        filter: "blur(20px)",
        duration: 0.8,
        ease: "power3.in"
      });

      exitTl.to(curtainTopRef.current, {
        y: "-100%",
        duration: 1.4,
        ease: "power4.inOut"
      }, 0.2);

      exitTl.to(curtainBotRef.current, {
        y: "100%",
        duration: 1.4,
        ease: "power4.inOut"
      }, 0.2);

      exitTl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4
      }, "-=0.2");

      mainTl.add(exitTl, 5.5);

    }, overlayRef.current);

    return () => {
      ctx.revert();
      clearTimeout(safetyTimer);
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  return (
    <div ref={overlayRef} className="loader-overlay">
      <div ref={curtainTopRef} className="loader-curtain top" />
      <div ref={curtainBotRef} className="loader-curtain bottom" />
      
      <div className="loader-grid" />
      <div className="loader-scanline" />
      <div ref={frameRef} className="loader-frame" style={{ opacity: 0 }}>
         <div className="loader-frame-corner tl" />
         <div className="loader-frame-corner tr" />
         <div className="loader-frame-corner bl" />
         <div className="loader-frame-corner br" />
      </div>

      <div ref={contentRef} className="loader-content">
        <div ref={ringsRef} className="loader-rings" style={{ position: "absolute", opacity: 0 }}>
          <div className="loader-orbit loader-orbit-one" />
          <div className="loader-orbit loader-orbit-two" />
          <div className="loader-center-dot" />
          <div className="loader-pulse-core" />
        </div>

        <div ref={statusRef} className="loader-status-wrap" style={{ position: "absolute", bottom: "16%", opacity: 0 }}>
          <span className="loader-status-label">INITIALIZING</span>
          <span className="loader-status">{STATUS_WORDS[statusIndex]}</span>
        </div>

        <div className="loader-brand">
          <img ref={logoRef} src="/logo.png" alt="DevDuo Logo" className="loader-brand-logo" style={{ opacity: 0 }} />
          <div className="loader-title-mask">
            <h1 ref={titleRef} className="loader-brand-title">
              <span className="loader-title-line">DEV</span>
              <span className="loader-title-line accent">DUO</span>
            </h1>
          </div>
          <p ref={taglineRef} className="loader-tagline" style={{ opacity: 0 }}>
            ENGINEERING THE EXTRAORDINARY
          </p>
        </div>
      </div>

      <div className="loader-vignette" />
    </div>
  );
}
