import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlogCard from '../components/BlogCard';
import SectionTitle from '../components/SectionTitle';

gsap.registerPlugin(ScrollTrigger);

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const blogsRef = useRef(null);

  useEffect(() => {
    // Scroll animations for the Blogs section
    gsap.fromTo(
      blogsRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: blogsRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Adding a hover effect animation for blog cards
    gsap.fromTo(
      '.blog-card', 
      { scale: 1, rotation: 0 }, 
      {
        scale: 1.05,
        rotation: 3,
        duration: 0.3,
        ease: 'ease.out',
        scrollTrigger: {
          trigger: '.blog-card',
          start: 'top bottom',
          end: 'bottom top',
          toggleActions: 'play reverse play reverse',
        },
      }
    );

    // Fetch blogs from Dev.to API
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`https://dev.to/api/articles?username=atharvamali`);
        const data = await response.json();
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section
      id="blogs"
      ref={blogsRef}
      className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-blue-50 to-white dark:from-slate-900 dark:via-gray-900 dark:to-black text-slate-800 dark:text-slate-200" // Subtle gradient background
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <SectionTitle>Latest Blogs</SectionTitle>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="text-center text-lg text-gray-500 dark:text-gray-300">Loading...</div>
          ) : (
            blogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                <BlogCard blog={blog} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
