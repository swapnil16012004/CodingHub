import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import codinghubLogo from "../../assets/codinghub.png";
import axiosInstance from "../../../axiosConfig";

const Login = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/login", formData);
      context.setIsLoggedIn(true);
      context.setCurrUser(response.data.user.username);
      localStorage.setItem("token", response.data.token);
      context.setFlashMessage(response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };
  useEffect(() => {
    if (context) {
      context.setShowNavbar(false);
    }
  }, [context]);
  return (
    <div className="auth-container">
      <div className="logoWrapper authLogo">
        <Link to="/">
          <img className="logo" src={codinghubLogo} />
        </Link>
      </div>
      <div className="auth-box d-flex flex-column loginbox">
        <h2>Welcome Back</h2>
        <form method="post" onSubmit={handlesubmit}>
          <input
            type="text"
            placeholder="Full Name"
            name="username"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
          <button type="submit">Log In</button>
        </form>
        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
