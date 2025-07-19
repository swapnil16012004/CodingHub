import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import codinghubLogo from "../../assets/codinghub.png";
import axiosInstance from "../../../axiosConfig";

const SignUp = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
      const response = await axiosInstance.post("/signup", formData);
      context.setIsLoggedIn(true);
      context.setCurrUser(response.data.user);
      context.setFlashMessage(response.data.message);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
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
      <div className="auth-box d-flex flex-column">
        <h2>Create Account</h2>
        <form method="post" onSubmit={handlesubmit}>
          <input
            type="text"
            placeholder="Full Name"
            name="username"
            required
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
