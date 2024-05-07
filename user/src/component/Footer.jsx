import React from "react";
import Logo from "../assets/NFONAP1.png";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          <img src={Logo} alt="" />
        </div>
        <div className="footer-icons">
          <BsTwitter />
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
          <FaWhatsapp />
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          <span>Qualtiy</span>
          <span>Help</span>
          <span>Share</span>
          <span>Carrers</span>
          <span>Testimonials</span>
          <span>Work</span>
        </div>
        <div className="footer-section-columns">
          <span style={{'color': '#fe9e0d'}}>675550570 / 672914291</span>
          <span style={{'color': '#fe9e0d'}}>info@nfonap.education</span> <br />
          <span>our Engineer</span>
          <span style={{'color': '#fe9e0d'}}>678474295 / 694769482</span>
          <span style={{'color': '#fe9e0d'}}>royalsoftindustri@gmail.com</span>
        </div>
        <div className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
      <div class="row mt-5 mx-5 mb-2 copy">
        <p className='d-flex justify-content-center '><strong>Copy@right-2023 <span class="copyrighter">NFONAP-HIEPS</span>
          . Powered by Ets.<span class="copyrighter">RoyalSoft Insdustry</span>
        </strong> </p>
      </div>
    </div>
  );
};

export default Footer;
