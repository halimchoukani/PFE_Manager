import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminLogin from "./AdminLogin"; // Assuming this is the correct import for AdminLogin
import AdminDashboard from "./AdminDashboard"; // Assuming this is the correct import for the Table component
import Comptes from "./Comptes"; // Assuming this is the correct import for the Comptes component
import Etudiants from "../Etudiant/Etudiants";
import Encadrants from "../Enseignant/Encadrants";
import { AddCin } from "./AddCin";
import Stages from "./Stages";
import StagesV from "./StagesV";
import StagesF from "./StagesF";
import EtudiantInterface from "./EtudiantInterface";
import EnseignantRegister from "../Enseignant/EnseignantRegister";
export default function AdminHome() {
  return (
    <div className="w-screen flex flex-row gap-3">
      <Routes>
        
      </Routes>
    </div>
  );
}
