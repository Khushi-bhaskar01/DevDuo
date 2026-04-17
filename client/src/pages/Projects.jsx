import React, { useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HARDCODED_PROJECTS = [
  {
    _id: "p1",
    title: "The Voice of Glaciers",
    members: ["Adarsh Tiwari"],
    deployedLink: "https://thevoiceofglaciers.org/",
    domain: "Web Development",
    description:
      "A non-profit organization dedicated to raising awareness about the impact of climate change on glaciers and their surrounding ecosystems.",
    tags: ["GSAP", "TailwindCSS", "Next.js"],
    image: "/voice.png",
  },
  {
    _id: "p2",
    title: "Policy Perspective Foundation",
    members: ["Adarsh Tiwari", "Khushi Bhaskar"],
    deployedLink: "https://ppf-website-pink.vercel.app/",
    domain: "Web Development",
    description:
      "STILL UNDER DEVELOPMENT - Official website of Policy Perspectives Foundation (PPF), an independent think-tank shaping the 21st century through deep-dive analysis and socio-economic insights.",
    tags: ["Next.js", "TailwindCSS"],
    image: "/ppf.png",
  },
  {
    _id: "p3",
    title: "LearnCSWithArshi",
    members: ["Khushi Bhaskar"],
    deployedLink: "https://learncswitharshi.com/",
    domain: "Web Development",
    description:
      "Educational platform with video tutorials and notes for learning computer science, featuring payment gateway integration for premium content access.",
    tags: ["Next.js", "Firebase"],
    image: "/learn.png",
  },
  {
    _id: "p4",
    title: "Doggos of IPU",
    members: ["Adarsh Tiwari", "Khushi Bhaskar"],
    deployedLink: "https://doggos-of-ipu.vercel.app/",
    domain: "Web Development",
    description:
      "Community-driven platform showcasing the beloved dogs of IPU campus - featuring photos, adoption, events and heartwarming stories contributed by students.",
    tags: ["Next.js", "Supabase"],
    image: "/doggos.png",
  },
   {
    _id: "p5",
    title: "ICPC USICT ACM Student Chapter",
    members: ["Adarsh Tiwari", "Khushi Bhaskar"],
    deployedLink: "https://www.icpcusict.dev/",
    domain: "Web Development",
    description:
      "Official website of ICPC USICT ACM Student Chapter - competitive programming portal with problem archives, live contest updates, member profiles and leaderboard.",
    tags: ["Next.js", "Supabase"],
    image: "/icpc.png",
  },
];

export default function Projects() {
  const pageRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pw-hero-label", {
        opacity: 0,
        x: -24,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".pw-hero-title-line", {
        opacity: 0,
        yPercent: 100,
        duration: 1.1,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.3,
      });

      gsap.from(".pw-hero-hint", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.8,
      });

      cardsRef.current.forEach((card, idx) => {
        if (!card) return;

        const image = card.querySelector(".bg-img");
        const body = card.querySelector(".project-card-body");
        const number = card.querySelector(".big-number");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
          },
        });

        tl.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power4.out",
          }
        )
        .fromTo(
          image,
          { scale: 1.15 },
          {
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
          },
          "-=1"
        )
        .fromTo(
          [body, number],
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.9"
        );
      });

      ScrollTrigger.refresh();
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      style={{
        background: "#000",
        color: "#fff",
        fontFamily: "var(--font-inter, sans-serif)",
      }}
    >
      <Navbar />

      <section
        className="projects-hero"
        style={{ padding: "0 clamp(24px,5vw,64px) clamp(48px,8vh,80px)" }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "rgba(255,255,255,0.06)",
          }}
        />

        <p className="pw-hero-label text-micro" style={{ marginBottom: 24 }}>
          / REPOSITORY
        </p>

        <h1 className="pw-hero-title">
          <span className="pw-hero-title-line">PROJECT</span>
          <span className="pw-hero-title-line muted">WALL.</span>
        </h1>

        <div className="pw-hero-hint projects-hint">
          <div className="line" />
          <span>SCROLL DOWN TO EXPLORE THE WORK</span>
        </div>
      </section>

      <section className="projects-stack">
        <div className="projects-wall-kicker">
          <span>Selected builds</span>
          <span>{HARDCODED_PROJECTS.length} live stories</span>
        </div>

        <div className="projects-grid-list">
          {HARDCODED_PROJECTS.map((project, idx) => (
            <div key={project._id} className="project-grid-item">
              <ProjectCard 
                ref={(el) => (cardsRef.current[idx] = el)}
                project={project}
                index={idx}
                isMobile={window.matchMedia("(max-width: 768px)").matches}
              />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
