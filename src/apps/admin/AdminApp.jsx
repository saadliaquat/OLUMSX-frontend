import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import { themeSettings } from "@admin/theme";
import {
  Layout,
  Dashboard,
  Products,
  Customers,
  Vendors,
  Overview,
  Daily,
  Monthly,
  Breakdown,
  Admin,
  Performance,
  PaidAdvertisements,
} from "@admin/scenes";

// AdminApp is mounted at "/admin/*" by the top-level App.jsx. Route paths are
// RELATIVE to that mount point. The Layout route wraps every Admin page so
// the sidebar + navbar render around <Outlet />.
export default function AdminApp() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="admin-app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<Customers />} />
            <Route path="vendors" element={<Vendors />} />
            <Route path="advertisements" element={<PaidAdvertisements />} />
            <Route path="overview" element={<Overview />} />
            <Route path="daily" element={<Daily />} />
            <Route path="monthly" element={<Monthly />} />
            <Route path="breakdown" element={<Breakdown />} />
            <Route path="admin" element={<Admin />} />
            <Route path="performance" element={<Performance />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}
