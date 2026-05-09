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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth")) || "";
    if (token) {
      toast.info("You are already logged in.");
      navigate("/dashboard");
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
      const response = await axios.post('https://olumsx-backend-deploy-new.vercel.app/api/user/login', formInput);
      console.log(response);

      console.log("----SET-----");
      console.log(response.data);
      console.log("------------");

      dispatch(setUser(response.data.user_id, response.data.user_type));
      toast.success("Welcome back!");

      if (response.data.user_type === "Manager") {
        // window.location.href = 'https://admin-ibrahim-cypher10-edvances-projects.vercel.app/dashboard';
        window.location.href = 'https://admin-tau-cyan.vercel.app/d';
      } else if (response.data.user_type === "Customer") {
        // window.location.href = 'https://customer-ibrahim-cypher10-edvances-projects.vercel.app/?_vercel_share=yi5hoIbxrzzAFeM9PpXuiEoAPgCVBJ6n';
        window.location.href = 'https://customer-theta.vercel.app/';
      }
      else if (response.data.user_type === "Vendor") {
        window.location.href = 'https://vendor-five-delta.vercel.app/';
      }

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