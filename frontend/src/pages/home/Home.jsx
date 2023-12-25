import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Posts from "../../components/Posts/Posts";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./home.css";
import Fea0 from "./images/fea0.jpg";
import Fea1 from "./images/fea1.jpg";
import Fea2 from "./images/fea2.jpg";
import Fea3 from "./images/fea3.jpg";
import Fea4 from "./images/fea4.jpg";
import Fea5 from "./images/fea5.jpg";
import Fea6 from "./images/fea6.jpg";
import Fea7 from "./images/fea7.jpg";
import Fea8 from "./images/fea8.jpg";

const Home = () => {
  const [featuredImages, setFeaturedImages] = useState([Fea0, Fea1, Fea2]);

  useEffect(() => {
    const cycleImages = () => {
      const firstSetTimeout = setTimeout(() => {
        setFeaturedImages([Fea3, Fea4, Fea5]);
      }, 5000);

      const secondSetTimeout = setTimeout(() => {
        setFeaturedImages([Fea6, Fea7, Fea8]);

        const resetTimeout = setTimeout(() => {
          setFeaturedImages([Fea0, Fea1, Fea2]);
          cycleImages();
        }, 5000);

        return () => clearTimeout(resetTimeout);
      }, 15000);

      return () => {
        clearTimeout(firstSetTimeout);
        clearTimeout(secondSetTimeout);
      };
    };

    cycleImages();
  }, []);

  return (
    <div>
      <Navbar />
      <Posts />
      <div className="homeContainer">
        <div className="postsContainer">
          {featuredImages.map((image, index) => (
            <img key={index} className="featuredPhoto" src={image} alt="" />
          ))}
        </div>

        <h1 className="homeTitle1">WELCOME TO PRO CRUD</h1>

        <Footer />
      </div>
    </div>
  );
};

export default Home;