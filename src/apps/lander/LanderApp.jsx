import "./App.css";
import "./lander-globals.css";
import { Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCartShopping,
  faGear,
  faHeart,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Register from "./pages/Auth/Register/Register";
import OurTeam from "./components/Our Team/ourteam";
import NotFound from "./pages/NotFound/NotFound";

library.add(fab, faHeart, faUser, faCartShopping, faGear, faMagnifyingGlass);

// LanderApp is mounted at "/*" by the top-level App.jsx. It owns the public
// routes ("/", "/register", "/ourteam"). It must NOT include its own
// <BrowserRouter> \u2014 a single router lives at the top of the tree.
export default function LanderApp() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="lander-app">
      <CssBaseline />
      {user ? null : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="ourteam" element={<OurTeam />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
