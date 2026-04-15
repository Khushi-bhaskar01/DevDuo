import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "Adarsh Tiwari",
    role: "Lead",
    id: "01",
    skills: ["Full Stack Developer", "App Dev", "Game Dev"],
    image: "/images/AdarshTiwari.png",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Khushi Bhaskar",
    role: "Vice Lead",
    id: "02",
    skills: ["Full Stack Developer", "DOCKER", "AWS"],
    image: "/images/KB.jpg",
    github: "https://github.com/Khushi-bhaskar01",
    linkedin: "https://www.linkedin.com/in/khushi-bhaskar-b00586324/",
  },
];

export default function TeamSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.querySelector(".section-label"),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
          },
        }
      );

      gsap.fromTo(
        headerRef.current?.querySelector(".section-title"),
        { opacity: 0, y: 50, letterSpacing: "0.18em" },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.04em",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
          },
        }
      );

      gsap.fromTo(
        headerRef.current?.querySelector(".team-subtitle"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
          },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        const image = card.querySelector(".team-card-image");
        const info = card.querySelector(".team-card-info");
        const skills = card.querySelectorAll(".team-skill-tag");
        const socials = card.querySelectorAll(".team-card-socials a");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play reverse play reverse"
          },
        });

        tl.fromTo(
          card,
          {
            opacity: 0,
            y: 90,
            x: i === 0 ? -70 : 70,
            rotateY: i === 0 ? 10 : -10,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            rotateY: 0,
            scale: 1,
            duration: 1.25,
            ease: "power4.out",
          }
        )
          .fromTo(
            image,
            { clipPath: "inset(18% 12% 18% 12%)", scale: 1.12 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              duration: 1.1,
              ease: "power3.out",
            },
            "-=0.95"
          )
          .fromTo(
            info,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.8"
          )
          .fromTo(
            skills,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.06,
              ease: "power2.out",
            },
            "-=0.45"
          )
          .fromTo(
            socials,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.08,
              ease: "power2.out",
            },
            "-=0.25"
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="team-section">
      <div className="container">
        <div ref={headerRef} className="team-header">
          <span className="section-label" style={{ opacity: 0 }}>
            / THE DUO
          </span>
          <h2 className="section-title" style={{ opacity: 0 }}>
            THE PEOPLE <span className="muted">BEHIND</span> DEVDUO.
          </h2>
          <p
            className="team-subtitle"
            style={{
              opacity: 0,
              marginTop: 24,
              fontSize: 15,
              color: "var(--color-gray-400)",
              maxWidth: 540,
              lineHeight: 1.7,
            }}
          >
            Two builders, one shared standard for craft. Every release is shaped
            through collaboration, critique, and a relentless focus on polish.
          </p>
        </div>

        <div className="team-grid-duo">
          {teamMembers.map((member, idx) => (
            <article
              key={member.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="team-card"
            >
              <div className="team-card-frame">
                <div className="team-card-image">
                  <img
                    src={member.image}
                    alt={member.name}
                    onError={(e) => {
                      e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`;
                    }}
                  />
                  <div className="overlay" />
                  <span className="id-stamp">{member.id} // DUO</span>
                </div>
                <div className="team-card-info">
                  <span className="team-card-eyebrow">Core member</span>
                  <h3>{member.name}</h3>
                  <p className="team-card-role">{member.role}</p>
                  <div className="team-card-skills">
                    {member.skills.map((skill) => (
                      <span key={skill} className="team-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="team-card-socials">
                    <a href={member.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub />
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="duo-connection">
          <div className="duo-line" />
          <span className="duo-badge">x</span>
          <div className="duo-line" />
        </div>
      </div>
    </section>
  );
}
