import axios from "axios";
import { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./profile.css";
import Logo from "./images/chef.png";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";

const Profile = () => {
  
  const handleclick = () => {
    navigate("/profile");
  };

  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString("en-US", options);
    return formattedDate;
  };

  return (
    <div className="mainContainer">
      <div className="contentArea">
        <div className="right">
          <h1>Profile</h1>
          <div className="details">
            <h1 className="itemTitle"></h1>
            <div className="detailItem">
              <span className="itemKey">Name:</span>
              <span className="itemValue">
                {user.username}
                &nbsp;
                {user.surname}
              </span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Gender:</span>
              <span className="itemValue">{user.sex}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Birthdate:</span>
              <span className="itemValue">{formatDate(user.birthdate)}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Email:</span>
              <span className="itemValue">{user.email}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Phone:</span>
              <span className="itemValue">{user.phone}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Country:</span>
              <span className="itemValue">{user.country}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">City:</span>
              <span className="itemValue">{user.city}</span>
            </div>
          </div>
        </div>

        <div className="left">
          <img className="logol" src={Logo} alt="" />
          <h1>Recipes Document</h1>
          <button id="btnnn1">
            <NavLink
              to="/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              HOME
            </NavLink>
          </button>

          <button id="btnnn1">
            <NavLink
              to="/update"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              UPDATE
            </NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
