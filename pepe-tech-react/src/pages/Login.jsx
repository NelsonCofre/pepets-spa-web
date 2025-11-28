import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth(); // 👈 usamos login()

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

                // Guardar usuario → Navbar aparece instantáneamente
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
                <h2>Pepets SPA</h2>
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

                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">Ingresar</button>
                </form>
            </div>
        </div>
    );
}
