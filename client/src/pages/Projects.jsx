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
      "Our flagship portfolio - a showcase of everything we've built as a duo. Dynamic content, premium animations, and an identity that speaks for itself.",
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
      "Official website of ICPC USICT ACM Student Chapter - competitive programming portal with problem archives, live contest updates, member profiles and leaderboard.",
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
      "Community-driven platform showcasing the beloved dogs of IPU campus - featuring photos, adoption, events and heartwarming stories contributed by students.",
    tags: ["Next.js", "Supabase"],
    image: "/doggos.png",
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
        const chips = card.querySelectorAll(".project-tag, .project-member");
        const nextCard = cardsRef.current[idx + 1];
        const stackItem = card.closest(".project-stack-item");
        const nextStackItem = nextCard?.closest(".project-stack-item");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stackItem || card,
            start: "top 82%",
          },
        });

        tl.fromTo(
          card,
          {
            opacity: 0,
            y: 90,
            rotate: idx % 2 === 0 ? -1.8 : 1.8,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 1.1,
            ease: "power4.out",
          }
        )
          .fromTo(
            image,
            { scale: 1.14 },
            {
              scale: 1,
              duration: 1.25,
              ease: "power3.out",
            },
            "-=0.95"
          )
          .fromTo(
            [body, number],
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.08,
              ease: "power3.out",
            },
            "-=0.8"
          )
          .fromTo(
            chips,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              stagger: 0.03,
              ease: "power2.out",
            },
            "-=0.3"
          );

        gsap.to(image, {
          yPercent: idx % 2 === 0 ? -8 : -5,
          ease: "none",
          scrollTrigger: {
            trigger: stackItem || card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        if (nextCard && nextStackItem && window.matchMedia("(min-width: 768px)").matches) {
          gsap.to(card, {
            scale: 0.94,
            opacity: 0.72,
            ease: "none",
            scrollTrigger: {
              trigger: nextStackItem,
              start: "top 78%",
              end: "top 28%",
              scrub: true,
            },
          });

          gsap.to(body, {
            y: -18,
            ease: "none",
            scrollTrigger: {
              trigger: nextStackItem,
              start: "top 78%",
              end: "top 28%",
              scrub: true,
            },
          });
        }
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
          <span>SCROLL DOWN TO EXPLORE THE STACK</span>
        </div>
      </section>

      <section className="projects-stack">
        <div className="projects-wall-kicker">
          <span>Selected builds</span>
          <span>{HARDCODED_PROJECTS.length} live stories</span>
        </div>

        <div className="projects-stack-list">
          {HARDCODED_PROJECTS.map((project, idx) => (
            <div key={project._id} className="project-stack-item">
              <article
                ref={(el) => (cardsRef.current[idx] = el)}
                className="pw-card project-card project-card-stack"
              >
                <div className="project-card-image">
                  <div
                    className="bg-img"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="project-image-overlay" />
                  <div className="big-number">{String(idx + 1).padStart(2, "0")}</div>
                </div>

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
                    <div className="project-contributors-header">
                      <span>Contributors</span>
                      <div className="line" />
                      <span className="count">{project.members.length} members</span>
                    </div>

                    <div className="project-members">
                      {project.members.map((name) => (
                        <span key={name} className="project-member">
                          {name}
                        </span>
                      ))}
                    </div>

                    <div className="project-footer">
                      <a
                        href={project.deployedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        VIEW PROJECT <span style={{ fontSize: 15 }}>&rarr;</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
