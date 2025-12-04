import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { FaPaw } from "react-icons/fa";

function Navbar() {
  const { user, logout, loading } = useAuth();
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

      {/* Mientras carga la sesión */}
      {loading ? (
        <div className="navbar-loading">Cargando...</div>
      ) : (
        <div className="navbar-links">
          {user ? (
            <>
              <NavLink to="/home" className="nav-link">Home</NavLink>
              <NavLink to="/servicios" className="nav-link">Servicios</NavLink>
              <NavLink to="/citas" className="nav-link">Citas</NavLink>
              <NavLink to="/mascotas" className="nav-link">Mascotas</NavLink>
              <NavLink to="/perfil" className="nav-link">Perfil</NavLink>
              <button className="btn-danger" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">Login</NavLink>
              <NavLink to="/register" className="nav-link">Registrarse</NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
