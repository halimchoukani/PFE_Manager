import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminLogin from "./AdminLogin"; // Assuming this is the correct import for AdminLogin
import AdminDashboard from "./AdminDashboard"; // Assuming this is the correct import for the Table component
import Comptes from "./Comptes"; // Assuming this is the correct import for the Comptes component
export default function AdminHome() {
  return (
    <div className="w-screen flex flex-row gap-3">
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="comptes" element={<Comptes />} />
        </Route>
      </Routes>
    </div>
  );
}
