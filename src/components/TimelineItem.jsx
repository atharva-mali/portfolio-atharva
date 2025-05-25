import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Ensure ScrollTrigger plugin is registered (good practice, though often done in a higher-level component)
gsap.registerPlugin(ScrollTrigger);

const TimelineItem = ({ title, subtitle, dateRange, description, isLeft, logo }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    // Ensure the element exists before trying to animate
    if (!itemRef.current) return;

    // --- GSAP Animation Setup ---
    // Store the ScrollTrigger instance for cleanup
    let st;

    // Use GSAP context for proper cleanup (optional but recommended)
    let ctx = gsap.context(() => {
        // Animate item fade-in and slide-in based on scroll position
        st = gsap.fromTo(
          itemRef.current,
          {
            opacity: 0,
            x: isLeft ? -60 : 60, // Keep slide distance
            scale: 0.95, // Keep subtle scale
          },
          {
            opacity: 1,
            x: 0,
            scale: 1, // Animate to full size
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: itemRef.current,
              start: 'top 85%', // When the top of the item hits 85% of the viewport height
              end: 'bottom 15%', // Define an end point for reversal trigger
              toggleActions: 'play none none reverse', // Play on enter, reverse on scroll back up past start
            },
          }
        );
    }); // End of GSAP Context

    // --- Cleanup Function ---
    // This is important to prevent memory leaks when the component unmounts
    return () => {
        ctx.revert(); // Kills all animations and ScrollTriggers created inside the context
    };

  }, [isLeft]); // Re-run effect if 'isLeft' changes (though usually it won't for a specific item)

  // --- Creative Tailwind Classes ---
  const dotBaseClasses = "z-10 hidden md:flex items-center justify-center order-1 shadow-xl w-10 h-10 rounded-full";
  const dotColorClasses = isLeft
    ? "bg-gradient-to-br from-teal-400 to-cyan-500 ring-teal-300 dark:from-teal-500 dark:to-cyan-600 dark:ring-teal-600" // Right side dot colors
    : "bg-gradient-to-br from-purple-400 to-fuchsia-500 ring-purple-300 dark:from-purple-500 dark:to-fuchsia-600 dark:ring-purple-600"; // Left side dot colors
  const dotRingClasses = "ring-4 ring-offset-2 ring-offset-white dark:ring-offset-gray-900"; // Ring effect (adjust dark:ring-offset if your section bg is different)

  const cardBaseClasses = "order-1 w-full md:w-5/12 px-6 py-5 rounded-xl shadow-lg transition-colors duration-300"; // Increased padding, rounded-xl
  const cardGradientClasses = "bg-gradient-to-br from-white via-blue-50 to-purple-100 dark:from-gray-800 dark:via-slate-800 dark:to-indigo-900"; // More complex gradient
  const cardBorderClasses = isLeft
    ? "border-r-4 border-teal-400 dark:border-teal-500" // Border on the right for left-aligned text card
    : "border-l-4 border-purple-400 dark:border-purple-500"; // Border on the left for right-aligned text card
  const cardShadowClasses = isLeft
    ? "shadow-teal-200/30 dark:shadow-teal-900/40" // Colored shadow matching border
    : "shadow-purple-200/30 dark:shadow-purple-900/40"; // Colored shadow matching border
  const cardTextAlign = isLeft ? 'md:text-right' : 'md:text-left';

  const dateColorClasses = isLeft
    ? "text-teal-600 dark:text-teal-300" // Right side date color
    : "text-purple-600 dark:text-purple-300"; // Left side date color

  return (
    // Main container div, applying the ref for GSAP targeting
    <div ref={itemRef} className={`mb-10 flex justify-between ${isLeft ? 'flex-row-reverse' : ''} items-center w-full`}> {/* Increased bottom margin */}
        {/* --- Desktop View: Alternating Sides Structure --- */}

        {/* Spacer div for desktop view - pushes content to the correct side */}
        <div className="hidden md:block w-5/12"></div> {/* Spacer */}

        {/* Timeline Dot/Marker - Enhanced with Gradient and Ring */}
        <div className={`${dotBaseClasses} ${dotColorClasses} ${dotRingClasses}`}>
            {/* Icon can go here - Example: Heroicons Star */}
            <span className="mx-auto font-semibold text-lg text-white"></span> {/* Optional: Icon/Number */}
        </div>

        {/* Content Card - Enhanced with Gradient, Side Border, Shadow */}
        <div className={`${cardBaseClasses} ${cardGradientClasses} ${cardBorderClasses} ${cardShadowClasses} ${cardTextAlign}`}>

            {/* Logo Section - Added above the title */}
            {logo && (
              <div className="mb-3 flex justify-center">
                <img src={logo} alt="Company/College Logo" className="w-55 h-30 object-contain" />
              </div>
            )}

            {/* Date Range - Vibrant and matching side color */}
            <p className={`text-sm font-semibold tracking-wide ${dateColorClasses} mb-1 transition-colors duration-300`}>
                {dateRange}
            </p>

            {/* Title - Bolder and high contrast */}
            <h3 className="mb-2 font-extrabold text-gray-900 dark:text-white text-xl md:text-2xl transition-colors duration-300">
                {title}
            </h3>

            {/* Subtitle - Refined spacing and contrast */}
            <p className="text-md font-medium leading-snug tracking-wide text-slate-700 dark:text-slate-300 mb-3 transition-colors duration-300">
                {subtitle}
            </p>

            {/* Description - Softer text, relaxed line height */}
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">
                {description}
            </p>
        </div>
        {/* --- End Content Card --- */}
    </div>
  );
};

export default TimelineItem;
