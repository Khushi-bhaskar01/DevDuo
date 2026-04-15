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
      
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        xPercent: -50,
        yPercent: -50,
        duration: 0.1,
      });

      gsap.to(outline, {
        x: clientX,
        y: clientY,
        xPercent: -50,
        yPercent: -50,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = (e) => {
      const target = e.currentTarget;
      const text = target.getAttribute('data-cursor-text');
      
      document.body.classList.add('cursor-hover');
      
      if (text) {
        cursor.innerHTML = `<span>${text}</span>`;
        document.body.classList.add('cursor-text-active');
      }
    };

    const handleMouseLeave = () => {
      document.body.classList.remove('cursor-hover');
      document.body.classList.remove('cursor-text-active');
      cursor.innerHTML = '';
    };

    window.addEventListener('mousemove', moveCursor);
    
    // Use event delegation or observe changes if needed, but for now just refresh on mount and updates
    const updateInteractions = () => {
      const links = document.querySelectorAll('a, button, .interactive, [data-cursor-text]');
      links.forEach(link => {
        link.addEventListener('mouseenter', handleMouseEnter);
        link.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    updateInteractions();

    // Re-check for new elements occasionally or on specific events
    const interval = setInterval(updateInteractions, 1000);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={outlineRef} className="custom-cursor-outline" />
    </>
  );
}
