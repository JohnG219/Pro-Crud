import React from "react";
import "./register.css";
import { useState } from "react";
import axios from "axios";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Alert } from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@material-ui/core";

const Register = () => {
  const [username, setUsername] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [sex, setSex] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleUserame = (e) => {
    setUsername(e.target.value);
    setSubmitted(false);
  };

  const handleSurname = (e) => {
    setSurname(e.target.value);
    setSubmitted(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };


  const showAlert = (message) => {
    setAlertMessage(message);
  };

  const hideAlert = () => {
    setAlertMessage(null);
  };

  // Handling the password change
  const handlePassword = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setSubmitted(false);

    const isValidPassword = passwordValue.length >= 6;
    const passwordInput = e.target;
    setError(!isValidPassword);

    if (!isValidPassword) {
      passwordInput.setCustomValidity(
        "Password must be at least 6 characters long"
      );
    } else {
      passwordInput.setCustomValidity("");
    }
    passwordInput.reportValidity();
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
    setSubmitted(false);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
    setSubmitted(false);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
    setSubmitted(false);
  };

  const handleBirthdate = (e) => {
    setBirthdate(e.target.value);
    setSubmitted(false);
  };

  const handleSex = (e) => {
    setSex(e.target.value);
    setSubmitted(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password.length < 6) {
      setError(true);
      setLoading(false);
      return;
    }
    try {
      const newUser = {
        username,
        surname,
        email,
        password,
        country,
        city,
        phone,
        birthdate,
        sex,
        ...info,
      };

      await axios.post("/auth/register", newUser);
      setSubmitted(true);
      setInfo({
        severity: "success",
        message: "Your Registration has been Successful!🎉",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000); 
    } catch (err) {
      console.log(err);
      setAlertMessage("Error, please fill each field");
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <body className="regBody12">
        <div className="registerr123">
        {alertMessage && (
          <div className="custom-alert">
            <p>{alertMessage}</p>
            <button onClick={hideAlert}>OK</button>
          </div>
        )}
          <NavLink to="/login" className="close-button1" onClick={handleCancel}>
            <CloseIcon />
          </NavLink>
          <h1 className="reTitle">Sign Up</h1>
          <div className="inputs32">
            {info.message && (
              <Alert
                severity={info.severity}
                onClose={() => setInfo({})}
                sx={{
                  width: "100%",
                  maxWidth: "400px",
                  fontSize: "14px",
                  position: "fixed",
                  left: "33%",
                  top: "35%",
                }}
              >
                {info.message}
              </Alert>
            )}

            <input
              onChange={handleUserame}
              className="rInput"
              type="text"
              id="username"
              placeholder="First Name"
            />
            <input
              onChange={handleSurname}
              className="rInput"
              type="text"
              id="surname"
              placeholder="Surname"
            />
            <input
              onChange={handleEmail}
              type="email"
              id="email"
              className="rInput"
              placeholder="Email"
            />
            <input
              onChange={handlePassword}
              className={`rInput ${error ? "error" : ""}`}
              type="password"
              id="password"
              placeholder="Password"
              style={{ color: "black" }}
            />
            <input
              onChange={handleCountry}
              className="rInput"
              type="text"
              id="country"
              placeholder="Country"
            />
            <input
              onChange={handleCity}
              className="rInput"
              type="text"
              id="city"
              placeholder="City"
            />
            <input
              onChange={handlePhone}
              className="rInput"
              type="text"
              id="phone"
              placeholder="+12 439 867 89"
            />
            <input
              onChange={handleBirthdate}
              className="rInput1"
              type="date"
              id="birthdate"
              placeholder="Birthdate"
              onFocus={(e) => (e.currentTarget.type = "date")}
              onBlur={(e) => (e.currentTarget.type = "text")}
            />

            <label>
              <input
                className="rInput2"
                type="radio"
                name="sex"
                value="Male"
                onChange={handleSex}
              />
              Male
            </label>
            <label>
              <input
                className="rInput2"
                type="radio"
                name="sex"
                value="Female"
                onChange={handleSex}
              />
              Female
            </label>
            <br></br>    
            <button disabled={loading} onClick={handleClick} className="lButton">
            {loading ? (
              <CircularProgress size={17} color="white" />
            ) : (
              "Confirm"
            )}
          </button>
          </div>               
        </div>
      </body>
    </>
  );
};

export default Register;