import React, { useEffect, useRef, useState } from 'react';

const Projects = () => {
  const projectCardsRef = useRef([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

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
    const currentCards = [...projectCardsRef.current].filter(card => card !== null);
    
    // Unobserve all current cards
    currentCards.forEach(card => {
      observer.unobserve(card);
    });

    // Observe current page cards
    const timeoutId = setTimeout(() => {
      currentCards.forEach(card => {
        if (card) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(30px)';
          card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          observer.observe(card);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      // Use captured cards for cleanup
      currentCards.forEach(card => {
        observer.unobserve(card);
      });
    };
  }, [currentPage]);

  const projects = [
    {
      id: 1,
      icon: '🛒',
      title: 'Buy The Best',
      description: 'Full-stack e-commerce platform featuring product catalog, shopping cart, and secure checkout with Stripe integration. Built with React SPA frontend, Node.js/Express RESTful backend, MongoDB for product data, and integrated LLM-powered chatbot for product Q&A.',
      tech: ['React', 'Node.js', 'MongoDB', 'AWS Lambda', 'Stripe'],
      githubLink: 'https://github.com/replicant005'
    },
    {
      id: 2,
      icon: '♻️',
      title: 'Wasteless App',
      description: 'Marketplace web application enabling users to list near-expiry food through image uploads for sale or donation. Implemented with React frontend, Node.js/Express backend, Firebase Realtime Database for live chat, AWS S3 for image storage, and Stripe payment processing.',
      tech: ['React', 'Firebase', 'AWS S3', 'JWT', 'Stripe'],
      githubLink: 'https://github.com/replicant005'
    },
    {
      id: 3,
      icon: '🎵',
      title: 'PaceMaker AI',
      description: 'AI-powered audio generation service creating personalized running tracks by combining AI-generated music with motivational speech. Multi-agent workflow orchestrated using Google ADK coordinates music generation, text-to-speech conversion, and FFmpeg audio mixing.',
      tech: ['Google Cloud', 'Cloud Run', 'TTS', 'FFmpeg', 'AI'],
      githubLink: 'https://github.com/replicant005',
      image: null
    },
    {
      id: 4,
      icon: '📅',
      title: 'Smart Scheduler',
      description: 'AI-driven scheduling application with vision-based schedule extraction and conflict resolution. Integrates GPT-4 Vision for document parsing, LLM reasoning for constraint optimization, and React drag-and-drop UI for manual adjustments.',
      tech: ['GPT-4 Vision', 'React', 'MongoDB', 'AWS EC2', 'S3'],
      githubLink: 'https://github.com/replicant005',
      image: null
    },
    {
      id: 5,
      icon: '📚',
      title: 'Outline Auditor',
      description: 'Academic course outline management system with NLP-based document parsing and natural language update processing. Extracts structured data using GPT-4, stores in PostgreSQL, and performs constraint validation for multi-course workload analysis.',
      tech: ['GPT-4', 'PostgreSQL', 'D3.js', 'Docker', 'AWS ECS'],
      githubLink: 'https://github.com/replicant005',
      image: null
    },
    {
      id: 6,
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Cloud-hosted observability platform tracking website analytics, error logs, and user behavior with integrated bug tracking system. Built with React/TypeScript frontend, Node.js/Express backend, TimescaleDB for time-series data, and Redis for caching.',
      tech: ['TypeScript', 'TimescaleDB', 'Redis', 'Grafana', 'AWS'],
      githubLink: 'https://github.com/replicant005',
      image: null
    },
    {
      id: 7,
      icon: '🔒',
      title: 'Shadow LLM',
      description: 'Privacy-preserving AI training platform enabling secure model fine-tuning within private cloud environments without data exposure. Implements AWS Nitro Enclaves for secure computation, federated learning via Flower framework, and differential privacy mechanisms.',
      tech: ['Python', 'PyTorch', 'Flower', 'AWS Nitro', 'HIPAA/GDPR'],
      githubLink: 'https://github.com/replicant005',
      image: null
    }
  ];

  // Calculate pagination
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: document.getElementById('projects').offsetTop - 100, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: document.getElementById('projects').offsetTop - 100, behavior: 'smooth' });
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: document.getElementById('projects').offsetTop - 100, behavior: 'smooth' });
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">🌟 Featured Projects</h2>
        <p className="section-subtitle">Check out some of my recent work</p>
        <div className="projects-grid">
          {currentProjects.map((project, index) => {
            const actualIndex = startIndex + index;
            return (
              <div
                key={project.id}
                ref={el => projectCardsRef.current[actualIndex] = el}
                className="project-card"
              >
                <div className="project-image-container">
                  <div className="project-image-placeholder">
                    <div className="project-icon">{project.icon}</div>
                  </div>
                </div>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                    View Code →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Pagination Controls */}
        <div className="pagination-container">
          <button 
            onClick={handlePrevPage} 
            disabled={currentPage === 1}
            className="pagination-btn pagination-btn-prev"
            aria-label="Previous page"
          >
            <span>←</span> Previous
          </button>
          
          <div className="pagination-dots">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`pagination-dot ${currentPage === page ? 'active' : ''}`}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
            className="pagination-btn pagination-btn-next"
            aria-label="Next page"
          >
            Next <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;

