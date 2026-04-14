import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram, FaDiscord } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const footerNavItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Services", path: "/services" },
];

const socialLinks = [
  { Icon: FaGithub, href: "#" },
  { Icon: FaLinkedin, href: "#" },
  { Icon: FaInstagram, href: "#" },
  { Icon: FaDiscord, href: "#" },
];

export default function Footer() {
  const footerRef = useRef(null);
  const brandRef = useRef(null);
  const socialsRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        brandRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );

      gsap.fromTo(
        socialsRef.current?.children || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: socialsRef.current,
            start: "top 95%",
          },
        }
      );

      gsap.fromTo(
        navRef.current?.children || [],
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: navRef.current,
            start: "top 95%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer">
      <div className="container footer-inner">
        {/* Duo icon for footer */}
        <div ref={brandRef} className="footer-brand-wrap" style={{ opacity: 0 }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ marginBottom: 16 }}>
            <circle cx="17" cy="24" r="13" stroke="var(--color-accent)" strokeWidth="1.5" fill="none" opacity="0.7" />
            <circle cx="31" cy="24" r="13" stroke="var(--color-white)" strokeWidth="1.5" fill="none" opacity="0.5" />
          </svg>
          <h2 className="footer-brand">
            DEV<span className="accent">DUO</span>.
          </h2>
          <p className="footer-tagline">Two Minds · One Vision</p>
        </div>

        {/* Social Icons */}
        <div ref={socialsRef} className="footer-socials">
          {socialLinks.map(({ Icon, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer">
              <Icon />
            </a>
          ))}
        </div>

        {/* Navigation */}
        <nav ref={navRef} className="footer-nav">
          {footerNavItems.map((item) => (
            <Link key={item.label} to={item.path}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <div className="footer-copyright">
          <span>© {new Date().getFullYear()} DEVDUO_COLLECTIVE</span>
          <div className="footer-dots">
            <div className="dot" />
            <div className="dot" />
          </div>
        </div>
      </div>
    </footer>
  );
}