import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaDev, FaGithub, FaLinkedin, FaReact } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import { TextPlugin } from "gsap/TextPlugin";
import jslogo from "../assets/tech-logos/js.png";
import jbLogo from "../assets/tech-logos/jitterbitLogo.jpg";
import tailwindLogo from "../assets/tech-logos/tailwind.svg";
import reactlogo from "../assets/tech-logos/react.svg";
import celigoLogo from "../assets/tech-logos/celigoLogo.jpg"

gsap.registerPlugin(TextPlugin);

const Hero = () => {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const socialRef = useRef(null);
  const techRef = useRef(null);
  // Removed downloadBtnRef as it wasn't used and buttonRef covers the container

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // GSAP animations targeting specific elements via refs
    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        descriptionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        socialRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        "-=0.3"
      );
    // Note: The techRef animation wasn't included, you might want to add it similar to socialRef

    // Typewriter animation
    if (titleRef.current) {
      // Add check if ref exists
      gsap.to(titleRef.current, {
        // Use simple .to for typewriter effect if starting blank
        text: "Integration Developer | Full Stack Developer | React Enthusiast",
        duration: 3,
        ease: "none", // Use 'none' for consistent typing speed
        delay: 0.8, // Start after initial name fade-in
      });
    }
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      // --- MODIFIED LINE ---
      // Added pt-20 for navbar spacing, kept min-h-screen
      // Added pb-10 for some bottom spacing within the centered content area
      className="min-h-screen flex items-center justify-center text-center bg-gradient-to-br from-blue-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 px-4 pt-20 pb-10"
      // --- END MODIFIED LINE ---
    >
      {/* Increased max-width slightly for better spacing on medium screens */}
      <div className="max-w-4xl">
        <h1
          ref={nameRef}
          // Adjusted font size for mobile
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-light mb-3 sm:mb-4 font-nato" // Reduced bottom margin slightly
        >
          Atharva Mali
        </h1>

        <h2
          ref={titleRef}
          // Adjusted font size for mobile and reduced margin
          className="text-lg sm:text-xl md:text-2xl font-semibold text-primary dark:text-secondary mb-4 sm:mb-6 min-h-[3em]" // Added min-height to prevent jump during typing
        ></h2>

        <p
          ref={descriptionRef}
          // Adjusted font size for mobile and reduced margin
          className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-xl mx-auto"
        >
          Software Engineer — crafting full-stack web applications and working
          on integration projects using Jitterbit and Celigo. Passionate about
          building seamless digital solutions and exploring AI-powered
          development.
        </p>

        {/* Buttons Section - Added flex-wrap for small screens */}
        <div
          ref={buttonRef}
          // Added flex-wrap and adjusted gap/margins for mobile
          className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 items-center"
        >
          <a
            href="#projects"
            // Adjusted padding/text size for consistency
            className="inline-block text-white font-bold py-2.5 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg shadow-md bg-primary hover:bg-primary/90 dark:bg-secondary dark:hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-secondary transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaReact className="inline-block mr-1 sm:mr-2" /> View My Work
          </a>

          <a
            href="/cv/Atharva Mali_Resume.pdf" // REMEMBER TO UPDATE THIS PATH
            download
            // Adjusted padding/text size for consistency
            className="inline-block text-white font-bold py-2.5 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg shadow-md bg-primary hover:bg-primary/90 dark:bg-secondary dark:hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-secondary transition duration-300 ease-in-out transform hover:scale-105"
          >
            <BsDownload className="inline-block mr-1 sm:mr-2" /> Download CV
          </a>
        </div>

        {/* Social Media Icons - Reduced margin */}
        <div
          ref={socialRef}
          className="flex justify-center space-x-6 mb-6 sm:mb-8"
        >
          {/* Links remain the same */}
          <a
            href="https://github.com/atharva-mali"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <FaGithub className="text-2xl text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition duration-300 transform hover:scale-125" />{" "}
          </a>{" "}
          <a
            href="https://linkedin.com/in/atharvamali"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <FaLinkedin className="text-2xl text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition duration-300 transform hover:scale-125" />{" "}
          </a>{" "}
          <a
            href="https://dev.to/atharvamali"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <FaDev className="text-2xl text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition duration-300 transform hover:scale-125" />{" "}
          </a>
        </div>

        {/* Technologies Section - Reduced gaps */}
        <div
          ref={techRef}
          className="flex flex-wrap justify-center gap-4 md:gap-6" // Removed md:flex-nowrap to allow wrapping on medium screens too if needed
        >
          {/* Reduced logo size slightly on smallest screens */}
          <div className="tech-logo transform hover:scale-110 transition duration-300 ease-in-out rounded-md overflow-hidden">
            {" "}
            <img
              src={jslogo}
              alt="JavaScript"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-md"
            />{" "}
          </div>
          <div className="tech-logo transform hover:scale-110 transition duration-300 ease-in-out rounded-md overflow-hidden">
            {" "}
            <img
              src={reactlogo}
              alt="React"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-md"
            />{" "}
          </div>
          <div className="tech-logo transform hover:scale-110 transition duration-300 ease-in-out rounded-md overflow-hidden">
            {" "}
            <img
              src={tailwindLogo}
              alt="Tailwind CSS"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-md"
            />{" "}
          </div>
          {/* <div className="tech-logo transform hover:scale-110 transition duration-300 ease-in-out rounded-md overflow-hidden">
            {" "}
            <img
              src={jbLogo}
              alt="Jitterbit"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-md"
            />{" "}
          </div>
          <div className="tech-logo transform hover:scale-110 transition duration-300 ease-in-out rounded-md overflow-hidden">
            {" "}
            <img
              src={celigoLogo}
              alt="Celigo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-md"
            />{" "}
          </div> */}
          {/* Add more logos as needed */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
