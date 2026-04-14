import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const blobRef = useRef(null);
  const blob2Ref = useRef(null);
  const indexRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const duoSymbolRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax dual blobs (the duo)
      gsap.to(blobRef.current, {
        y: 200,
        x: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(blob2Ref.current, {
        y: 150,
        x: 50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Hero entrance timeline
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        indexRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 80, filter: "blur(12px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.4, ease: "power4.out" },
          "-=0.6"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
          "-=0.5"
        );

      // Duo symbol — gentle floating animation
      if (duoSymbolRef.current) {
        gsap.to(duoSymbolRef.current, {
          y: -10,
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Floating corner decorations
      gsap.to(".hero-corner", {
        opacity: 0.3,
        duration: 2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="hero">
      {/* Dual blobs — representing the duo */}
      <div ref={blobRef} className="hero-blob hero-blob-left" />
      <div ref={blob2Ref} className="hero-blob hero-blob-right" />

      <div className="container hero-content">
        {/* Index Label */}
        <div ref={indexRef} className="hero-index">
          <span className="label">DEVDUO — COLLECTIVE</span>
          <div className="line" />
          <span className="year">EST. 2024</span>
        </div>

        {/* Main Title */}
        <h1 ref={titleRef} className="hero-title">
          TWO MINDS <span className="muted">·</span>
          <br />
          <span style={{ display: "inline-flex", alignItems: "center", gap: "16px" }}>
            ONE <span className="accent-text">VISION</span>
            <span ref={duoSymbolRef} className="accent-ring">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="14" cy="20" r="10" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.8" />
                <circle cx="26" cy="20" r="10" stroke="white" strokeWidth="1.5" opacity="0.5" />
              </svg>
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="hero-subtitle">
          We are DevDuo — a partnership-driven development collective that turns 
          bold ideas into production-grade realities. Where two perspectives converge, 
          extraordinary things happen.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="hero-cta">
          <button
            className="btn-primary"
            onClick={() => (window.location.href = "/projects")}
          >
            <span>EXPLORE PROJECTS</span>
            <span style={{ fontSize: 16 }}>→</span>
          </button>
          <button
            className="btn-secondary"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--color-accent)",
                display: "inline-block",
              }}
            />
            MEET THE DUO
          </button>
        </div>
      </div>

      {/* Decorative corners */}
      <div className="hero-corner tl" />
      <div className="hero-corner tr" />
      <div className="hero-corner bl" />
      <div className="hero-corner br" />
    </section>
  );
}