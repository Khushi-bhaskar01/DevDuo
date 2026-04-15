import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import TeamSection from "../components/TeamSection";
import Footer from "../components/Footer";
import DynamicBackground from "../components/DynamicBackground";

gsap.registerPlugin(ScrollTrigger);

const philosophyLines = [
  "From the Wright brothers onward, the strongest breakthroughs have been built in pairs.",
  "Every idea gets challenged, sharpened, and elevated together.",
  "That is how DevDuo ships work that feels clear, fast, and finished.",
];

export default function AboutUs() {
  const pageRef = useRef(null);
  const heroLabelRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const missionTitleRef = useRef(null);
  const philosophySectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        delay: 0.2,
        scrollTrigger: {
          trigger: heroTitleRef.current,
          start: "top 90%",
          toggleActions: "play reverse play reverse"
        }
      });

      tl.fromTo(
        heroLabelRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          heroTitleRef.current,
          { opacity: 0, y: 80, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.4"
        )
        .fromTo(
          heroDescRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );

      gsap.fromTo(
        missionTitleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: missionTitleRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
          },
        }
      );

      gsap.fromTo(
        ".about-page-philosophy-panel",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: philosophySectionRef.current,
            start: "top 78%",
            toggleActions: "play reverse play reverse"
          },
        }
      );

      gsap.fromTo(
        ".about-page-philosophy-line",
        {
          opacity: 0.18,
          yPercent: 24,
          clipPath: "inset(0% 0% 100% 0%)",
        },
        {
          opacity: 1,
          yPercent: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: philosophySectionRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
          },
        }
      );

      ScrollTrigger.refresh();
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      style={{ position: "relative", zIndex: 1, overflow: "hidden" }}
    >
      <DynamicBackground mode="about" />
      <Navbar />

      <section className="services-hero" style={{ paddingTop: 120 }}>
        <div className="container">
          <span ref={heroLabelRef} className="section-label" style={{ opacity: 0 }}>
            / ABOUT US
          </span>
          <h1
            ref={heroTitleRef}
            className="section-title"
            style={{
              opacity: 0,
              marginBottom: 24,
              fontSize: "clamp(48px, 10vw, 100px)",
            }}
          >
            OUR JOURNEY <span className="muted">&bull;</span> THE DEVDUO
          </h1>
          <p
            ref={heroDescRef}
            className="text-body"
            style={{ opacity: 0, fontSize: "20px", color: "var(--color-white)", maxWidth: "600px" }}
          >
            DevDuo started with a simple belief - great work comes from clear thinking and strong collaboration. 
            We build, learn, and grow together, shaping ideas into real-world solutions.
          </p>
        </div>
      </section>

      <section ref={philosophySectionRef} className="about-page-mission">
        <div className="container">
          <div className="about-page-mission-grid about-page-mission-grid-compact">
            <div className="about-page-mission-text">
              <h3 ref={missionTitleRef} style={{ opacity: 0 }}>
                OUR PHILOSOPHY
              </h3>
            </div>

            <div className="about-page-philosophy-panel about-page-philosophy-panel-compact">
              <span className="about-page-philosophy-kicker">Shared process</span>
              <div className="about-page-philosophy-lines">
                {philosophyLines.map((line, index) => (
                  <p key={line} className="about-page-philosophy-line">
                    <span className="about-page-line-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="about-page-line-words">{line}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TeamSection />

      <Footer />
    </div>
  );
}
