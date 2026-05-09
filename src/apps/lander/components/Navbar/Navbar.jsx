import Slider from "react-slick";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../../redux/action/userAction";
import Loader from "../Loader/Loader";
import "./Navbar.scss";
import logo from "./olumsX.png"
import logo2 from './olumsX-2.png';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosFetch from "../../utils/axiosFetch";
import axios from "axios";
import { toast } from "react-toastify";

const settings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <GrFormPrevious />,
  nextArrow: <GrFormNext />,
  speed: 1000,
  autoplay: true
};

const menuLinks = [
  { name: "Exclusive For The LUMS Community!" },
  { name: "Browse, Bargain, Benefit!" },
  { name: "Community of the students, by the students, for the students!" },
];

const Navbar = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const toggleMenu = () => {
      setShowMenu(window.scrollY > 0);
    };
    window.addEventListener("scroll", toggleMenu);
    return () => {
      window.removeEventListener("scroll", toggleMenu);
    };
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await axiosFetch.post("https://olumsx-backend-deploy-new.vercel.app/api/user/logout");
      localStorage.removeItem('user');
      dispatch(clearUser());
      navigate("/");
    } catch (error) {
      console.error('Logout failed:', error.response?.data);
      toast.error("Failed to log out. Please try again.");
    }
  }, [dispatch, navigate]);

  return (
    <nav className={showMenu || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
        <Link to="/" className="link">
            <div className="left">
              {!showMenu && pathname === "/" ? (
                <img src={logo2} alt="OlumsX Logo" style={{ width: '100px', height: 'auto' }} />
              ) : (
                <img src={logo} alt="OlumsX Logo" style={{ width: '100px', height: 'auto' }} />
              )}
            </div>
          </Link>
        </div>
        <div className="links">
          <div className="menu-links">
            <Link to="/ourteam" className="link">Our Team</Link>
          </div>
          {isLoading ? <Loader size={35} /> : (
            user ? (
              <div className="user" onClick={() => setShowPanel(!showPanel)}>
                <img src={user.image || "/media/noavatar.png"} alt="User avatar" />
                <span>{user.username}</span>
                {showPanel && (
                  <div className="options">
                    <Link className="link" to="/profile">Profile</Link>
                    <Link className="link" to="/settings">Settings</Link>
                    <button className="link" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <span><Link to="/" className="link">Sign in</Link></span>
                <button className={showMenu || pathname !== "/" ? "join-active" : ""}>
                  <Link to="/register" className="link">Join</Link>
                </button>
              </>
            )
          )}
        </div>
      </div>
      {(showMenu || pathname !== "/") && (
        <>
          <hr />
          <Slider className="menu " {...settings}>
            {menuLinks.map(({ name }) => (
              <div key={name} className="menu-item">
                {name}
              </div>
            ))}
          </Slider>
        </>
      )}
    </nav>
  );
};

export default Navbar;
