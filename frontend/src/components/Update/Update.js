import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Update.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Alert } from "@mui/material";
import { CircularProgress } from "@material-ui/core";

const Update = () => {
  const { user, error, dispatch } = useContext(AuthContext);
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [credentials1, setCredentials1] = useState({
    surname: undefined,
    password: undefined,
    username: undefined,
    country: undefined,
    city: undefined,
    phone: undefined,
  });

  const isPasswordRequired = () => {
    return (
      isButtonClicked &&
      (!credentials1.password || credentials1.password.length < 6)
    );
  };

  const navigate = useNavigate();

  const showAlert = (message) => {
    setAlertMessage(message);
  };

  const hideAlert = () => {
    setAlertMessage(null);
  };

  //   Handle Change Function
  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setCredentials1((prev) => ({ ...prev, [id]: value }));

    if (id === "password") {
      if (value.length < 6) {
        setPasswordError(true);
        e.target.setCustomValidity(
          "Password must be at least 6 characters long"
        );
      } else {
        setPasswordError(false);
        e.target.setCustomValidity("");
      }
      e.target.reportValidity();
    }
  };

  const handleClick9 = () => {
    navigate("/");
  };

  // Handle Click Function
  const handleClick = async (e) => {
    e.preventDefault();
    setIsButtonClicked(true);
    setLoading(true);

    if (credentials1.password && credentials1.password.length < 6) {
      setPasswordError(true);
      setLoading(false);
      return;
    }

    const updatedCredentials = { ...credentials1 };

    try {
      const res = await axios.put(
        `https://server-pro-crud.onrender.com/api/users/update/${user._id}`,
        updatedCredentials
      );

      dispatch({
        type: "LOGOUT",
      });

      setInfo({
        severity: "success",
        message: "Credentials Update Success!",
      });
      navigate("/");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.log(err);
      setAlertMessage("Old/New password is required!");
    } finally {
      setLoading(false);
    }
  };

  console.log(credentials1);

  return (
    <div className="login2">
      <div className="lContainer13">
        {alertMessage && (
          <div className="custom-alert">
            <p>{alertMessage}</p>
            <button onClick={hideAlert}>OK</button>
          </div>
        )}
        <button onClick={handleClick9} className="lButton300">
          Home
        </button>
        <div className="inputs">
          <span className="sp22">
            Update profile info, {user.username}&nbsp;{user.surname} <br></br>
          </span>
          <p id="oldpass">
            Required! type your old password or you can change your password as
            well.
          </p>
          {info.message && (
            <Alert
              severity={info.severity}
              onClose={() => setInfo({})}
              sx={{
                width: "100%",
                maxWidth: "400px",
                fontSize: "14px",
                position: "fixed",
                left: "37%",
                top: "20%",
              }}
            >
              {info.message}
            </Alert>
          )}

          <input
            type="username"
            className="lInput7"
            placeholder="First name"
            id="username"
            onChange={handleChange}
          />
          <input
            type="username"
            className="lInput7"
            placeholder="Last name"
            id="surname"
            onChange={handleChange}
          />
          <input
            type="tel"
            className="lInput7"
            placeholder="Contact#"
            id="phone"
            onChange={handleChange}
          />
          <input
            type="text"
            className="lInput7"
            placeholder="Country"
            id="country"
            onChange={handleChange}
          />
          <input
            type="text"
            className="lInput7"
            placeholder="City"
            id="city"
            onChange={handleChange}
          />
          <input
            type="password"
            className={`lInput7 ${isPasswordRequired() ? "error" : ""}`}
            placeholder="Password"
            id="password"
            onChange={handleChange}
            required
            disabled={error}
            style={{ color: "black" }}
          />
          <button disabled={loading} onClick={handleClick} className="lButton">
            {loading ? <CircularProgress size={17} color="white" /> : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
