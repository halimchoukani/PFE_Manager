import { Routes, Route, Form } from "react-router-dom";
import AdminHome from "./Admin/AdminHome";
import AdminLogin from "./Admin/AdminLogin";
import AdminRegister from "./Admin/AdminRegister";
import io from "socket.io-client";
import "./index.css";
import EtudiantLogin from "./Etudiant/EtudiantLogin";
import EtudiantRegister from "./Etudiant/EtudiantRegister";
import { Acceuil } from "./Acceuil";
import { FormulaireStage } from "./Etudiant/FormulaireStage";
import TableauFichePfe from "./Enseignant/TableauFichePfe";
import Etudiants from "./Etudiant/Etudiants";
import Encadrants from "./Enseignant/Encadrants";
import EnseignantLogin from "./Enseignant/EnseignantLogin";

const socket = io.connect("http://localhost:3001");

function App() {
  socket.on("connect", () => {
    console.log("connected");
  });

  return (
    <>
      <Routes>
        <Route path="/*" element={<AdminHome />} />
        <Route path="/" element={<Acceuil />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/etudiant/register" element={<EtudiantRegister />} />
        <Route path="/etudiant" element={<FormulaireStage />} />
        <Route path="/encadrant" element={<TableauFichePfe />} />
        <Route path="/etudiant/login" element={<EtudiantLogin />} />
        <Route path="/encadrant/login" element={<EnseignantLogin />} />
      </Routes>
    </>
  );
}

export default App;
