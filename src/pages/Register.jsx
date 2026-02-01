import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await register({ name, email, password });
      alert("Registered successfully! Now login.");
      navigate("/login");
    } catch (err) {
      console.error("Register error:", err);
      alert("Registration failed. Email may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Register</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <br />

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

      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
}

export default Register;
