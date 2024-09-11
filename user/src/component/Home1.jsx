import React, { useEffect, useRef } from "react";
import BannerImage from "../assets/home-banner-image.png";
import Navbar from "./Navbar";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import About from "./About";
import Work from "./Work";
import Testimonial from "./Testimonial";
import Contact from "./Contact";
import Footer from "./Footer";

import { useInView } from 'react-intersection-observer';
import { AnimationOnScroll } from 'react-animation-on-scroll';

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
/>



const Home1 = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  useEffect(() => {

    axios.get('http://localhost:3001/auth/verify')
      .then(result => {

        if (result.data.Status) {
          // window.location.reload()
          if (result.data.role === "admin") {
            navigate('/home')
          } else if (result.data.role === "staff") {
            navigate('/staff/' + result.data.mat)
          } else if (result.data.role === "student") {
            navigate('/student/' + result.data.mat)
          }
        }
      }).catch(err => console.log(err))
  }, [])

  const { ref, inView } = useInView({
    threshold: 0.2, // Adjust the threshold as needed
  });

  return (
    <div className="home-container App">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-text-section">
          <h1 className="primary-heading">
            Thank you for joining Us in Nfonap !
          </h1>
          <p className="primary-text">
            Here is our institution managment platform. You are welcome.
          </p>
          <button className="secondary-button1">
            Who are you ? click to login <FiArrowDown />
          </button>
          <div className="secondary-button">
            <button className="secondary-button" onClick={() => { navigate('./adminlogin.jsx'), window.location.reload() }}>
              Admin
            </button>
            <button className="secondary-button" onClick={() => { navigate('./login.jsx'), window.location.reload() }}>
              Student
            </button>
            <button className="secondary-button" onClick={() => { navigate('./logintostaff.jsx'), window.location.reload() }}>
              Teacher
            </button>
            <button className="secondary-button" onClick={() => { navigate('./commun.jsx'), window.location.reload() }}>
              Delegate
            </button>
            <button className="secondary-button" onClick={() => { navigate('./loginbank.jsx'), window.location.reload() }}>
              Bank
            </button>
          </div> <br />
          <div className="secondary-button">
            <button className="secondary-button2" onClick={() => { navigate('/studentreg.jsx'), window.location.reload() }}>
              Resgister <FiArrowRight />
            </button>
            <button className="secondary-button" onClick={() => { navigate('/studentreg.jsx'), window.location.reload() }}>
              Student
            </button>

          </div>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
      <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
        <About />
      </AnimationOnScroll>
      <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
        <Work />
      </AnimationOnScroll>
      <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
        <Testimonial />
      </AnimationOnScroll>
      <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
        <Contact />
      </AnimationOnScroll>
      <Footer />
    </div>
  );
};

export default Home1;
