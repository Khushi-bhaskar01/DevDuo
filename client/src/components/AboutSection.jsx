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
  { number: "2", label: "Founders" },
  { number: "10+", label: "Projects Shipped" },
  { number: "4", label: "Domains" },
  { number: "∞", label: "Ambition" },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef([]);
  const tagsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label entrance
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: labelRef.current,
            start: "top 85%",
          },
        }
      );

      // Title entrance
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      // Description
      gsap.fromTo(
        descRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 85%",
          },
        }
      );

      // Cards stagger
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
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

      // Stats counter animation
      statsRef.current.forEach((stat, i) => {
        if (!stat) return;
        gsap.fromTo(
          stat,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
            },
          }
        );
      });

      // Tags
      if (tagsRef.current) {
        gsap.fromTo(
          tagsRef.current,
          { opacity: 0 },
          {
            opacity: 0.35,
            duration: 1,
            scrollTrigger: {
              trigger: tagsRef.current,
              start: "top 90%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about premium-grid">
      <div className="container">
        {/* Header */}
        <div className="about-header">
          <div>
            <span ref={labelRef} className="section-label" style={{ opacity: 0 }}>
              / WHAT WE DO
            </span>
            <h2 ref={titleRef} className="section-title" style={{ opacity: 0 }}>
              PAIRED <span className="muted">FOR</span> IMPACT.
            </h2>
          </div>
          <p ref={descRef} className="text-body" style={{ opacity: 0 }}>
            DevDuo operates at the intersection of design and engineering. Together, 
            we tackle challenges that require both creative vision and technical depth.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="about-grid">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="about-card"
              style={{ opacity: 0 }}
            >
              <span className="about-card-id">{cat.id} //</span>
              <h3>{cat.title}</h3>
              <p>{cat.detail}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="about-stats">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              ref={(el) => (statsRef.current[idx] = el)}
              className="about-stat"
              style={{ opacity: 0 }}
            >
              <div className="about-stat-number">{stat.number}</div>
              <div className="about-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Brand Tags */}
        <div ref={tagsRef} className="about-brand-tags" style={{ opacity: 0 }}>
          {["PARTNERSHIP", "INNOVATION", "DEPLOYMENT", "EXCELLENCE"].map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="about-blob" />
    </section>
  );
}