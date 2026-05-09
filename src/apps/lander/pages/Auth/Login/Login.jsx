import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from '../../../redux/action/userAction';
import Cookie from 'js-cookie';

import picture from './loo.svg';
import './Login.scss';

// Map a user role to its in-app landing route. Used by both the
// "already logged in" effect and the post-login redirect.
const routeForRole = (role) => {
  switch (role) {
    case "Manager":
      return "/admin/dashboard";
    case "Vendor":
      return "/vendor";
    case "Customer":
      return "/customer";
    default:
      return "/customer";
  }
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth")) || "";
    if (token) {
      toast.info("You are already logged in.");
      navigate(routeForRole(localStorage.getItem("user_type")));
    }
  }, [navigate]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formInput = {
      email: event.target.email.value.trim(),
      password: event.target.password.value.trim(),
    };

    console.log(formInput)

    try {
      const response = await axios.post('http://localhost:3001/api/user/login', formInput);
      console.log(response);

      console.log("----SET-----");
      console.log(response.data);
      console.log("------------");

      dispatch(setUser(response.data.user_id, response.data.user_type));
      // Persist what the rest of the app expects in localStorage so the other
      // sections (Customer/Vendor/Admin) can read user_id / user_type after
      // a hard refresh, and so the "already logged in" effect can route the
      // user to the right section next time.
      localStorage.setItem("auth", JSON.stringify(true));
      localStorage.setItem("userId", response.data.user_id);
      localStorage.setItem("user_id", response.data.user_id);
      localStorage.setItem("user_type", response.data.user_type);
      toast.success("Welcome back!");

      navigate(routeForRole(response.data.user_type));

    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password.");
      } else {
        toast.error(error.response?.data?.error || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className='landing-page montserrat'>
      <div className="main-container">
        <div className="flex flex-col justify-center items-center text-center login-center2">
        <div className='image-container2'>
            <img src={picture} alt="lumsvector" />
          </div>
        </div>

        <div className="login-right montserrat">
          <div className="login-center">
            <h2>Sign in</h2>
            <p>Please login to your account</p>
            <form onSubmit={handleFormSubmit}>
              <input type="email" placeholder="Email" name="email" required />
              <div className="pass-input-div-login">
                <input className="pass-input" type={showPassword ? "text" : "password"} placeholder="Password" name="password" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="login-center-buttons">
                <button type="submit" disabled={loading}>Login</button>
              </div>
              <p style={{ transform: 'translateY(20px)' }}>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
            </form>
          </div>
        </div>

      </div>
    </div>
    </>
  )
}

export default Login