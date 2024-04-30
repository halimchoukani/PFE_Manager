import { useState } from "react";
import AdminHome from "./Admin/AdminHome";
import AdminLogin from "./Admin/AdminLogin";
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
      <AdminLogin/>
      
      </>
    )
  
}

export default App;
