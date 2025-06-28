import React, { useState } from "react";
import "./../styles/AuthPage.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setFormData({ email: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in:", formData);
    } else {
      console.log("Signing up:", formData);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span className="toggle-link" onClick={toggleForm}>
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
