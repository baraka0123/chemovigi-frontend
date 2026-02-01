import { useState } from "react";
import { login } from "../services/authService";
import { saveAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await login(email, password);
      const data = response.data;

      // Save token + user
      saveAuth(data.token, data.user);

      if (data.user.role === "clinician") {
        navigate("/clinician-dashboard");
      } else {
        navigate("/patient-dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Invalid email or password. Please register first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}

export default Login;
