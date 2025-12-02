import React from 'react';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { FaGraduationCap } from 'react-icons/fa';

const Education = () => {
  return (
    <section id="education" className="education">
      <div className="container">
        <div className="section-header">
          <HiOutlineAcademicCap className="section-title-icon" />
          <h2 className="section-title">Education</h2>
        </div>
        <div className="education-card">
          <div className="edu-icon">
            <FaGraduationCap />
          </div>
          <div className="edu-content">
            <h3>Durham College</h3>
            <p className="degree">Computer Programming and Analysis (Advanced Diploma)</p>
            <p className="date">Expected April 2026</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

