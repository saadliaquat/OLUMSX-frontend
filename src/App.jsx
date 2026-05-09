import { Route, Routes } from "react-router-dom";

import LanderApp from "@lander/LanderApp";
import CustomerApp from "@customer/CustomerApp";
import VendorApp from "@vendor/VendorApp";
import AdminApp from "@admin/AdminApp";

// Top-level router. Each section owns its own subtree of routes; this file
// only decides where each section is mounted in the URL.
//
//   /              \u2192 Lander (also /register, /ourteam, /login, etc.)
//   /customer/*    \u2192 Customer (storefront)
//   /vendor/*      \u2192 Vendor portal
//   /admin/*       \u2192 Admin dashboard
export default function App() {
  return (
    <Routes>
      <Route path="/customer/*" element={<CustomerApp />} />
      <Route path="/vendor/*" element={<VendorApp />} />
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="/*" element={<LanderApp />} />
    </Routes>
  );
}
