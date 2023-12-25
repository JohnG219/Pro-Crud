import "./navbar.css";
import Logo from "./images/chef.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = (params) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const handleToggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };

  const handleProfileClick = () => {
    handleToggleProfileOptions();
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <div className="logostarter">
          <img className="logo" src={Logo} alt="" />
          <h1 className="lakan">Share Your Recipes</h1>
        </div>
        {user ? (
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span onClick={handleProfileClick} className="username">
              {" "}
              {user.username} {user.surname}
              {showProfileOptions && (
                <div className="navItems12">
                  <button
                    className="navButton1234"
                    onClick={handleToggleProfileOptions}
                  >
                    <NavLink
                      to="/profile"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <p id="showopt">Profile</p>
                    </NavLink>
                  </button>

                  <button className="navButton1234" onClick={handleClick}>
                    <p id="showopt">Logout</p>
                  </button>
                </div>
              )}
            </span>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton123">
              <NavLink
                to="/signup"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Sign up
              </NavLink>
            </button>

            <button className="navButton123">
              <NavLink
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Login
              </NavLink>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;