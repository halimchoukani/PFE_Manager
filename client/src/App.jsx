import { useState } from "react";
import AdminHome from "./Admin/AdminHome";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
function App() {
  const [count, setCount] = useState(0);

  socket.on("connect", () => {
    console.log("connected");
  });

  return (
    <>
      <AdminHome />
    </>
  );
}

export default App;
