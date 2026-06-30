import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);

      navigate("/dashboard");

    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 to-slate-200 flex items-center justify-center">
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

      <h1 className="text-3xl font-bold text-center mb-2">
        HostelSync
      </h1>

      <p className="text-gray-500 text-center mb-6">
        Login to your account
      </p>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-3 rounded-lg mb-4"
      />

      <div className="relative mb-4">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-3 rounded-lg"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-3 text-sm text-blue-600"
      >
        {showPassword ? "Hide" : "Show"}
      </button>
      </div>

      {error && (
        <p className="text-red-500 mb-4 text-sm">
          {error}
        </p>
      )}

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

    </div>
  </div>
);
}

export default Login;