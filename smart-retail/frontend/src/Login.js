import React, { useState } from "react";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  // Function to Register
  const register = async () => {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    setMsg(data.message);
  };

  // Function to Login
  const login = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
    } else {
      setMsg(data.message);
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Login or Register</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /><br />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br /><br />
      
      <button onClick={login} style={{ marginRight: "10px" }}>Login</button>
      <button onClick={register} style={{ backgroundColor: "#e1e1e1" }}>Register New User</button>
      
      <p style={{ color: "blue" }}>{msg}</p>
    </div>
  );
}

export default Login;