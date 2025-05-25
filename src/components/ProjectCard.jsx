// src/components/ProjectCard.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ title, description, imageUrl, techStack = [], liveLink, repoLink }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
          rotate: -3,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="group bg-gradient-to-br from-[var(--color-light)] via-slate-50 to-blue-100 dark:from-[var(--color-dark)] dark:via-slate-800 dark:to-blue-900/60
        rounded-xl shadow-xl dark:shadow-2xl shadow-blue-100/40 dark:shadow-blue-900/30
        border border-slate-100 dark:border-blue-800/40
        overflow-hidden transition-all duration-300 ease-in-out flex flex-col
        hover:shadow-blue-200/60 dark:hover:shadow-blue-700/40 hover:border-slate-200 dark:hover:border-blue-700/60"
    >
      {/* Image */}
      <div className="overflow-hidden h-48 md:h-52">
        <img
          src={imageUrl || 'https://via.placeholder.com/400x250'}
          alt={`Preview of project ${title}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <h3 className="text-xl lg:text-2xl font-bold mb-2 text-[var(--color-dark)] dark:text-[var(--color-light)] transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow transition-colors">
          {description}
        </p>

        {/* Tech Stack */}
        {techStack.length > 0 && (
          <div className="mb-5">
            <span className="font-semibold text-sm text-slate-700 dark:text-slate-300 transition-colors">Tech Stack:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="bg-[color:var(--color-primary)/10] dark:bg-[color:var(--color-secondary)/15]
                  border border-[color:var(--color-primary)/30] dark:border-[color:var(--color-secondary)/30]
                  text-[color:var(--color-primary)] dark:text-[color:var(--color-secondary)]
                  text-xs font-medium px-3 py-1 rounded-full transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto flex justify-start items-center space-x-6 pt-4 border-t border-slate-200 dark:border-slate-700/50 transition-colors">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium inline-flex items-center gap-2 px-4 py-2 rounded-lg
                bg-[color:var(--color-primary)] dark:bg-[color:var(--color-secondary)] 
                hover:bg-[color:var(--color-primary)] dark:hover:bg-[color:var(--color-secondary)] 
                hover:opacity-80 text-white transition-all duration-300 ease-in-out"
              aria-label={`Live demo of ${title}`}
            >
              <FaExternalLinkAlt /> <span>Live Demo</span>
            </a>
          )}
          {repoLink && (
            <a
              href={repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium inline-flex items-center gap-2 px-4 py-2 rounded-lg
                bg-[color:var(--color-light)] dark:bg-[color:var(--color-dark)]
                hover:bg-[color:var(--color-light)] dark:hover:bg-[color:var(--color-dark)]
                hover:opacity-80 text-[color:var(--color-dark)] dark:text-[color:var(--color-light)] 
                transition-all duration-300 ease-in-out"
              aria-label={`GitHub repository for ${title}`}
            >
              <FaGithub /> <span>Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
