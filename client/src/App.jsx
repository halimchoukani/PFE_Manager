import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import AdminHome from "./Admin/AdminHome";
import AdminLogin from "./Admin/AdminLogin";
import AdminRegister from "./Admin/AdminRegister";
import io from "socket.io-client";
import "./index.css";

const socket = io.connect("http://localhost:3001");

function App() {
  const [count, setCount] = useState(0);

  socket.on("connect", () => {
    console.log("connected");
  });

  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/register" element={<AdminRegister />} />
      </Routes>
    </>
  );
}

export default App;
