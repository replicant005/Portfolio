import React, { useEffect, useRef, useState } from 'react';
import { 
  FaShoppingCart, 
  FaRecycle, 
  FaMusic, 
  FaCalendarAlt, 
  FaBook, 
  FaChartLine, 
  FaLock 
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
      icon: FaShoppingCart,
      title: 'Buy The Best | Full-Stack E-Commerce Platform',
      description: 'Cloud-based electronics marketplace with product catalog, smart shopping cart, and secure Stripe checkout. Built an AI chatbot using OpenAI API that answers product questions and gives recommendations, cutting support tickets by 70%. Used serverless architecture (AWS Lambda + API Gateway) for auto-scaling and 99.9% uptime. Implemented JWT auth, optimized DynamoDB queries to under 50ms, and set up S3 CDN for fast image loading. Dockerized the whole stack for smooth deployments.',
      tech: ['Next.js', 'Node.js', 'Docker', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'Stripe API', 'OpenAI API', 'S3', 'JWT'],
      githubLink: 'https://github.com/replicant005'
    },
    {
      id: 2,
      icon: FaRecycle,
      title: 'Wasteless | RealTime Food Redistribution Marketplace',
      description: 'Platform connecting people to share near-expiry food (40% of household waste). Users snap photos to list items, buyers discover through geolocation. Built real-time WebSocket chat with message history and typing indicators. Implemented OAuth social login, role-based dashboards for buyers/sellers, and automatic image compression pipeline in Cloud Storage. Used Firestore denormalization for queries under 100ms and Cloud Functions to auto-expire old listings and send notifications. Server-side rendering with Next.js for better SEO.',
      tech: ['Next.js', 'Docker', 'Firebase', 'Firestore', 'Cloud Storage', 'Authentication', 'Cloud Functions', 'WebSocket', 'OAuth'],
      githubLink: 'https://github.com/replicant005'
    },
    {
      id: 3,
      icon: FaMusic,
      title: 'PaceMaker AI | Multi-Agent Audio Production System',
      description: 'AI tool for runners that creates custom motivational audio. Two agents work together: Producer agent makes genre-specific music and converts text to speech, Sound Engineer agent mixes everything with FFmpeg and syncs to running pace. Used AWS Step Functions to coordinate agents with retry logic. Deployed as containerized microservices on Cloud Run with auto-scaling (0 to 100 instances), stored audio in S3, and distributed via CloudFront CDN. Optimized pipeline to generate 5-minute tracks in under 30 seconds.',
      tech: ['Python', 'Docker', 'AWS Lambda', 'Cloud Run', 'Step Functions', 'FFmpeg', 'OpenAI TTS API', 'S3', 'CloudFront'],
      githubLink: 'https://github.com/replicant005'
    },
    {
      id: 4,
      icon: FaCalendarAlt,
      title: 'Smart Scheduler | AI-Powered Visual Schedule Optimizer',
      description: 'Smart calendar that reads schedule photos or forms, extracts tasks using vision and language models, then generates conflict-free timetables. Built drag-and-drop interface with live conflict warnings, priority-based rescheduling, and undo/redo. Combined LLM reasoning for understanding context with algorithms for constraint solving. Used MongoDB change streams for real-time updates, Redis cache to cut API times by 60%, and Lambda for async image processing.',
      tech: ['React.js', 'Python', 'FastAPI', 'Docker', 'Google Vision API', 'Claude API', 'MongoDB', 'Redis', 'AWS Lambda'],
      githubLink: 'https://github.com/replicant005'
    },
    {
      id: 5,
      icon: FaBook,
      title: 'Outline Auditor | Academic Workload Analyzer',
      description: 'Tool that reads course syllabi, extracts topics/assessments/outcomes using NLP and vision models, and stores them in PostgreSQL. Built a natural language interface where users can say "move midterm to week 9" and it updates everything with dependency checking. Creates heat maps and conflict reports across multiple courses to spot overloaded weeks and deadline clashes. AI suggests better assessment distribution based on best practices. Dockerized microservices for parsing, logic, and visualization.',
      tech: ['Python', 'FastAPI', 'Docker', 'Document AI APIs', 'PostgreSQL', 'React.js', 'D3.js', 'LangChain', 'NLP'],
      githubLink: 'https://github.com/replicant005'
    },
    {
      id: 6,
      icon: FaChartLine,
      title: 'Analytics Dashboard | Observability & Intelligent Bug Tracking',
      description: 'Monitoring platform that collects website analytics, error logs, and user sessions with Elasticsearch search across 10M+ logs. Built bug tracker with severity tags, automatic log attachments, and team workflows. Added ML-based pattern detection that spots recurring errors and suggests fixes. Microservices architecture with separate services for data ingestion, processing, and visualization. Integrated CloudWatch for infrastructure metrics and Chart.js for 20+ dashboard visualizations.',
      tech: ['React.js', 'Node.js', 'Docker', 'MongoDB', 'AWS CloudWatch', 'Elasticsearch', 'Chart.js', 'Microservices'],
      githubLink: 'https://github.com/replicant005'
    },
    {
      id: 7,
      icon: FaLock,
      title: 'Shadow LLM | Privacy-Preserving Federated AI Platform',
      description: 'Lets hospitals, banks, and law firms fine-tune AI models on sensitive data without exposing it. Organizations train locally and only share encrypted updates, never raw data. Used PySyft for federated learning, AWS Nitro Enclaves for secure computation with hardware verification, and differential privacy to prevent data reconstruction. Built automated compliance reports for HIPAA/SOC2/GDPR tracking data location and PII detection. Deployed on Kubernetes with encrypted communication and regional data controls.',
      tech: ['Python', 'Docker', 'PySyft', 'AWS Nitro Enclaves', 'Kubernetes', 'Federated Learning', 'Differential Privacy'],
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

