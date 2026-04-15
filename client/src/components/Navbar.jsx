import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const navigationItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Services", path: "/services" },
];

/* Duo icon — DevSource logo */
function DuoIcon() {
  return (
    <img src="/logo.png" alt="DevSource Logo" style={{ width: "36px", height: "36px", objectFit: "contain" }} className="duo-icon" />
  );
}

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const mobileRef = useRef(null);
  const linksRef = useRef([]);
  const logoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate nav links on mount
  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.1 }
      );
    }

    gsap.fromTo(
      linksRef.current.filter(Boolean),
      { opacity: 0, y: -10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.3,
      }
    );
  }, []);

  // Animate mobile menu
  useEffect(() => {
    if (!mobileRef.current) return;
    if (isOpen) {
      gsap.to(mobileRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.fromTo(
        mobileRef.current.querySelectorAll("a"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 0.15 }
      );
    } else {
      gsap.to(mobileRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <>
      <header
        ref={navRef}
        className={`navbar ${scrolled ? "scrolled" : ""}`}
      >
        <div className="container navbar-inner">
          {/* Logo — Icon + Text, no image */}
          <Link to="/" className="navbar-logo interactive" ref={logoRef} style={{ opacity: 0 }}>
            <DuoIcon />
            <span className="navbar-logo-text">
              Dev<span className="duo">Duo</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="navbar-nav">
            {navigationItems.map((item, i) => (
              <Link
                key={item.label}
                to={item.path}
                ref={(el) => (linksRef.current[i] = el)}
                className={`navbar-link interactive ${location.pathname === item.path ? "active" : ""}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`navbar-menu-btn interactive ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        ref={mobileRef}
        className={`navbar-mobile ${isOpen ? "open" : ""}`}
        style={{ opacity: 0 }}
      >
        {navigationItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            onClick={() => {
              setIsOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
