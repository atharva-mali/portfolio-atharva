import React, { useEffect, useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import TimelineItem from '../components/TimelineItem';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import lexiconLogo from "../assets/logo/lexicon_networks_logo.png"
import office from "../assets/logo/office.svg"
import siomLogo from "../assets/logo/siom_logo.png"
import sguLogo from "../assets/logo/sgu_logo.png"

// --- Sample Data ---
const experiences = [
  {
    title: 'Junior Software Developer',
    subtitle: 'Lexicon Networks, Pune',
    dateRange: 'July 2025 - Present',
    description: 'Contributing to the design, development, and optimization of integration workflows and enterprise applications using Jitterbit, Shopify Admin APIs, NetSuite APIs, GraphQL API, REST/SOAP API, and modern web technologies, focusing on Shopify–NetSuite integrations.',
    logo: lexiconLogo, // Add the logo path here
  },
  {
    title: 'Software Developer Trainee',
    subtitle: 'Lexicon Networks, Pune',
    dateRange: 'Feb 2025 - July 2025',
    description: ' Gaining hands-on experience in Integration Development using advanced tools like Jitterbit and Celigo',
    logo: lexiconLogo, // Add the logo path here
  },
  {
    title: 'Web Developer Intern',
    subtitle: 'ESBI Investment Group LLC, Texas USA',
    dateRange: 'Jun 2019 - Dec 2021',
    description: "This role allow me to enhance my skills in website development, front-end and back-end programming, security analysis, and database management.",
    logo: office, // Add the logo path here
  },
];

const education = [
  {
    title: 'Master of Computer Application (MCA)',
    subtitle: 'Sinhgad Institute of Management, Pune',
    dateRange: '2023 - 2025',
    description: 'Student Coordinator for Sinhgad Spring Fest - TechDrill 2024 for the event Code Battle at Sinhgad Institute of Management, Pune.',
    logo: siomLogo, // Add the logo path here
  },
  {
    title: 'Bachelor of Computer Application (BCA)',
    subtitle: 'Sanjay Ghodawat University, Kolhapur',
    dateRange: '2020 - 2023',
    description: 'Member of DSAC Club, ACSES (Association of Computer Science & Engineering Students) and CSI (Computer Society of India)',
    logo: sguLogo, // Add the logo path here
  },
];
// --- End Sample Data ---

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineLineRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const timelineEl = timelineRef.current;
    const lineEl = timelineLineRef.current;
    const titleEl = titleRef.current;

    // Ensure elements exist before animating
    if (!sectionEl || !timelineEl || !lineEl || !titleEl) return;

    // --- GSAP Animations ---
    let ctx = gsap.context(() => {
        gsap.from(titleEl, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: titleEl,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
            }
        });

        gsap.from(lineEl, {
            scaleY: 0,
            duration: 1.5,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
                trigger: timelineEl,
                start: 'top 70%',
                end: 'bottom 70%',
                scrub: 1,
            }
        });

        gsap.utils.toArray('.timeline-item-left').forEach(item => {
            gsap.from(item, {
                opacity: 0,
                x: -100,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                }
            });
        });

        gsap.utils.toArray('.timeline-item-right').forEach(item => {
            gsap.from(item, {
                opacity: 0,
                x: 100,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                }
            });
        });

    }, sectionRef); // Scope animations to the sectionRef

    return () => ctx.revert();

  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-16 md:py-24 bg-[var(--color-light)] dark:bg-[var(--color-dark)] transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div ref={titleRef}>
            <SectionTitle>Education & Experience</SectionTitle>
        </div>

        <div ref={timelineRef} className="relative wrap overflow-hidden p-4 md:p-10 h-full mt-10">
          <div
            ref={timelineLineRef}
            className="absolute border-opacity-50 border-[var(--color-secondary)] dark:border-[var(--color-primary)] h-full border-4 rounded-md"
            style={{ left: '50%', marginLeft: '-2px' }}
          ></div>

          {experiences.map((item, index) => {
            const isLeft = index % 2 !== 0;
            return (
              <div key={`exp-${index}`} className={isLeft ? 'timeline-item-left' : 'timeline-item-right'}>
                  <TimelineItem
                    title={item.title}
                    subtitle={item.subtitle}
                    dateRange={item.dateRange}
                    description={item.description}
                    logo={item.logo} // Pass the logo here
                    isLeft={isLeft}
                  />
              </div>
            );
          })}

           {education.map((item, index) => {
             const isLeft = (experiences.length + index) % 2 !== 0;
             return (
               <div key={`edu-${index}`} className={isLeft ? 'timeline-item-left' : 'timeline-item-right'}>
                   <TimelineItem
                     title={item.title}
                     subtitle={item.subtitle}
                     dateRange={item.dateRange}
                     description={item.description}
                     logo={item.logo} // Pass the logo here
                     isLeft={isLeft}
                   />
               </div>
             );
           })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
