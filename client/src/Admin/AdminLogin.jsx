import React, { useState } from "react";
import io from "socket.io-client";

export default function AdminLogin() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function registerAdmin() {
    const socket = io.connect("http://localhost:3001");
    socket.emit("register_admin", {
      nom: "admin",
      prenom: "admin",
      email: email,
      password: password,
    });
    socket.on("register_admin_success", (data) => {
      console.log(data);
    });
    socket.on("register_admin_error", (data) => {
      console.log(data);
    });
  }

  return (
    <div>
      <h1>Admin Registration</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={registerAdmin}>Register</button>
    </div>
  );
}
