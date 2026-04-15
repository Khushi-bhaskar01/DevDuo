import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const outline = outlineRef.current;

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      
      // Immediate move for small dot
      gsap.to(cursor, {
        x: clientX - 10,
        y: clientY - 10,
        duration: 0.1,
      });

      // Smoother move for outline
      gsap.to(outline, {
        x: clientX - 20,
        y: clientY - 20,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleHover = () => {
      document.body.classList.add('cursor-hover');
    };

    const handleUnhover = () => {
      document.body.classList.remove('cursor-hover');
    };

    window.addEventListener('mousemove', moveCursor);
    
    // Select all interactive elements
    const links = document.querySelectorAll('a, button, .interactive');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleHover);
      link.addEventListener('mouseleave', handleUnhover);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleHover);
        link.removeEventListener('mouseleave', handleUnhover);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={outlineRef} className="custom-cursor-outline" />
    </>
  );
}
