import React from "react";
import PickMeals from "../assets/f.png";
import ChooseMeals from "../assets/t.jpg";
import DeliveryMeals from "../assets/s.jpg";
import DeliveryMeals1 from "../assets/d.jpg";
import DeliveryMeal from "../assets/delivery-image.png";
import { FcDataRecovery } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";



const Work = () => {
  // const navigate = useNavigate()
  const workInfoData = [
    {
      image: PickMeals,
      title: "NFONAP-HIEPS",
      text: "Our campus. Our main campus is situated in Madagascar-Yaounde, Hit me up: 675324045/677442717/672868836 Register on : 675550570/672914291",
    },
    {
      image: ChooseMeals,
      title: "Staff",
      text: "We select quality engineers and lecturers for you!",
    },
    {
      image: DeliveryMeals,
      title: "Student's space",
      text: "Comfort, dicipline,hardwork,collaboration and Innovation are our keys ",
    },
    {
      image: DeliveryMeals1,
      title: "Delegate space",
      text: "Our classes monitors",
    },
    {
      image: DeliveryMeal,
      title: "Transparency",
      text: "You control evrything from anywere and anytime",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          Log in to your account or create your account.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p style={{'color': '#fe9e0d'}}>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
