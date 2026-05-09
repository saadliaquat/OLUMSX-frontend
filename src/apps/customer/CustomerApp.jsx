import "./App.css";
import "./customer-globals.css";
import { Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCartShopping,
  faGear,
  faHeart,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import ChatCustomer from "./pages/ChatCustomer";
import ChatVendor from "./pages/ChatVendor";
import FullDisplayChatCustomer from "./pages/FullDisplayChatCustomer";
import Wishlist from "./pages/Wishlist";
import CustomerOrderHistory from "./pages/CustomerOrderHistory";
import Profile from "./pages/Profile";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";

library.add(fab, faHeart, faUser, faCartShopping, faGear, faMagnifyingGlass);

// CustomerApp is mounted at "/customer/*" by the top-level App.jsx. Route
// paths are RELATIVE to that mount point (so "" \u2192 /customer, "cart" \u2192
// /customer/cart, etc.).
export default function CustomerApp() {
  return (
    <div className="customer-app">
      <CssBaseline />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="chatcustomer" element={<ChatCustomer />} />
        <Route path="profile" element={<Profile />} />
        <Route
          path="fullchatcustomer/:vendorID"
          element={<FullDisplayChatCustomer />}
        />
        <Route path="chatvendor" element={<ChatVendor />} />
        <Route path="customerorders" element={<CustomerOrderHistory />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="categorysearch/:category" element={<CategoryPage />} />
        <Route path="search/:searchquery" element={<SearchPage />} />
      </Routes>
    </div>
  );
}
