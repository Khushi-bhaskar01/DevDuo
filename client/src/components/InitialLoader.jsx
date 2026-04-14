import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";



export default function InitialLoader({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const overlayRef = useRef(null);
  const curtainTopRef = useRef(null);
  const curtainBotRef = useRef(null);
  const spinnerRef = useRef(null);
  const statusRef = useRef(null);
  const brandRef = useRef(null);
  const preTextRef = useRef(null);
  const iconRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1500);
    const t2 = setTimeout(() => setPhase(2), 5000);
    const t3 = setTimeout(() => onComplete(), 6500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  // Phase 0: Spinner entrance
  useEffect(() => {
    if (phase === 0 && spinnerRef.current && statusRef.current) {
      gsap.fromTo(
        spinnerRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        statusRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 }
      );
    }
  }, [phase]);

  // Phase 1: Brand reveal with duo icon animation
  useEffect(() => {
    if (phase === 1) {
      // Fade out spinner
      if (spinnerRef.current) {
        gsap.to(spinnerRef.current, { opacity: 0, scale: 1.1, duration: 0.5 });
      }
      if (statusRef.current) {
        gsap.to(statusRef.current, { opacity: 0, duration: 0.5 });
      }

      // Animate brand in
      const tl = gsap.timeline({ delay: 0.6 });

      if (preTextRef.current) {
        tl.fromTo(
          preTextRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          0
        );
      }

      // Logo pop in with glow
      if (iconRef.current) {
        tl.fromTo(
          iconRef.current,
          { opacity: 0, scale: 0.7, filter: "blur(10px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out" },
          0.2
        );
        // Pulse glow effect
        tl.to(
          iconRef.current,
          { filter: "drop-shadow(0 0 40px rgba(239,93,71,0.6))", duration: 0.6, yoyo: true, repeat: 1, ease: "power2.inOut" },
          1.2
        );
      }

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: "100%", filter: "blur(10px)" },
          { opacity: 1, y: "0%", filter: "blur(0px)", duration: 1.2, ease: "power4.out" },
          0.8
        );
      }

      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          { opacity: 0, y: 10 },
          { opacity: 0.5, y: 0, duration: 1, ease: "power3.out" },
          1.4
        );
      }
    }
  }, [phase]);

  // Phase 2: Curtains opening
  useEffect(() => {
    if (phase === 2) {
      const tl = gsap.timeline();

      if (brandRef.current) {
        tl.to(brandRef.current, { opacity: 0, scale: 1.3, filter: "blur(15px)", duration: 0.8 }, 0);
      }

      if (curtainTopRef.current) {
        tl.to(curtainTopRef.current, {
          y: "-100%",
          duration: 1.2,
          ease: "power4.inOut",
        }, 0.2);
      }

      if (curtainBotRef.current) {
        tl.to(curtainBotRef.current, {
          y: "100%",
          duration: 1.2,
          ease: "power4.inOut",
        }, 0.2);
      }
    }
  }, [phase]);

  return (
    <div ref={overlayRef} className="loader-overlay">
      {/* Curtains */}
      <div ref={curtainTopRef} className="loader-curtain top" />
      <div ref={curtainBotRef} className="loader-curtain bottom" />

      <div className="loader-content" ref={brandRef}>
        {/* Phase 0: Spinner */}
        {phase === 0 && (
          <>
            <div ref={spinnerRef} className="loader-spinner" />
            <span ref={statusRef} className="loader-status">
              SYNCING_PARTNERS
            </span>
          </>
        )}

        {/* Phase 1: Brand */}
        {phase >= 1 && (
          <div className="loader-brand">
            <span ref={preTextRef} className="loader-brand-pre" style={{ opacity: 0 }}>
              WELCOME TO
            </span>
            <div ref={iconRef} style={{ opacity: 0, margin: "24px 0" }}>
              <img
                src="/logo.png"
                alt="DevDuo"
                className="loader-brand-logo"
              />
            </div>
            <div style={{ overflow: "hidden" }}>
              <h1 ref={titleRef} className="loader-brand-title" style={{ opacity: 0 }}>
                DEV<span className="accent">DUO</span>
              </h1>
            </div>
            <span ref={taglineRef} className="loader-tagline" style={{ opacity: 0 }}>
              TWO MINDS · ONE VISION
            </span>
          </div>
        )}
      </div>

      {/* Vignette */}
      <div className="loader-vignette" />
    </div>
  );
}
