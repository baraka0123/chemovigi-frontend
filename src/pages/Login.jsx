import { useState } from "react";
import { login } from "../services/authService";
import { saveAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login(email, password);

      // save token + user
      saveAuth(data.token, data.user);

      alert("Login successful ✅");

      // role-based redirect
      if (data.user.role === "admin" || data.user.role === "clinician") {
        navigate("/clinician-dashboard");
      } else {
        navigate("/patient-dashboard");
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Invalid email or password"
      );
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

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
