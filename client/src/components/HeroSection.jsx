import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleLine1 = useRef(null);
  const titleLine2 = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const indexRef = useRef(null);
  const duoSymbolRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D Tilt Effect
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;

        gsap.to(contentRef.current, {
          rotateY: xPos,
          rotateX: -yPos,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Animation Timeline
      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo(
        indexRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Animate title
      tl.fromTo(
        ".hero-title",
        { y: 40, opacity: 0, filter: "blur(10px)" },
        { 
          y: 0, 
          opacity: 1, 
          filter: "blur(0px)",
          duration: 1.2, 
          ease: "power4.out" 
        },
        "-=0.6"
      );

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=1"
      );

      tl.fromTo(
         ".hero-center-tag",
         { opacity: 0, scale: 0.9 },
         { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
         "-=0.5"
      );

      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.8"
      );

      // Duo symbol floating
      gsap.to(duoSymbolRef.current, {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="hero">
      <div className="container hero-content" ref={contentRef} style={{ transformStyle: "preserve-3d" }}>
        {/* Index Label */}
        <div ref={indexRef} className="hero-index" style={{ marginBottom: "20px" }}>
          <span className="label">CRAFTING &bull; DIGITAL &bull; EXCELLENCE</span>
          <div className="line" />
          <span className="year">2025 ED.</span>
        </div>

        {/* Main Title with Reveal Mechanism */}
        {/* Main Title */}
        <h1 className="hero-title" style={{ fontSize: "clamp(42px, 8vw, 100px)", marginBottom: "24px" }}>
          Focused on Building <span className="muted">·</span>
          <br />
          <span style={{ display: "inline-flex", alignItems: "center", gap: "16px" }}>
            What<span className="accent-text">Matters.</span>
          </span>
        </h1>

        <div className="hero-center-tag" style={{ 
          margin: "0 0 24px",
          display: "flex",
          justifyContent: "center",
          opacity: 0
        }}>
          <span style={{
            fontSize: "10px",
            fontWeight: "900",
            textTransform: "uppercase",
            letterSpacing: "0.4em",
            color: "var(--color-white)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "6px 20px",
            borderRadius: "100px",
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(12px)"
          }}>
            FUTURE READY &bull; DUO DRIVEN
          </span>
        </div>

        {/* Subtitle */}
        <p ref={subtitleRef} className="hero-subtitle" style={{ fontSize: "18px", marginBottom: "32px", maxWidth: "500px" }}>
          We build scalable, high-impact digital experiences with precision and purpose
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="hero-cta">
          <button
            className="btn-primary interactive"
            onClick={() => navigate("/projects")}
          >
            <span>DISCOVER OUR WORK</span>
            <span style={{ fontSize: 16 }}>→</span>
          </button>
          <button
            className="btn-secondary interactive"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="ping-dot" style={{ width: 8, height: 8 }} />
            MEET THE DUO
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="hero-corner tl" />
      <div className="hero-corner tr" />
      <div className="hero-corner bl" />
      <div className="hero-corner br" />

      <div className="premium-grid" style={{ position: "absolute", inset: 0, opacity: 0.1, zIndex: -1 }} />
    </section>
  );
}
