import React, { useEffect, useState } from "react";
import Image from "./bLogo.svg";
import Logo from "./loo.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("auth")) || "",
  );

  useEffect(() => {
    if (token) {
      toast.info("You are already registered and logged in.");
      const role = localStorage.getItem("user_type");
      const dest =
        role === "Manager"
          ? "/admin/dashboard"
          : role === "Vendor"
            ? "/vendor"
            : "/customer";
      navigate(dest);
    }
  }, [navigate]);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: e.target.username.value,
      first_name: e.target.name.value,
      last_name: e.target.lastname.value,
      email: e.target.email.value,
      password: e.target.password.value,
      user_type: e.target.user_type.value,
      address: e.target.address.value,
      gender: e.target.gender.value,
      DOB: e.target.dob.value,
    };

    if (formData.password !== e.target.confirmPassword.value) {
      toast.error("Passwords entered do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Registration successful.");
        navigate("/");
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.error || "Network error or server not responding",
        );
      }
    } catch (err) {
      toast.error("Network error or server not responding");
    }
  };

  return (
    <div className="register-main montserrat">
      <div className="register-left">
        <img src={Image} alt="Decorative image" />
      </div>
      <div className="register-right">
        <div className="register-right-container">
          <div className="register-logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="register-center montserrat">
            <h2>Welcome to OLumsX!</h2>
            <p>Please enter your credentials to register</p>
            <form onSubmit={handleRegisterSubmit}>
              <input
                type="text"
                placeholder="Username"
                name="username"
                required
              />
              <input
                type="text"
                placeholder="First Name"
                name="name"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                required
              />
              <input type="email" placeholder="Email" name="email" required />
              <select name="user_type" required>
                <option value="Customer">Customer</option>
                <option value="Manager">Manager</option>
                <option value="Vendor">Vendor</option>
              </select>
              <input
                type="text"
                placeholder="Address"
                name="address"
                required
              />
              <select name="gender" required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input type="date" name="dob" required />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  required
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  required
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              <button type="submit" style={{ transform: "translateY(10px)" }}>
                Submit
              </button>
            </form>
          </div>
          <p
            className="login-bottom-p"
            style={{ transform: "translateY(20px)" }}
          >
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
