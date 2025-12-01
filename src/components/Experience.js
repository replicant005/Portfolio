import React, { useEffect, useRef } from 'react';

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
      icon: '👨‍🏫',
      title: 'Tech Mentor (Volunteer)',
      company: 'Cyber-Seniors',
      date: 'Jan 2025 - Present',
      description: 'Communicate complex technical concepts to diverse audiences while troubleshooting various technical issues and developing educational resources tailored to individual learning needs.'
    },
    {
      id: 2,
      icon: '📱',
      title: 'Social Media Manager and Content Creator (Volunteer)',
      company: 'Paction, Toronto, ON',
      date: 'April 2024 - Aug 2024',
      description: 'Created engaging digital content increasing engagement by 30%, analyzed metrics for optimization, and maintained consistent brand voice while adapting to platform requirements.'
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2 className="section-title">💼 Experience</h2>
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              ref={el => timelineItemsRef.current[index] = el}
              className="timeline-item"
            >
              <div className="timeline-icon">{exp.icon}</div>
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

