import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { useMemo } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';

import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
// Theme
import { themeSettings } from "./theme";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./pages/Home/Home";
import Navbar from './components/Navbar/Navbar'
import Register from "./pages/Auth/Register/Register";
import OurTeam from "./components/Our Team/ourteam";
import NotFound from "./pages/NotFound/NotFound";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCartShopping, faGear, faHeart, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faHeart, faUser, faCartShopping, faGear, faMagnifyingGlass);

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
  crossorigin="anonymous"
/>

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
      <CssBaseline />
      {user ? <userNavbar /> : <Navbar />}

      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ourteam" element={<OurTeam />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
