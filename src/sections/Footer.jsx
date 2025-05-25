import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaHeart } from 'react-icons/fa'; // Using FaHeart for the 'love' icon

// Register ScrollTrigger plugin (if not done globally)
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null); // Ref for the main footer element (for trigger)
  const contentRef = useRef(null); // Ref for the content block to animate

  // Initialize animations when component mounts
  useEffect(() => {
    // Ensure refs are valid
    if (!footerRef.current || !contentRef.current) return;

    // --- GSAP Context for reliable cleanup ---
    let ctx = gsap.context(() => {
      // Simple fade-in + slide-up animation for the footer content
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 30, // Start slightly lower
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current, // Trigger based on the footer entering view
            start: 'top bottom-=5%', // Trigger slightly before it's fully in view
            toggleActions: 'play none none none', // Play animation once
            // markers: true, // Uncomment for debugging trigger points
          },
        }
      );
    }, footerRef); // Scope context to the footer element

    // Clean up GSAP context and ScrollTrigger instances when component unmounts
    return () => {
      ctx.revert();
    };
  }, []); // Run effect only once on mount

  // --- Tailwind Classes ---
  const footerClasses = "bg-gradient-to-t from-slate-100 to-white dark:from-black dark:to-slate-900/80 border-t border-slate-200 dark:border-slate-700/50 text-slate-600 dark:text-slate-400";
  const contentWrapperClasses = "container mx-auto px-4 py-6"; // Adjusted padding
  const contentFlexClasses = "flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-3"; // Flex layout, gap for spacing
  const textClasses = "text-xs sm:text-sm"; // Responsive text size
  const highlightClasses = "font-semibold text-primary dark:text-secondary"; // For technology names
  const heartClasses = "inline-block mx-1 text-red-500"; // For the heart icon

  return (
    <footer ref={footerRef} className={footerClasses}>
      <div className={contentWrapperClasses}>
        {/* Content block for animation targeting */}
        <div ref={contentRef} className={contentFlexClasses}>

          {/* Left Side: Copyright */}
          <p className={textClasses}>
            &copy; {currentYear} Atharva Mali. All rights reserved.
          </p>

          {/* Right Side: Built With / Made With */}
          <div className={`${textClasses} flex flex-col xs:flex-row items-center gap-1 sm:gap-2`}>
             <span> {/* Grouping "Built with" */}
               Built with <span className={highlightClasses}>React</span>, <span className={highlightClasses}>Tailwind CSS</span>, & <span className={highlightClasses}>GSAP</span>.
             </span>
             <span className="hidden xs:inline">|</span> {/* Separator on larger screens */}
             <span> {/* Grouping "Made with" */}
                Made with <FaHeart className={heartClasses} /> in Kolhapur, India. {/* Added current location */}
             </span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;