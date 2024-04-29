import { useEffect } from "react";
import io from "socket.io-client";
export default function AdminHome() {
  function login() {
    const socket = io.connect("http://localhost:3001");
    socket.emit("login", {
      name: "admin",
      email: "admin@email.com",
      password: "admin",
    });
  }
  return (
    <div>
      <h1>Bonjour NOM</h1>
      <button onClick={login}>Login</button>
    </div>
  );
}
