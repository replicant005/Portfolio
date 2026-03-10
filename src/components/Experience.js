import React, { useEffect, useRef } from 'react';
import { HiOutlineCodeBracket } from 'react-icons/hi2';
import { FaLaptopCode } from 'react-icons/fa';

const Experience = () => {
  const timelineItemsRef = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Capture current refs at the start
    const currentItems = [...timelineItemsRef.current].filter(item => item !== null);

    currentItems.forEach(item => {
      if (item) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
      }
    });

    return () => {
      // Use captured items for cleanup
      currentItems.forEach(item => {
        observer.unobserve(item);
      });
    };
  }, []);

  const experiences = [
    {
      id: 1,
      icon: FaLaptopCode,
      title: 'Website Coordinator & Web Developer (Volunteer)',
      company: 'Rewriting the Code',
      date: 'May 2025 - Sept 2025',
      description: 'Developed and deployed website features used by 1,500+ users; maintained WCAG accessibility and responsive design. Implemented SEO and performance optimizations reducing page load time by 25%. Built content management and deployment workflows with QA testing, achieving high production reliability.'
    },
    {
      id: 2,
      icon: FaLaptopCode,
      title: 'Open Source Contributor',
      company: 'Various Projects',
      date: '',
      description: 'Contributed to Next.js starter templates and open-source tooling: improved onboarding, added reusable layout components, and resolved JavaScript/TypeScript build issues across environments.'
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <div className="section-header">
          <HiOutlineCodeBracket className="section-title-icon" />
          <h2 className="section-title">Experience</h2>
        </div>
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              ref={el => timelineItemsRef.current[index] = el}
              className="timeline-item"
            >
              <div className="timeline-icon">
                {React.createElement(exp.icon)}
              </div>
              <div className="timeline-content">
                <h3>{exp.title}</h3>
                <p className="company">{exp.company}</p>
                <p className="date">{exp.date}</p>
                <p className="description">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

