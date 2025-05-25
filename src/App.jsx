import { useState, useEffect } from "react";
import "./App.css";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Navbar from "./components/Navbar";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Loader from "./components/Loader";
import Blogs from "./sections/Blogs";

function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const loader = document.getElementById("loader-wrapper");
      if (loader) {
        loader.classList.add("exit");
        setTimeout(() => setShowLoader(false), 1000); // Wait for animation
      }
    }, 2500); // Duration before exit animation starts

    return () => clearTimeout(timer);
  }, []);

  if (showLoader) return <Loader />;

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Blogs />
        <Contact />
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}

export default App;
