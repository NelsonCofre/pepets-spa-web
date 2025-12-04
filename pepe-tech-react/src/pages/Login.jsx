import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // 👈 agregamos Link
import { useAuth } from "../context/AuthContext.jsx";
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8081/api/clientes/login", {
                email,
                password
            });

            const usuario = res.data;

            if (usuario && usuario.id) {
                alert("✔️ Login exitoso");

                login(usuario);
                navigate("/home");
            } else {
                alert("Email o contraseña incorrecta");
            }

        } catch (error) {
            console.error(error);
            alert("Error al logearse");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Iniciar Sesión</h2>

                <form onSubmit={handleLogin}>

                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group password-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {password && (
                            <span
                                className="eye-icon"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    // Ojo cerrado
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
                                        stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M17.94 17.94A10.88 10.88 0 0 1 12 20c-5 0-9.27-3.11-11-7.5a11.63 11.63 0 0 1 5.17-6.11M1 1l22 22"></path>
                                        <path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5a3.5 3.5 0 0 0 2.47-1.03"></path>
                                    </svg>
                                ) : (
                                    // Ojo abierto
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
                                        stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                )}
                            </span>
                        )}
                    </div>


                    <button type="submit" className="login-btn">Ingresar</button>
                </form>

                {/* 👇 NUEVO: Link al registro */}
                <p className="register-text">
                    ¿No tienes una cuenta?{" "}
                    <Link to="/register" className="register-link">
                        Regístrate aquí
                    </Link>
                </p>
            </div>
        </div>
    );
}
