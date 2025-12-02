import React, { useEffect, useRef } from 'react';
import { HiOutlineCodeBracket, HiOutlineCloud, HiOutlineSparkles, HiOutlineRocketLaunch, HiOutlineCpuChip } from 'react-icons/hi2';
import { FaGithub, FaLinkedin, FaEnvelope, FaLaptopCode } from 'react-icons/fa';
import { HiOutlineHand } from 'react-icons/hi';

const Hero = () => {
  const shapesRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      shapesRef.current.forEach((shape, index) => {
        if (shape) {
          const speed = (index + 1) * 0.1;
          shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <div className="greeting-container">
            <div className="profile-image-wrapper">
              <img 
                src="/images/profile.jpg" 
                alt="Mehak Kapur"
                className="profile-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="greeting">
              <HiOutlineHand className="greeting-icon" /> Hi there! I'm
            </div>
          </div>
          <h1 className="name">Mehak Kapur</h1>
          <p className="tagline">Aspiring Cloud Engineer & AI Enthusiast</p>
          <p className="description">
           Building cloud-native applications with AI integration through hands-on projects. 
          Passionate about designing scalable, serverless solutions that solve real-world business challenges.
          </p>
          <div className="hero-buttons">
            <button onClick={() => scrollToSection('projects')} className="btn btn-primary">
              View My Work
            </button>
            <button onClick={() => scrollToSection('contact')} className="btn btn-secondary">
              Get In Touch
            </button>
          </div>
          <div className="social-links">
            <a href="https://github.com/replicant005" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaGithub className="social-icon" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/mhkkapur12" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedin className="social-icon" /> LinkedIn
            </a>
            <a href="mailto:mehakkapur200@gmail.com" className="social-link">
              <FaEnvelope className="social-icon" /> Email
            </a>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="floating-shapes">
            <div ref={el => shapesRef.current[0] = el} className="shape shape-1">
              <HiOutlineCodeBracket />
            </div>
            <div ref={el => shapesRef.current[1] = el} className="shape shape-2">
              <HiOutlineCloud />
            </div>
            <div ref={el => shapesRef.current[2] = el} className="shape shape-3">
              <HiOutlineCpuChip />
            </div>
            <div ref={el => shapesRef.current[3] = el} className="shape shape-4">
              <HiOutlineSparkles />
            </div>
            <div ref={el => shapesRef.current[4] = el} className="shape shape-5">
              <HiOutlineRocketLaunch />
            </div>
            <div ref={el => shapesRef.current[5] = el} className="shape shape-6">
              <FaLaptopCode />
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="mouse"></div>
      </div>
    </section>
  );
};

export default Hero;

