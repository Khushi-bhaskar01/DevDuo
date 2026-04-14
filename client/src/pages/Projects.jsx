import React, { useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HARDCODED_PROJECTS = [
  {
    _id: "p1",
    title: "DevDuo Portfolio",
    members: ["Adarsh Tiwari", "Khushi Bhaskar"],
    deployedLink: "https://dev-source-portfolio.vercel.app/",
    domain: "Web Development",
    description:
      "Our flagship portfolio — a showcase of everything we've built as a duo. Dynamic content, premium animations, and an identity that speaks for itself.",
    tags: ["GSAP", "React", "Vite"],
    image: "/portfolio.png",
  },
  {
    _id: "p2",
    title: "ICPC Website",
    members: ["Adarsh Tiwari", "Khushi Bhaskar"],
    deployedLink: "https://www.icpcusict.dev/",
    domain: "Web Development",
    description:
      "Official Website of ICPC USICT ACM Student Chapter — Competitive Programming Portal with problem archives, live contest updates, member profiles and leaderboard.",
    tags: ["Next.js", "Node.js"],
    image: "/icpc.png",
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
      "Community-driven platform showcasing the beloved dogs of IPU campus — featuring photos, adoption, events and heartwarming stories contributed by students.",
    tags: ["Next.js", "Supabase"],
    image: "/doggos.png",
  },
];

const N = HARDCODED_PROJECTS.length;

export default function Projects() {
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;

      // Travel distance = full track width minus one viewport
      const travelDist = () => track.scrollWidth - window.innerWidth;

      // ── Hero entrance ──────────────────────────────────────
      gsap.from(".pw-hero-label", {
        opacity: 0,
        x: -20,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(".pw-hero-title", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        delay: 0.35,
      });
      gsap.from(".pw-hero-hint", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.65,
      });

      // ── GSAP horizontal scroll ─────────────────────────────
      const hst = gsap.to(track, {
        x: () => -travelDist(),
        ease: "power1.out",
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top top",
          end: () => `+=${travelDist() * 2}`,
          scrub: 1.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ── Per-card content reveal ────────────────────────────
      track.querySelectorAll(".pw-card-body").forEach((body, i) => {
        if (i === 0) return;
        gsap.from(body, {
          opacity: 0,
          x: 50,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            containerAnimation: hst,
            trigger: body.closest(".pw-card"),
            start: "left 85%",
            toggleActions: "play none none none",
          },
        });
      });

      ScrollTrigger.refresh();

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div style={{ background: "#000", color: "#fff", fontFamily: "var(--font-inter, sans-serif)" }}>
        <Navbar />

        {/* ── HERO ── */}
        <section
          ref={heroRef}
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

          <h1
            className="pw-hero-title"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(72px,16vw,180px)",
              fontWeight: 900,
              textTransform: "uppercase",
              lineHeight: 0.82,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            PROJECT{" "}
            <span style={{ color: "rgba(255,255,255,0.14)" }}>WALL</span>.
          </h1>

          <div className="pw-hero-hint projects-hint">
            <div className="line" />
            <span>SCROLL DOWN TO EXPLORE ALL PROJECTS</span>
          </div>
        </section>

        {/* ── PINNED HORIZONTAL SECTION ── */}
        <div ref={outerRef} className="projects-pinned">
          <div
            ref={trackRef}
            className="projects-track"
            style={{ width: `${N * 100}vw` }}
          >
            {HARDCODED_PROJECTS.map((project, idx) => (
              <div key={project._id} className="pw-card project-card">
                {/* Image */}
                <div className="project-card-image">
                  <div
                    className="bg-img"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="big-number">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Content */}
                <div className="pw-card-body project-card-body">
                  <div>
                    <p className="project-domain">{project.domain}</p>
                    <h2 className="project-title">{project.title}</h2>
                    <div className="project-divider" />
                    <p className="project-desc">{project.description}</p>

                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    {/* Contributors header */}
                    <div className="project-contributors-header">
                      <span>Contributors</span>
                      <div className="line" />
                      <span className="count">
                        {project.members.length} members
                      </span>
                    </div>

                    {/* Member chips */}
                    <div className="project-members">
                      {project.members.map((name) => (
                        <span key={name} className="project-member">
                          {name}
                        </span>
                      ))}
                    </div>

                    {/* View link */}
                    <div className="project-footer">
                      <a
                        href={project.deployedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        VIEW PROJECT <span style={{ fontSize: 15 }}>→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
