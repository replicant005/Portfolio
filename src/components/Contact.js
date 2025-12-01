import React, { useEffect, useRef } from 'react';

const Contact = () => {
  const contactCardsRef = useRef([]);

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

    contactCardsRef.current.forEach(card => {
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
      }
    });

    return () => {
      contactCardsRef.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  const contacts = [
    {
      id: 1,
      icon: '📧',
      title: 'Email',
      info: 'mehakkapur200@gmail.com',
      link: 'mailto:mehakkapur200@gmail.com'
    },
    {
      id: 2,
      icon: '📱',
      title: 'Phone',
      info: '(437) 460-6369',
      link: 'tel:+14374606369'
    },
    {
      id: 3,
      icon: '💼',
      title: 'LinkedIn',
      info: 'Connect with me',
      link: 'https://www.linkedin.com/in/mhkkapur12'
    },
    {
      id: 4,
      icon: '🐙',
      title: 'GitHub',
      info: 'Check out my code',
      link: 'https://github.com/replicant005'
    }
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">📬 Get In Touch</h2>
        <p className="section-subtitle">Let's connect and create something amazing together!</p>
        <div className="contact-cards">
          {contacts.map((contact, index) => (
            <a
              key={contact.id}
              ref={el => contactCardsRef.current[index] = el}
              href={contact.link}
              target={contact.link.startsWith('http') ? '_blank' : undefined}
              rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="contact-card"
            >
              <div className="contact-icon">{contact.icon}</div>
              <h3>{contact.title}</h3>
              <p>{contact.info}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;

