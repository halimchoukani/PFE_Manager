import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import AdminHome from "./Admin/AdminHome";
import AdminLogin from "./Admin/AdminLogin";
import AdminRegister from "./Admin/AdminRegister";
import io from "socket.io-client";
import "./index.css";
import EtudiantLogin from "./Etudiant/EtudiantLogin";
import EtudiantRegister from "./Etudiant/EtudiantRegister";
import { Acceuil } from "./Acceuil";

const socket = io.connect("http://localhost:3001");

function App() {
  const [count, setCount] = useState(0);

  socket.on("connect", () => {
    console.log("connected");
  });

  return (
    <>
      <Routes>
        <Route path="/*" element={<AdminHome />} />
        <Route path="/" element={<Acceuil />} />
        <Route path="/etudiant/register" element={<EtudiantRegister />} />
        <Route path="/etudiant/login" element={<EtudiantLogin />} />
        <Route path="/register" element={<AdminRegister />} />
      </Routes>
    </>
  );
}

export default App;
