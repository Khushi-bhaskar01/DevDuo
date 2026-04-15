import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: "01", title: "WEB", detail: "HIGH-PERFORMANCE INTERFACES & FULLSTACK SYSTEMS" },
  { id: "02", title: "APP", detail: "CROSS-PLATFORM MOBILE ENGINEERING" },
  { id: "03", title: "GAME", detail: "IMMERSIVE VIRTUAL EXPERIENCES" },
  { id: "04", title: "CORE", detail: "OPEN SOURCE & INFRASTRUCTURE" },
];

const stats = [
  { number: "02", label: "FOUNDERS" },
  { number: "5+", label: "SHIPPED" },
  { number: "04", label: "DOMAINS" },
  { number: "∞", label: "PASSION" },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal animation
      gsap.fromTo(
        ".reveal-char",
        { y: 100, rotateX: -90, opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.05,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse"
          },
        }
      );

      // Marquee animation
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });

      // Cards parallax
      gsap.fromTo(
        ".about-card",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-grid",
            start: "top 85%",
            toggleActions: "play reverse play reverse"
          },
        }
      );

      // Stats stagger
      gsap.fromTo(
        ".about-stat",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".about-stats",
            start: "top 90%",
            toggleActions: "play reverse play reverse"
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about">
      <div className="container">
        <div className="about-header">
          <div>
            <span className="section-label">/ OUR APPROACH</span>
            <h2 ref={titleRef} className="section-title" style={{ perspective: "1000px" }}>
              {["PAIRED", "FOR", "IMPACT."].map((word, i) => (
                <span key={i} className="text-reveal">
                  {word.split("").map((char, j) => (
                    <span key={j} className="reveal-char">{char}</span>
                  ))}
                  <span className="reveal-char">&nbsp;</span>
                </span>
              ))}
            </h2>
          </div>
          <p className="text-body" style={{ fontSize: "20px", color: "var(--color-white)", maxWidth: "600px" }}>
            DevDuo is an elite collaboration of two specialists who believe in 
            the power of focus. We don't scale with people; we scale with 
            intelligence and craftsmanship.
          </p>
        </div>

        <div className="about-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="about-card interactive">
              <span className="about-card-id">{cat.id} //</span>
              <h3>{cat.title}</h3>
              <p>{cat.detail}</p>
            </div>
          ))}
        </div>

        <div className="about-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="about-stat">
              <div className="about-stat-number">{stat.number}</div>
              <div className="about-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Marquee */}
      <div className="marquee-wrapper">
        <div ref={marqueeRef} className="marquee-content">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="marquee-text">
              DEVDUO • DIGITAL CRAFT • TWO MINDS • ONE VISION • 2024 •&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="about-blob" />
    </section>
  );
}