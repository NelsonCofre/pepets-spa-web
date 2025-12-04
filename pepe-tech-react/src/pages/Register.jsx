import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8081/api/clientes/register",
        {
          nombre: username,
          email: email,
          password: password,
        }
      );

      if (res.status === 200 || res.status === 201) {
        alert("Usuario registrado correctamente");
        navigate("/login");
      } else {
        setError("No se pudo registrar el usuario");
      }
    } catch (err) {
      console.error(err);

      if (err.response) {
        if (err.response.status === 409) setError("El usuario ya existe");
        else if (err.response.status === 400) setError("Datos inválidos");
        else setError(err.response.data?.message || "Error del servidor");
      } else if (err.request) setError("El servidor no responde (¿está encendido?)");
      else setError("Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="register-input-group">
            <input
              type="text"
              placeholder="Nombre de Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="register-input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Contraseña */}
          <div className="register-input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password && (
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.88 10.88 0 0 1 12 20c-5 0-9.27-3.11-11-7.5a11.63 11.63 0 0 1 5.17-6.11M1 1l22 22"></path>
                    <path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5a3.5 3.5 0 0 0 2.47-1.03"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </span>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div className="register-input-group password-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPassword && (
              <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.88 10.88 0 0 1 12 20c-5 0-9.27-3.11-11-7.5a11.63 11.63 0 0 1 5.17-6.11M1 1l22 22"></path>
                    <path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5a3.5 3.5 0 0 0 2.47-1.03"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </span>
            )}
          </div>

          <button className="register-btn" type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrar"}
          </button>

          {error && <p style={{ color: "red", marginTop: "0.6rem" }}>{error}</p>}
        </form>

        <p className="register-text">
          ¿Ya tienes cuenta?{" "}
          <Link className="register-link" to="/login">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
