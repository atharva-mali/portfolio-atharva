import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import gsap from "gsap";
import ThemeToggle from "./ThemeToggle"; // Import the toggle component

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // Ref for the mobile menu element for GSAP animation
  const mobileMenuRef = useRef(null);
  // Ref for the main navbar element for GSAP animation
  const navbarRef = useRef(null);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Blogs", href: "#blogs" },
    { name: "Contact", href: "#contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLinkClick = () => {
    if (isOpen) setIsOpen(false);
  };

  // Effect for handling scroll detection for styling the navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    // Initial animation for the navbar appearance
    gsap.fromTo(
      navbarRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.5 }
    );
    // Cleanup scroll listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect for animating the mobile menu slide and locking body scroll
  useEffect(() => {
    if (mobileMenuRef.current) {
      const animationProps = isOpen
        ? { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
        : { x: "-100%", opacity: 0, duration: 0.3, ease: "power2.in" };
      gsap.to(mobileMenuRef.current, animationProps);
    }

    // Lock/unlock body scroll when mobile menu opens/closes
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to ensure body scroll is restored if component unmounts while menu is open
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    // The main nav element remains fixed at the top
    <nav
      ref={navbarRef}
      // CHANGE: Be specific about transitions instead of 'transition-all'
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300 ease-in-out ${
        // <-- MODIFIED LINE
        isScrolled || isOpen
          ? "bg-white dark:bg-gray-900 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {" "}
          {/* Standard height */}
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#hero"
              className="text-primary dark:text-secondary text-2xl font-extrabold font-mono tracking-wide hover:opacity-80 transition-all duration-300 ease-in-out drop-shadow-md hover:drop-shadow-lg"
              onClick={handleLinkClick}
            >
              <span>{"<dev.Atharva />"}</span>
            </a>
          </div>
          {/* Desktop Navigation Links & Theme Toggle */}
          <div className="hidden md:flex md:items-center md:ml-6">
            <div className="flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary px-3 py-2 rounded-md text-sm font-medium relative group"
                >
                  {link.name}
                  {/* Animated Underline */}
                  <span className="absolute bottom-0 left-0 block h-0.5 bg-primary dark:bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out w-full"></span>
                </a>
              ))}
            </div>
            {/* Add Theme Toggle for Desktop */}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>
          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center">
            {/* Add Theme Toggle for Mobile */}
            <div className="mr-2">
              <ThemeToggle />
            </div>
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              type="button"
              // Ensure the button has a high enough z-index if needed, though z-50 on nav should cover it
              className="relative z-50 inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* The icon changes based on the isOpen state */}
              {isOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {/*
        - Positioned absolutely *below* the h-16 header.
        - Takes full remaining height.
        - Slides in from the left (`transform -translate-x-full` controlled by GSAP).
        - `overflow-y-auto` allows scrolling of the *links* if they exceed the panel height.
        - `z-40` ensures it's below the main nav bar (z-50) but above page content.
        - Background color is set here.
      */}
      <div
        ref={mobileMenuRef} // Add ref for GSAP
        className={`md:hidden absolute top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 shadow-xl overflow-y-auto transform -translate-x-full z-40 opacity-0`} // Start hidden, GSAP handles transition
        id="mobile-menu"
        aria-hidden={!isOpen} // Accessibility improvement
      >
        {/* Padding added inside the scrollable container */}
        <div className="px-4 pt-5 pb-3 space-y-3 sm:px-6">
          {/* Mobile Navigation Links */}
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-secondary block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={handleLinkClick} // Close menu on link click
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* Optional: Background Blur Overlay - Removed as the menu doesn't cover the header anymore */}
      {/* You could add it back if you want to dim the page content behind the menu */}
      {/* {isOpen && (
         <div
           className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden" // Lower z-index than menu
           onClick={toggleMenu}
         ></div>
       )} */}
    </nav>
  );
};

export default Navbar;
