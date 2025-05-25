import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FaArrowRight } from 'react-icons/fa'; // Using a right arrow icon from react-icons

const BlogCard = ({ blog }) => {
  const cardRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // GSAP animation for Blog Card appearance
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      }
    );

    // GSAP animation for button hover effect
    gsap.fromTo(
      buttonRef.current,
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
    >
      {/* Blog Cover Image */}
      <img
        src={blog.cover_image}
        alt={blog.title}
        className="w-full h-48 object-cover rounded-lg mb-4 transform hover:scale-110 transition-transform duration-500"
      />
      {/* Blog Title */}
      <h3 className="text-xl font-semibold text-primary dark:text-secondary mb-2">{blog.title}</h3>
      {/* Blog Description */}
      <p className="text-gray-600 dark:text-gray-400 mb-4">{blog.description || 'No description available'}</p>
      {/* Blog Tags */}
      <div className="mb-4">
        <span className="text-xs text-gray-500 dark:text-gray-300">Tags: </span>
        {blog.tag_list.map((tag, index) => (
          <span key={index} className="text-sm text-primary dark:text-secondary mr-2">{tag}</span>
        ))}
      </div>

      {/* Animated Button */}
      <a
        ref={buttonRef}
        href={blog.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-primary dark:text-secondary font-semibold py-2 px-4 border-2 border-primary dark:border-secondary rounded-lg hover:bg-primary hover:text-white dark:hover:bg-secondary dark:hover:text-black transition-all duration-300"
      >
        <span>Read Full Article</span>
        <FaArrowRight className="ml-2" />
      </a>
    </div>
  );
};

export default BlogCard;
