import "./App.css";
import "./vendor-globals.css";
import { Route, Routes } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCartShopping,
  faGear,
  faHeart,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import VendorHome from "./components/Vendor/vendorHome.js";
import VendorAddProduct from "./components/Vendor/vendorAddProduct.js";
import VendorViewOrders from "./components/Vendor/vendorViewOrders";
import VendorAddAdvertisement from "./components/Vendor/vendorAddAdvertisement";
import VendorChat from "./components/Vendor/vendorChat";
import Profile from "./components/Vendor/Profile";

library.add(fab, faHeart, faUser, faCartShopping, faGear, faMagnifyingGlass);

// VendorApp is mounted at "/vendor/*" by the top-level App.jsx.
export default function VendorApp() {
  return (
    <div className="vendor-app">
      <Routes>
        <Route path="" element={<VendorHome />} />
        <Route path="vendorAddProduct" element={<VendorAddProduct />} />
        <Route
          path="vendorAddAdvertisement"
          element={<VendorAddAdvertisement />}
        />
        <Route path="vendorChat" element={<VendorChat />} />
        <Route path="vendorViewOrder" element={<VendorViewOrders />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
