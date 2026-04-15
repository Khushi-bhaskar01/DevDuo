import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function DynamicBackground({ mode = "about" }) {
  const containerRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Base floating animation
      gsap.to([blob1Ref.current, blob2Ref.current, blob3Ref.current], {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        duration: "random(10, 20)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 2,
          from: "random",
        },
      });

      if (mode === "about") {
        // Simple static gradient for About/Services
        gsap.set(containerRef.current, {
          background: "radial-gradient(circle at 50% 50%, #1a1a2e 0%, #050505 100%)",
        });
      } else if (mode === "projects") {
        // Different behavior for Projects
        gsap.to(containerRef.current, {
           background: "radial-gradient(circle at 50% 50%, #0a0a0a 0%, #000000 100%)",
        });
        
        // Warped Grid effect or similar could go here
      }
    }, containerRef);

    return () => ctx.revert();
  }, [mode]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        overflow: "hidden",
        background: "var(--color-bg)",
        pointerEvents: "none",
      }}
    >
      {/* Mesh/Filter Grain */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />

      <div
        ref={blob1Ref}
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background: mode === "about" ? "rgba(239, 93, 71, 0.08)" : "rgba(255, 255, 255, 0.03)",
          filter: "blur(120px)",
        }}
      />
      <div
        ref={blob2Ref}
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: mode === "about" ? "rgba(100, 140, 255, 0.06)" : "rgba(239, 93, 71, 0.05)",
          filter: "blur(140px)",
        }}
      />
      <div
        ref={blob3Ref}
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: mode === "about" ? "rgba(255, 255, 255, 0.04)" : "rgba(100, 100, 100, 0.04)",
          filter: "blur(100px)",
        }}
      />
      
      {mode === "projects" && (
        <div 
          className="projects-grid-overlay"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(circle at center, black, transparent 80%)",
          }}
        />
      )}
    </div>
  );
}
