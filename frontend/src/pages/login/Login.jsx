import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate, NavLink, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import { Alert } from "@mui/material";
import { CircularProgress } from "@material-ui/core";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    error: {
      email: false,
      password: false,
    },
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" />;
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: value,
      error: {
        ...prev.error,
        [id]: value.trim() === "",
      },
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setCredentials((prev) => ({
        ...prev,
        error: {
          email: !credentials.email,
          password: !credentials.password,
        },
      }));
      return;
    }

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("https://server-pro-crud.onrender.com/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleRegisterNowClick = () => {
    dispatch({ type: "RESET_ERROR" });
  };

  return (
    <body className="logBody">
      <div className="loginContainer">
      <h1 className="titleLog">PRO CRUD</h1>
        <div className="login">
          <div className="lContainer">
            <input
              type="text"
              placeholder="Email"
              id="email"
              onChange={handleChange}
              className={`lInput ${credentials.error.email ? "error" : ""}`}
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              className={`lInput ${credentials.error.password ? "error" : ""}`}
            />
            <button
              disabled={loading}
              onClick={handleClick}
              className="lButton"
            >
              {loading ? <CircularProgress size={17} color="white" /> : "Login"}
            </button>
          </div>
          {error && <span class="colorspan">{error.message}</span>}
          <br></br>
          <br></br>
          <span className="shr123">
            <NavLink
              to="/signup"
              style={{ color: "inherit", textDecoration: "none" }}
              onClick={handleRegisterNowClick}
            >
              <span className="sh1">don't have account? Sign up now</span>
            </NavLink>
            <br />
            <br />
          </span>
        </div>
      </div>
    </body>
  );
};

export default Login;
