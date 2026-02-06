import React from 'react';
import Navbar from '../components/Navbar';
import SectionCard from '../components/SectionCard';
import '../styles/Back-Pro.css';

const ProjectCard = ({ title, children }) => {
  return (
    <SectionCard title={title} variant="projects">
      {children}
    </SectionCard>
  );
};

/* Functon for the Personal Project section */
const PersonalProject = () => {
  return (
    <div>
      <h1>Personal Projects</h1>
      <ProjectCard title="Self-introduction WebPage Development (2025 Mar - 2025 April)">
        <p>
          I was working on making this webpage by implementing the skills I learned in the Web App Development class at UT Austin.
        </p>
      </ProjectCard>
    </div>
  );
};

/* Function for Research Project section */
const ResearchProject = () => {
  return (
    <div>
      <h1>Research Project</h1>
      <ProjectCard>
        <p>Coming soon...</p>
      </ProjectCard>
    </div>
  );
};

const Projects = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <PersonalProject />
        <ResearchProject />
      </div>
    </div>
  );
};

export default Projects;
