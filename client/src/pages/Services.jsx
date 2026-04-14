import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Web Development",
    desc: "We craft blazing-fast, responsive, and visually stunning web applications using modern frameworks like React, Next.js, and Vue. From landing pages to full-scale SaaS platforms — we deliver pixel-perfect experiences.",
    tags: ["REACT", "NEXT.JS", "NODE.JS", "VITE", "GSAP", "TAILWIND"],
  },
  {
    number: "02",
    title: "App Development",
    desc: "Cross-platform mobile applications built with React Native, Flutter, and Kotlin. We engineer seamless native experiences for both iOS and Android, with real-time data sync and offline-first architecture.",
    tags: ["REACT NATIVE", "FLUTTER", "KOTLIN", "FIREBASE", "EXPO"],
  },
  {
    number: "03",
    title: "Game Development",
    desc: "Immersive gaming experiences crafted with Unity, Godot, and Unreal Engine. From 2D indie games to 3D multiplayer environments, we push creative boundaries with every build.",
    tags: ["UNITY", "GODOT", "UNREAL", "C#", "BLENDER", "SHADER"],
  },
  {
    number: "04",
    title: "UI/UX Design",
    desc: "Research-driven design that converts. We create intuitive interfaces, comprehensive design systems, and interactive prototypes that delight users and drive engagement.",
    tags: ["FIGMA", "ADOBE XD", "PROTOTYPING", "DESIGN SYSTEMS", "A/B TESTING"],
  },
  {
    number: "05",
    title: "Open Source",
    desc: "Contributing to the global developer ecosystem. We maintain and contribute to open source projects, build developer tools, and create libraries that simplify complex workflows.",
    tags: ["GITHUB", "NPM", "CI/CD", "DOCKER", "DOCUMENTATION"],
  },
  {
    number: "06",
    title: "DevOps & Cloud",
    desc: "Scalable infrastructure and seamless deployment pipelines. From containerized microservices to serverless architectures, we ensure your code ships fast and stays reliable.",
    tags: ["AWS", "DOCKER", "KUBERNETES", "VERCEL", "NGINX", "MONITORING"],
  },
];

export default function Services() {
  const pageRef = useRef(null);
  const heroLabelRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const serviceRefs = useRef([]);

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

      // Service items stagger
      serviceRefs.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: 50, x: -20 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
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
            / CAPABILITIES
          </span>
          <h1
            ref={heroTitleRef}
            className="section-title"
            style={{ opacity: 0, marginBottom: 32 }}
          >
            OUR <span className="muted">SERVICES</span>.
          </h1>
          <p
            ref={heroDescRef}
            className="text-body"
            style={{ opacity: 0, fontSize: 17 }}
          >
            From concept to deployment, we offer end-to-end development services
            across multiple domains. Every solution is engineered for performance,
            scalability, and visual excellence.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="services-grid">
        <div className="container">
          {services.map((service, idx) => (
            <div
              key={service.number}
              ref={(el) => (serviceRefs.current[idx] = el)}
              className="service-item"
            >
              <span className="service-number">{service.number}</span>
              <h3 className="service-title">{service.title}</h3>
              <div className="service-details">
                <p className="service-desc">{service.desc}</p>
                <div className="service-tags">
                  {service.tags.map((tag) => (
                    <span key={tag} className="service-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
