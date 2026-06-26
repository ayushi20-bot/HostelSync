import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        const res = await API.post("/auth/login", {
        email,
        password
        });

        localStorage.setItem("token", res.data.token);

        alert("Login Successful");

        navigate("/dashboard");

    } catch (error) {
  console.log("FULL ERROR:", error);
  console.log("SERVER RESPONSE:", error.response?.data);

  alert(JSON.stringify(error.response?.data));
}
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;