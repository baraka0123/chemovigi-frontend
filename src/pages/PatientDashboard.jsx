import { getToken, getUser, logout } from "../utils/auth";
import { Navigate } from "react-router-dom";

function PatientDashboard() {
  const token = getToken();
  const user = getUser();

  if (!token) return <Navigate to="/login" />;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome {user.name}</h1>
      <p>Role: {user.role}</p>
      <button onClick={() => { logout(); window.location.href = "/login"; }}>
        Logout
      </button>
    </div>
  );
}

export default PatientDashboard;
