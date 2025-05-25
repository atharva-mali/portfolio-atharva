import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SectionTitle = ({ children }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    // Simple fade-in animation for the title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 90%', // Trigger when 90% of the element is visible
          toggleActions: 'play none none none', // Play animation once on enter
        },
      }
    );
  }, []);

  return (
    <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-primary dark:text-secondary">
      {children}
    </h2>
  );
};

export default SectionTitle;