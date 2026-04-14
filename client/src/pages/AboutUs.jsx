import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import TeamSection from "../components/TeamSection";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: "🤝",
    title: "Partnership First",
    desc: "Every breakthrough begins with the right pairing. We believe two perspectives are always stronger than one.",
  },
  {
    icon: "🚀",
    title: "Ship & Deploy",
    desc: "Ideas are worthless until they're live. We move fast, iterate hard, and push to production relentlessly.",
  },
  {
    icon: "🎯",
    title: "Impact Driven",
    desc: "We don't build for the sake of building. Every project solves a real problem and serves real users.",
  },
  {
    icon: "♾️",
    title: "Grow Together",
    desc: "When one learns, both level up. Continuous growth is woven into every code review and every deploy.",
  },
];

export default function AboutUs() {
  const pageRef = useRef(null);
  const heroLabelRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const missionTitleRef = useRef(null);
  const missionTextRef = useRef(null);
  const missionText2Ref = useRef(null);
  const valuesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        heroLabelRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          heroTitleRef.current,
          { opacity: 0, y: 80, filter: "blur(12px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power4.out" },
          "-=0.4"
        )
        .fromTo(
          heroDescRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );

      // Mission section
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
          },
        }
      );

      gsap.fromTo(
        missionTextRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: missionTextRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        missionText2Ref.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: missionText2Ref.current,
            start: "top 90%",
          },
        }
      );

      // Value cards
      valuesRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      <Navbar />

      {/* Page Hero */}
      <section className="services-hero" style={{ paddingTop: 120 }}>
        <div className="container">
          <span
            ref={heroLabelRef}
            className="section-label"
            style={{ opacity: 0 }}
          >
            / ABOUT US
          </span>
          <h1
            ref={heroTitleRef}
            className="section-title"
            style={{ opacity: 0, marginBottom: 32 }}
          >
            THE <span className="muted">STORY</span> BEHIND THE DUO.
          </h1>
          <p
            ref={heroDescRef}
            className="text-body"
            style={{ opacity: 0, fontSize: 17 }}
          >
            DevDuo was born from a simple belief: the best work happens when two 
            sharp minds collaborate without ego. We are builders, thinkers, and 
            partners shaping the future of tech, one deploy at a time.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="about-page-mission">
        <div className="container">
          <div className="about-page-mission-grid">
            <div className="about-page-mission-text">
              <h3
                ref={missionTitleRef}
                style={{ opacity: 0 }}
              >
                OUR PHILOSOPHY
              </h3>
              <p
                ref={missionTextRef}
                style={{ opacity: 0 }}
              >
                Great things are built in pairs. From the Wright brothers to 
                Wozniak & Jobs — every revolution had a duo at its core. We carry 
                that same energy into every line of code we write.
              </p>
              <p
                ref={missionText2Ref}
                style={{ opacity: 0 }}
              >
                From ideation to deployment, every project at DevDuo is a shared 
                journey. We challenge each other, complement each other's strengths, 
                and never ship anything less than exceptional.
              </p>
            </div>

            <div className="about-page-values">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  ref={(el) => (valuesRef.current[i] = el)}
                  className="about-page-value-card"
                >
                  <div className="icon">{v.icon}</div>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      <Footer />
    </div>
  );
}
