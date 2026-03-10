import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2';
import { 
  FaCode, 
  FaCloud, 
  FaRobot, 
  FaTools 
} from 'react-icons/fa';

const Skills = () => {
  const skillCategoriesRef = useRef([]);
  const [expandedCategories, setExpandedCategories] = useState({});

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
    const currentCategories = [...skillCategoriesRef.current].filter(category => category !== null);

    currentCategories.forEach(category => {
      if (category) {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(category);
      }
    });

    return () => {
      // Use captured categories for cleanup
      currentCategories.forEach(category => {
        observer.unobserve(category);
      });
    };
  }, []);

  const skillCategories = [
    {
      id: 1,
      icon: FaCode,
      title: 'Languages, Frameworks & Databases',
      skills: ['Python', 'JavaScript/TypeScript', 'Java', 'SQL', 'React', 'Next.js', 'Node.js', 'Express', 'Flask', 'FastAPI', 'Pydantic', 'PostgreSQL', 'MongoDB', 'DynamoDB']
    },
    {
      id: 2,
      icon: FaCloud,
      title: 'Cloud & DevOps',
      skills: [
        'AWS (Lambda, S3, API Gateway, Step Functions, CloudWatch)', 'ECS/ECR', 'CloudFront', 'AWS Nitro Enclaves',
        'Docker', 'Docker Compose', 'Kubernetes', 'CI/CD', 'Git/GitHub', 'Serverless Architecture', 'Microservices'
      ]
    },
    {
      id: 3,
      icon: FaRobot,
      title: 'AI & LLM Integration',
      skills: ['LLM Integration (OpenAI, Cohere, Anthropic)', 'LangChain', 'Agent Orchestration', 'RAG Pipelines', 'Prompt Engineering', 'Document Parsing', 'TTS / Streaming APIs']
    },
    {
      id: 4,
      icon: FaTools,
      title: 'Practices & Tools',
      skills: ['System Design', 'REST APIs', 'JWT Authentication', 'RBAC', 'Unit Testing (Pytest)', 'Agile', 'Observability', 'Schema Validation (Pydantic)', 'Payment Integration (Stripe)']
    }
  ];

  const toggleExpand = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-header">
          <HiOutlineWrenchScrewdriver className="section-title-icon" />
          <h2 className="section-title">Skills & Technologies</h2>
        </div>
        <div className="skills-container">
          {skillCategories.map((category, index) => (
            <div
              key={category.id}
              ref={el => skillCategoriesRef.current[index] = el}
              className="skill-category"
            >
              <h3 className="category-title">
                <div className="category-icon">
                  {React.createElement(category.icon)}
                </div>
                {category.title}
              </h3>
              <div className={`skill-tags ${expandedCategories[category.id] ? 'expanded' : ''}`}>
                {category.skills.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
              {category.skills.length > 8 && (
                <button 
                  className="expand-toggle"
                  onClick={() => toggleExpand(category.id)}
                >
                  {expandedCategories[category.id] ? 'Show Less' : 'Show All'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

