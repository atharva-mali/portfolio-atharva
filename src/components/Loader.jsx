import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Loader = () => {
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.fromTo(
      textRef.current,
      { opacity: 0.2 },
      { opacity: 1, duration: 0.8, ease: "power2.inOut" }
    );

    // blinking cursor
    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
      ease: "power2.inOut",
    });

    // Exit animation when class "exit" is added
    const observer = new MutationObserver(() => {
      if (wrapperRef.current?.classList.contains("exit")) {
        tl.kill();
        gsap.to(wrapperRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: "power2.out",
        });
      }
    });

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="loader-wrapper"
      ref={wrapperRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white"
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold tracking-wide">
          <span ref={textRef}>&lt;Hello World</span>
          <span ref={cursorRef} className="animate-blink text-blue-400">
            /&gt;
          </span>
        </div>
        <div className="flex space-x-2 mt-4">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-ping" />
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-ping delay-150" />
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-ping delay-300" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
