import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/Home.css';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <div id="about-me">
          <h1>About Me</h1>
          <h2>Welcome to my personal webpage!</h2>
          <h2>
            I'm Yuhi Chiba, a passionate student of Computer Science and Computer Engineering at Waseda University in Japan.
            Currently, I am an exchange student at the University of Texas at Austin.
          </h2>
          <h2>
            I am interested in computer science innovations, especially in the realm of artificial intelligence, and in how these advances can contribute to healthcare improvements.
            I also enjoy exploring back-end development and hardware engineering, appreciating the dynamic synergy between software and hardware systems.
          </h2>
          <h2>
            Throughout my university experience, I have built a solid foundation in computer science and engineering,
            acquiring practical programming skills in C, Java, Python, HTML, CSS, and React through class projects and hands-on assignments.
            These experiences have improved my ability to develop efficient and reliable applications, both on the software and hardware sides.
          </h2>
          <h2>
            Besides technical expertise, I have gained a strong understanding of mathematics, physics, and chemistry,
            enabling me to tutor fellow students and help them excel in these subjects.
          </h2>
          <h2>
            Thank you for visiting my webpage! Feel free to connect with me!
          </h2>
        </div>
        <div id="profile">
          <img src="myface1-1.jpg" className="profile-img" alt="My Face" />
          <span>Yuhi Chiba</span>
          <span>Waseda University</span>
          <span>Computer Science and Engineering major</span>
          <span>gmail : yuhi.chiba2027@gmail.com</span>
          <div className="icon">
            <a href="https://github.com/yuhi-c">
              <img src="github-mark.png" alt="GitHub" />
            </a>
            <a href="https://www.linkedin.com/in/yuhi-chiba/">
              <img src="LI-In-Bug.png" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
