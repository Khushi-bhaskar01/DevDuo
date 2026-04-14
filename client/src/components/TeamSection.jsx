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
    skills: ["REACT", "NODE.JS", "UI/UX"],
    image: "/images/AdarshTiwari.png",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Khushi Bhaskar",
    role: "Vice Lead",
    id: "02",
    skills: ["MERN", "DOCKER", "AWS"],
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
      // Header animation
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
          },
        }
      );

      gsap.fromTo(
        headerRef.current?.querySelector(".section-title"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        headerRef.current?.querySelector(".team-subtitle"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        }
      );

      // Cards — stagger from left & right (duo entrance)
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            y: 60, 
            x: i === 0 ? -60 : 60,
            scale: 0.92,
            rotateY: i === 0 ? 5 : -5,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotateY: 0,
            duration: 1.2,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          }
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
            TWO MINDS, <span className="muted">ONE</span> VISION.
          </h2>
          <p className="team-subtitle" style={{ opacity: 0, marginTop: 24, fontSize: 15, color: "var(--color-gray-400)", maxWidth: 500, lineHeight: 1.7 }}>
            Every great endeavor starts with the right partnership. We are the driving 
            force behind DevDuo — united by code, driven by impact.
          </p>
        </div>

        <div className="team-grid-duo">
          {teamMembers.map((member, idx) => (
            <div
              key={member.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="team-card"
            >
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
                <h3>{member.name}</h3>
                <p className="team-card-role">{member.role}</p>
                <div className="team-card-skills">
                  {member.skills.map((skill) => (
                    <span key={skill} className="team-skill-tag">{skill}</span>
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
          ))}
        </div>

        {/* Duo connection line */}
        <div className="duo-connection">
          <div className="duo-line" />
          <span className="duo-badge">×</span>
          <div className="duo-line" />
        </div>
      </div>
    </section>
  );
}