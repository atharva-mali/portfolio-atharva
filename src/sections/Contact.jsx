// src/sections/Contact.jsx
import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../components/SectionTitle";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaDev,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const detailsRef = useRef(null);

  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    if (
      !sectionRef.current ||
      !titleRef.current ||
      !formRef.current ||
      !detailsRef.current
    )
      return;

    let ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 90%" },
        }
      );
      gsap.fromTo(
        detailsRef.current.children,
        { opacity: 0, x: -40, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: detailsRef.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        formRef.current.querySelectorAll(":scope > div"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submissionStatus === "loading") return;

    setSubmissionStatus("loading");
    setFeedbackMessage("");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("Missing EmailJS environment variables.");
      setFeedbackMessage("Configuration error. Please contact support.");
      setSubmissionStatus("error");
      return;
    }

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey).then(
      () => {
        setFeedbackMessage("Message sent successfully! Thank you.");
        setSubmissionStatus("success");
        formRef.current.reset();
        setTimeout(() => setSubmissionStatus("idle"), 5000);
      },
      (error) => {
        console.error("EmailJS Error:", error.text);
        setFeedbackMessage(
          `Failed to send message. Error: ${error.text || "Please try again."}`
        );
        setSubmissionStatus("error");
        setTimeout(() => setSubmissionStatus("idle"), 5000);
      }
    );
  };

  const contactDetails = [
    {
      icon: FaEnvelope,
      text: "atharva.mali3081@gmail.com",
      href: "mailto:atharva.mali3081@gmail.com",
    },
    { icon: FaPhone, text: "+91-8484812450", href: "tel:+91-8484812450" },
    {
      icon: FaMapMarkerAlt,
      text: "Kolhapur, India",
      href: "https://maps.app.goo.gl/Rs3ZyLF1kmnE6Lsx6",
    },
  ];

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/atharva-mali", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/atharvamali3081", label: "LinkedIn" },
    { icon: FaSquareXTwitter, href: "https://x.com/atharva_3081", label: "X" },
    { icon: FaDev, href: "https://dev.to/atharvamali", label: "DEV.to" },
  ];

  const getButtonText = () => {
    switch (submissionStatus) {
      case "loading":
        return "Sending...";
      case "success":
        return "Message Sent!";
      case "error":
        return "Retry Send";
      default:
        return "Send Message";
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 md:py-24 bg-[var(--gradient-bg)] dark:bg-[var(--gradient-bg-dark)]"
    >
      <div className="container mx-auto px-4">
        <div ref={titleRef}>
          <SectionTitle>Get In Touch</SectionTitle>
        </div>

        <div className="mt-10 md:mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 bg-white dark:bg-slate-800/50 rounded-xl shadow-xl p-6 md:p-10 lg:p-12 border border-slate-100 dark:border-slate-700/50">
          {/* Contact Info */}
          <div ref={detailsRef} className="md:col-span-5 space-y-8">
            {contactDetails.map((item, index) => (
              <div key={index} className="flex items-start gap-4 text-sm">
                <item.icon className="w-5 h-5 mt-0.5 text-[var(--color-primary)] dark:text-[var(--color-secondary)] flex-shrink-0" />
                <a
                  href={item.href}
                  className="text-slate-700 dark:text-slate-300 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-secondary)] whitespace-pre-line transition-colors"
                >
                  {item.text}
                </a>
              </div>
            ))}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-700/50">
              <h4 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">
                Connect with me
              </h4>
              <div className="flex items-center space-x-5">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group p-2 rounded-full bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-600 transform hover:scale-110 transition-all duration-200 ease-in-out"
                  >
                    <social.icon className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-[var(--color-primary)] dark:group-hover:text-[var(--color-secondary)] transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7">
            <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-100 text-center md:text-left">
              Send me a message
            </h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="from_name"
                  id="name"
                  required
                  className="input-style"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="from_email"
                  id="email"
                  required
                  className="input-style"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  required
                  className="input-style"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={submissionStatus === "loading"}
                  className={`
      w-full md:w-auto font-bold py-3 px-8 rounded-lg shadow-lg border-2
      bg-[var(--color-primary)] text-white border-[var(--color-primary)]
      hover:bg-white hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]
      dark:bg-[var(--color-secondary)] dark:text-white dark:border-[var(--color-secondary)]
      dark:hover:bg-transparent dark:hover:text-[var(--color-secondary)] dark:hover:border-[var(--color-secondary)]
      focus:outline-none focus:ring-2 focus:ring-offset-2
      focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-secondary)]
      transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95
      ${
        submissionStatus === "loading"
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer"
      }
    `}
                >
                  {getButtonText()}
                </button>
              </div>

              {feedbackMessage && (
                <p
                  className={`text-sm font-medium mt-2 ${
                    submissionStatus === "success"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {feedbackMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
