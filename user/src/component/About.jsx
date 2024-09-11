import React from "react";
import AboutBackgroundImage from "../assets/c.jpeg";
import { FcDataRecovery } from "react-icons/fc";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";


const About = () => {
  return (
    <div>
      <div className="about-section-container">
        <div className="about-background-image-container">
          {/* <img src={AboutBackground} alt="" /> */}
        </div>
        <div className="about-section-image-container">
          <img src={AboutBackgroundImage} alt="" />
        </div>
        <div className="about-section-text-container">
          <p className="primary-subheading">About</p>
          <h1 className="primary-heading">
            NFONAP has been one of the best Higher Institute in Cameroon still date
          </h1>
          <p className="primary-text">
            We offer quality professional studies in several domaines: <br />
            <strong>Engineering-Biomedical-Economy-Education</strong>
          </p>
          <p className="primary-text">
            We have <br /> <strong>HND-BACHELOR-MASTER-CAPIEM</strong>.
          </p>
          <div className="about-buttons-container">
            <button className="secondary-button">Learn More
              <FiArrowRight /></button>
            <button className="watch-video-button">
              <BsFillPlayCircleFill /> Watch video
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
