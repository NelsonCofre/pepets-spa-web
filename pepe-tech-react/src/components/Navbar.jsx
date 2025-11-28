import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { FaPaw } from "react-icons/fa";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FaPaw style={{ marginRight: "0.5rem" }} />
        Pepets SPA
      </div>

      {user && (
        <div className="navbar-links">
          <NavLink to="/home" className="nav-link">Home</NavLink>
          <NavLink to="/servicios" className="nav-link">Servicios</NavLink>
          <NavLink to="/citas" className="nav-link">Citas</NavLink>
          <NavLink to="/mascotas" className="nav-link">Mascotas</NavLink>
          <NavLink to="/perfil" className="nav-link">Perfil</NavLink>
          <button className="btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
