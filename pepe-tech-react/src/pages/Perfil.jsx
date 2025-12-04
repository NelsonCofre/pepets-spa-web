import { useState, useEffect } from "react";
import axios from "axios";
import "./Perfil.css";

function Perfil() {
  const [cliente, setCliente] = useState(null);
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const API_CLIENTES = "http://localhost:8081/api/clientes";

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"));
    if (!token || !token.id) {
      console.error("No hay usuario en localStorage");
      setLoading(false);
      return;
    }

    const fetchCliente = async () => {
      try {
        const res = await axios.get(`${API_CLIENTES}/${token.id}`);
        setCliente(res.data);
      } catch (error) {
        console.error("Error al obtener cliente", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCliente();
  }, []);

  const actualizarPassword = async () => {
    if (!nuevaPassword.trim()) {
      alert("La contraseña no puede estar vacía ❌");
      return;
    }

    try {
      const body = {
        nombre: cliente.nombre, // obligatorio
        email: cliente.email,   // obligatorio
        password: nuevaPassword // solo cambia la contraseña
      };

      const res = await axios.put(`${API_CLIENTES}/${cliente.id}`, body);

      alert("Contraseña actualizada ✔️");
      setCliente(res.data);
      setNuevaPassword("");

    } catch (error) {
      alert("No se pudo actualizar ❌");
      console.error(error);
    }
  };

  if (loading) return <p className="loading">Cargando perfil...</p>;
  if (!cliente) return <p className="error">No se pudo cargar el perfil</p>;

  return (
    <div className="perfil-container">
      <div className="perfil-card">

        <img
          className="perfil-img"
          src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
          alt="avatar"
        />

        <h2 className="perfil-titulo">Mi Perfil</h2>

        <div className="perfil-info">
          <p><strong>Nombre:</strong> {cliente.nombre}</p>
          <p><strong>Email:</strong> {cliente.email}</p>
        </div>

        <div className="perfil-inputs">
          <label>Nueva contraseña:</label>
          <input
            type="password"
            placeholder="Escribe una nueva contraseña"
            value={nuevaPassword}
            onChange={(e) => setNuevaPassword(e.target.value)}
          />
        </div>

        <button className="perfil-btn" onClick={actualizarPassword}>
          Guardar Contraseña
        </button>

      </div>
    </div>
  );
}

export default Perfil;
