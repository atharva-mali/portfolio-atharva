// src/section/Projects.jsx
import React, { useEffect, useRef } from 'react'; // Import useEffect, useRef
import gsap from 'gsap'; // Import gsap
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';

// --- Sample Project Data ---
const projectData = [
  {
    title: 'Unified E-Commerce, CRM & Database Integration with Jitterbit',
    description: 'Using Jitterbit—a powerful ETL and API integration platform—this project automates the extraction, transformation, and loading (ETL) of data from BigCommerce and Salesforce into a centralized MySQL database.',
    imageUrl: "/project1.png", // Use seeded picsum for consistency
    techStack: ['Jitterbit', 'BigCommerce', 'Salesforce', 'MySQL'],
    liveLink: '#', // Replace with live demo link
    repoLink: 'https://github.com/atharva-mali/unified-jitterbit-integration-frontend.git', // Replace with repository link
  },
  {
    title: 'Mindspace Community App',
    description: 'Established an online community to foster engagement among like-minded individuals. Leveraged MySQL for robust data management, addressing fragmentation issues and offering discussion forums, collaboration platforms, and tailored student support. ',
    imageUrl: "/project2.png", // Use seeded picsum for consistency
    techStack: ['React', 'Redux', 'Tailwind CSS', 'Firebase'],
    liveLink: 'https://mindspace-community-app.vercel.app/', // Replace with live demo link
    repoLink: 'https://github.com/atharva-mali/mindspace-community-app.git', // Replace with repository link
  },
  {
    title: 'AM Media Youtube Clone',
    description: 'Engineered a responsive YouTube clone with React, Tailwind CSS, and JavaScript, utilizing Rapid API for seamless video integration, ensuring a dynamic and user-friendly experience across devices. ',
    imageUrl: '/project3.png', // Use seeded picsum for consistency
    techStack: ['React', 'Redux', 'Tailwind CSS'],
    liveLink: 'https://ammedia.netlify.app/', // Replace with live demo link
    repoLink: 'https://github.com/atharva-mali/youtube-clone.git', // Replace with repository link
  },
  {
    title: 'SIOM Placement Assistant',
    description: 'Revolutionized training and placement processes by automating tasks, providing user-friendly access, and efficiently matching student profiles with company requirements. ',
    imageUrl: '/project4.png', // Use seeded picsum for consistency
    techStack: ['PHP', 'HTML', 'Tailwind CSS', 'MySQL'],
    liveLink: '#',
    repoLink: 'https://github.com/atharva-mali/siom-placement-assistant.git',
  },
  // Add more projects...
];
// --- End Sample Data ---

// Register ScrollTrigger if not done globally
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null); // Ref for the title animation

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const titleEl = titleRef.current;
    if (!sectionEl || !titleEl) return;

    let ctx = gsap.context(() => {
        // Animate the Section Title
        gsap.fromTo(titleEl,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: titleEl,
                    start: 'top 90%', // Trigger when title is 90% visible
                    toggleActions: 'play none none none' // Play once
                }
            }
        );

        // --- Removed Grid Stagger Animation ---
        // Relying on individual ProjectCard entrance animations triggered by their own ScrollTriggers

    }, sectionRef); // Scope context to the section

    // Cleanup function
    return () => ctx.revert();

  }, []);

  return (
    // --- Section Styling Enhanced ---
    <section
        ref={sectionRef}
        id="projects"
        className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-blue-50 to-white dark:from-slate-900 dark:via-gray-900 dark:to-black text-slate-800 dark:text-slate-200" // Subtle gradient background
    >
      <div className="container mx-auto px-4">
        <div ref={titleRef}> {/* Wrap title for animation targeting */}
            <SectionTitle>My Projects</SectionTitle>
        </div>
        {/* --- Grid Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mt-10 md:mt-12"> {/* Adjusted gaps and margin */}
          {projectData.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              techStack={project.techStack}
              liveLink={project.liveLink}
              repoLink={project.repoLink}
              // Pass index or unique ID if needed for specific targeting, but not necessary now
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;