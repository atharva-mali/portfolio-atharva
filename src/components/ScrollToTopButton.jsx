// src/components/ScrollToTopButton.jsx
import React, { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const scrollThreshold = 300;
    if (window.scrollY > scrollThreshold) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      // ----- Updated Classes -----
      className={`
        fixed bottom-5 right-5 z-50 p-3 rounded-full shadow-lg text-white
        bg-primary hover:bg-primary/90 dark:bg-secondary dark:hover:bg-secondary/90
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-secondary
        transition-all duration-300 ease-in-out transform  /* Added 'transform' for potential scale effect */
        ${isVisible ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'} /* Added scale for entry */
      `}
      // ----- End Updated Classes -----
      aria-label="Scroll back to top"
    >
      <FiArrowUp className="w-5 h-5" />
    </button>
  );
};

export default ScrollToTopButton;