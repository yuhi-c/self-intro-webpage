import React from 'react';
import Navbar from '../components/Navbar';
import KVRow from '../components/KVRow';
import SectionCard from '../components/SectionCard';
import '../styles/Back-Pro.css';

const Section = ({ title, children }) => {
  return (
    <SectionCard title={title} variant="background">
      {children}
    </SectionCard>
  );
};

const EducationalBackground = () => {
  return (
    <div>
      <h1>Educational Background</h1>
      <Section title="High School">
        <KVRow label="School Name">
          Nishi Metropolitan High School (April 2019 - March 2022)
        </KVRow>
        <KVRow label="Club">
          Soft tennis, Physics, Founder of Pokémon Club (which was broadcast on TV).
        </KVRow>
        <KVRow label="Extracurricular">
          I was chosen as a member of an exchange program that would visit MIT &amp; Harvard.
          Although canceled due to COVID‐19, I was trained in presentation, communication, and other skills.
        </KVRow>

      </Section>

      <Section title="University">
        <KVRow label="School Name">
          Waseda University (April 2023 - March 2027)
        </KVRow>
        <KVRow label="Major">
          Computer Science &amp; Engineering
        </KVRow>
        <KVRow label="GPA">
          3.52 / 4.0 (So far)
        </KVRow>
        <KVRow label="GE Courses">
          Linear Algebra, Advanced Linear Algebra, Mathematical Analysis, Physics, Chemistory,
          Engineering Modeling, Probability and Statistics, Vector Analysis
        </KVRow>
        <KVRow label="Major Courses">
          C, Java, Python, Information Math, Algorithm, Information Theory, Data Structure, Circuit Theory, Logical Circuit, OS, Computer Architecture, Data Base
        </KVRow>
        <KVRow label="Circle">
          Squash, Tennis
        </KVRow>

      </Section>

      <Section title="Studying Abroad">
        <KVRow label="School Name">
          University of Texas at Austin (August 2024 - Current)
        </KVRow>
        <KVRow label="Major">
          Electrical and Computer Engineering
        </KVRow>
        <KVRow label="GPA">
          3.44 / 4.0
        </KVRow>
        <KVRow label="Courses">
          Computer Archtecture, Software Engineering and Design, Networking, Programming Analysis, Operating System
        </KVRow>
      </Section>
    </div>
  );
};

const JobBackground = () => {
  return (
    <div className="job-background">
      <h1>Job Background</h1>
      <Section title="Backend Engineer Internship">
        <KVRow label="Place">
          Ollo Inc. (June 2025 - December 2025)
        </KVRow>
        <KVRow label="Responsibilities">
          <ul>
            <li>Collaborated with my mentor and CEO to develop and improve product</li>
            <li>Designed and implemented RESTful APIs using FastAPI</li>
            <li>Set up and managed Docker and UV CLI based development environments</li>
            <li>Integrated AWS services for scalable backend</li>
          </ul>
        </KVRow>
        <KVRow label="Skills">
          FastAPI, Docker, AWS(S3, Lambda, Elemental MediaConvert), UV CLI, Poetry, Playwright, GitHub Actions
        </KVRow>
      </Section>
    </div>
  );
};

const Background = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <EducationalBackground />
        <JobBackground />
      </div>
    </div>
  );
};

export default Background;

