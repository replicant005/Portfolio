import React, { useEffect, useRef } from 'react';

const Skills = () => {
  const skillCategoriesRef = useRef([]);

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
      title: '💻 Programming Languages',
      skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'SQL', 'Bash', 'PHP', 'HTML/CSS']
    },
    {
      id: 2,
      title: '⚛️ Frameworks & Libraries',
      skills: ['React', 'Node.js', 'Express.js', 'Axios', 'Bootstrap', '.NET', 'PyTorch', 'Flower']
    },
    {
      id: 3,
      title: '☁️ Cloud & DevOps',
      skills: ['AWS Lambda', 'AWS EC2', 'AWS S3', 'DynamoDB', 'Google Cloud', 'Firebase', 'Docker', 'Serverless']
    },
    {
      id: 4,
      title: '🗄️ Databases & Storage',
      skills: ['MongoDB', 'PostgreSQL', 'TimescaleDB', 'DynamoDB', 'Redis', 'Firebase']
    },
    {
      id: 5,
      title: '🤖 AI/ML & APIs',
      skills: ['OpenAI API', 'GPT-4 Vision', 'LLM Integration', 'Google ADK', 'NLP', 'Federated Learning', 'Differential Privacy']
    },
    {
      id: 6,
      title: '🔧 Tools & Development',
      skills: ['Git', 'FFmpeg', 'Stripe API', 'JWT', 'RESTful API', 'Grafana', 'D3.js', 'Selenium', 'Cypress']
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">🛠️ Skills & Technologies</h2>
        <div className="skills-container">
          {skillCategories.map((category, index) => (
            <div
              key={category.id}
              ref={el => skillCategoriesRef.current[index] = el}
              className="skill-category"
            >
              <h3 className="category-title">{category.title}</h3>
              <div className="skill-tags">
                {category.skills.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

