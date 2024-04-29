import io from "socket.io-client";

export default function AdminLogin() {
  function login() {
    const socket = io.connect("http://localhost:3001");
    socket.emit("login", {
      name: "admin",
      email: "admin@gmail.com",
      password: "admin",
    });
  }
  return (
    <div>
      <form>
        <h1>Admin Login</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button onClick={login}>Login</button>
      </form>
    </div>
  );
}
