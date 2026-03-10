import React, { useEffect, useRef, useState } from 'react';
import {
  FaShieldAlt,
  FaBook,
  FaRobot,
  FaCloud
} from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi2';

const Projects = () => {
  const projectCardsRef = useRef([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;
  const [expandedProjects, setExpandedProjects] = useState({});

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
      icon: FaShieldAlt,
      title: 'MCP Code Security Reviewer',
      description: 'Model Context Protocol (MCP) server that performs automated code security reviews by orchestrating static analysis (Bandit, Pylint) and LLM-based reasoning. Aggregates results into structured reports highlighting vulnerabilities, insecure patterns, and maintainability issues. Exposes analysis as callable tools for AI agents and editor integrations.',
      tech: ['Python', 'FastMCP', 'Docker', 'Bandit', 'Pylint', 'LLM Integration', 'REST APIs'],
      githubLink: 'https://github.com/replicant005/CodeReviewer'
    },
    {
      id: 2,
      icon: FaBook,
      title: 'Outline Auditor | Academic Planning & Workload Intelligence',
      description: 'Designed normalized PostgreSQL schema and ORM models for an LLM-powered course outline parsing system. Implemented repository pattern, versioning, audit trails, and a 3-layer backend (Controllers → Services → Repositories) with Docker Compose deployment and 15+ REST endpoints for programmatic integrations.',
      tech: ['Python', 'SQLAlchemy', 'PostgreSQL', 'FastAPI', 'Docker', 'REST APIs'],
      githubLink: 'https://github.com/replicant005'
    },
    {
      id: 3,
      icon: FaRobot,
      title: 'Squill — AI SOP Assistant',
      description: 'Winner of UofT Hacks 13. Built by a team of 4, Squill is an AI-powered assistant that helps students write stronger Statements of Purpose through guided reflective prompts and structured feedback. I developed the backend using Flask streaming APIs and LangGraph to orchestrate LLM agents, enabling real-time AI interactions. Implemented Pydantic schema validation and streaming pipelines to ensure reliable outputs and reduce unpredictable LLM behavior.',
      tech: ['Flask', 'LangGraph', 'Cohere', 'Pydantic', 'Next.js', 'TypeScript'],
      githubLink: 'https://github.com/replicant005'
    },
    {
      id: 4,
      icon: FaCloud,
      title: 'Additional AI & Cloud Projects',
      description: 'Various production-style projects focused on RAG pipelines, document parsing, serverless APIs, and scalable deployments on AWS. Implementations include streaming APIs, Dockerized services, and monitoring/observability integrations.',
      tech: ['RAG', 'AWS', 'Docker', 'FastAPI', 'React'],
      githubLink: 'https://github.com/replicant005'
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

  const toggleExpand = (projectId) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <HiOutlineSparkles className="section-title-icon" />
          <h2 className="section-title">Featured Projects</h2>
        </div>
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
                <div className="project-icon-header">
                  <div className="project-icon">
                    {React.createElement(project.icon)}
                  </div>
                  <h3>{project.title}</h3>
                </div>
                <div className="project-description-wrapper">
                  <p className={`project-description ${expandedProjects[project.id] ? 'expanded' : ''}`}>
                    {project.description}
                  </p>
                  <button 
                    className="expand-toggle"
                    onClick={() => toggleExpand(project.id)}
                  >
                    {expandedProjects[project.id] ? 'Show Less' : 'Read More'}
                  </button>
                </div>
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

