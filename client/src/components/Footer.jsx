import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram, FaDiscord, FaGoogle, FaPhoneAlt } from "react-icons/fa";

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
      <div className="container footer-layout">
        
        {/* Left Side: Logo & Navigation */}
        <div ref={brandRef} className="footer-left" style={{ opacity: 0 }}>
          <div className="footer-brand-header">
            <img src="/logo.png" alt="DevSource Logo" style={{ width: "28px", height: "28px", objectFit: "contain" }} className="duo-icon" />
            <h2 className="footer-brand">
              DEV<span className="accent">DUO</span>.
            </h2>
          </div>
          <p className="footer-tagline">Two Minds · One Vision</p>

          <nav ref={navRef} className="footer-nav-column">
            {footerNavItems.map((item) => (
              <Link 
                key={item.label} 
                to={item.path} 
                className="interactive footer-nav-link"
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Side: Social Profiles */}
        <div ref={socialsRef} className="footer-right">
          
          <div className="footer-profile">
            <h3 className="footer-profile-name">Adarsh Tiwari</h3>
            <div className="footer-profile-links">
              <a href="mailto:adarsh@example.com" className="interactive" aria-label="Mail"><FaGoogle /></a>
              <a href="tel:+910000000000" className="interactive" aria-label="Phone"><FaPhoneAlt /></a>
              <a href="https://linkedin.com/in/adarshtiwari" target="_blank" rel="noopener noreferrer" className="interactive" aria-label="LinkedIn"><FaLinkedin /></a>
            </div>
          </div>
          
          <div className="footer-profile">
            <h3 className="footer-profile-name">Khushi Bhaskar</h3>
            <div className="footer-profile-links">
              <a href="mailto:khushi@example.com" className="interactive" aria-label="Mail"><FaGoogle /></a>
              <a href="tel:+910000000000" className="interactive" aria-label="Phone"><FaPhoneAlt /></a>
              <a href="https://linkedin.com/in/khushibhaskar" target="_blank" rel="noopener noreferrer" className="interactive" aria-label="LinkedIn"><FaLinkedin /></a>
            </div>
          </div>
          
        </div>

      </div>

      {/* Copyright */}
      <div className="container">
        <div className="footer-copyright" style={{ borderTop: "1px solid var(--color-border)", paddingTop: "32px", marginTop: "40px" }}>
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