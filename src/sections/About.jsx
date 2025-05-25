import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../components/SectionTitle";
import profilePic from "../assets/profile.png";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-blue-50 to-white dark:from-slate-900 dark:via-gray-900 dark:to-black text-slate-800 dark:text-slate-200"
    >
      <div className="container mx-auto px-4">
        <SectionTitle>About Me</SectionTitle>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Profile Image with Ring Effect */}
          <div
            ref={imageRef}
            className="w-full md:w-1/3 flex justify-center items-center relative"
          >
            {/* Glowing Ring */}
            <div className="absolute w-64 h-64 md:w-72 md:h-72 rounded-full border-4 border-[var(--color-primary)] animate-pulse blur-sm opacity-40 z-0"></div>

            {/* Profile Image */}
            <img
              src={profilePic}
              alt="Atharva Suryakant Mali"
              className="rounded-full shadow-md w-48 h-48 md:w-64 md:h-64 object-cover border-4 border-[var(--color-primary)] dark:border-[var(--color-secondary)] relative z-10"
            />
          </div>

          {/* About Text */}
          <div
  ref={textRef}
  className="w-full md:w-2/3 text-center md:text-left text-[var(--color-dark)] dark:text-[var(--color-light)] space-y-4 text-base md:text-lg leading-relaxed"
>
  <p>
    Hello! I’m <strong>Atharva Suryakant Mali</strong>, a passionate Full Stack Web Developer and aspiring Data Scientist based in Pune, India. Currently, I work as a Software Engineer Trainee, where I am gaining hands-on experience in Integration projects using advanced tools like <strong>Jitterbit</strong> and <strong>Celigo</strong>.
  </p>
  <p>
    With expertise in both front-end and back-end development, I specialize in creating scalable, interactive web applications using technologies such as <strong>React</strong>, <strong>FastAPI</strong>, and <strong>Tailwind CSS</strong>. I focus on building seamless user interfaces, optimizing performance, and integrating complex systems to deliver robust solutions.
  </p>
  <p>
    I enjoy exploring new technologies and enhancing my skill set. Recently, I’ve been diving deeper into <strong>TypeScript</strong> and <strong>Machine Learning</strong> to better understand data-driven development and AI-driven solutions. My work is centered around improving system integrations and leveraging automation to streamline workflows.
  </p>
  <p>
    Outside of work, I keep myself updated on the latest trends in AI and software development, contribute to open-source projects on <a href="https://github.com/atharva-mali" target="_blank" rel="noopener noreferrer"><strong>GitHub</strong></a>, and actively participate in the tech community. I’m always open to collaborating on new projects and discovering exciting challenges.
  </p>
</div>
        </div>
      </div>
    </section>
  );
};

export default About;
