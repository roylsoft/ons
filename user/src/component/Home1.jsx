import React, { useEffect } from "react";
import BannerImage from "../assets/home-banner-image.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import About from "./About";
import Work from "./Work";
import Testimonial from "./Testimonial";
import Contact from "./Contact";
import Footer from "./Footer";




const Home1 = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  useEffect(() => {

    axios.get('https://admin-rust-gamma.vercel.app/verify')
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
  return (
    <div className="home-container App">
      <Navbar />
      <div className="home-banner-container">

        <div className="home-text-section">
          <h1 className="primary-heading">
            Thank you joining Us in Nfonap !
          </h1>
          <p className="primary-text">
            Here is our institution managment platform. You are welcome.
          </p>
          <button className="secondary-button1">
            Who are you ? <FiArrowRight />
          </button>
          <div className="secondary-button">
            <button className="secondary-button" onClick={() => { navigate('/adminlogin') ,window.location.reload()}}>
              Admin
            </button>
            <button className="secondary-button" onClick={() => { navigate('/login'),window.location.reload() }}>
              Student
            </button>
            <button className="secondary-button" onClick={() => { navigate('/logintostaff'),window.location.reload() }}>
              Teacher
            </button>
            <button className="secondary-button" onClick={() => { navigate('/commun'),window.location.reload() }}>
              Delegate
            </button>
            <button className="secondary-button" onClick={() => { navigate('/loginbank'),window.location.reload() }}>
              Bank
            </button>
          </div> <br />
          <div className="secondary-button">
            <button className="secondary-button2">
              Resgister <FiArrowRight />
            </button>
            <button className="secondary-button" onClick={() => { navigate('/studentreg'),window.location.reload() }}>
              Student
            </button>
            <button className="secondary-button" onClick={() => { navigate('/verifkey'),window.location.reload() }}>
              Teacher
            </button>
          </div>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
      <About />
      <Work />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home1;
