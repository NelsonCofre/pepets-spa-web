import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./CrearCita.css";

export default function CrearCita() {
    const { servicioId } = useParams();
    const navigate = useNavigate();

    const [servicio, setServicio] = useState(null);
    const [mascotas, setMascotas] = useState([]);

    const [mascotaId, setMascotaId] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");

    // Cargar servicio
    useEffect(() => {
        axios.get(`http://localhost:8085/api/servicios/${servicioId}`)
            .then(res => setServicio(res.data))
            .catch(err => console.log(err));
    }, [servicioId]);

    // Cargar mascotas del cliente logueado
    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("user"));
        if (!usuario) return;

        axios.get(`http://localhost:8083/api/mascotas/cliente/${usuario.id}`)
            .then(res => setMascotas(res.data))
            .catch(err => console.log(err));
    }, []);

    const crearCita = () => {
        if (!mascotaId || !fecha || !hora) {
            alert("Debes completar todos los campos.");
            return;
        }

        const usuario = JSON.parse(localStorage.getItem("user"));
        const data = {
            clienteId: usuario.id,
            mascotaId,
            servicioId,
            fecha,
            hora,
            estado: "pendiente"
        };

        axios.post("http://localhost:8085/api/citas", data)
            .then(() => {
                alert("Cita creada con éxito");
                navigate("/servicios");
            })
            .catch(err => console.log(err));
    };

    if (!servicio) return <p>Cargando...</p>;

    return (
        <div className="crear-cita-container">
            <button 
                className="btn-volver"
                onClick={() => navigate("/servicios")}
            >
                ← Volver a Servicios
            </button>

            <h2>Crear Cita</h2>

            <div className="resumen-servicio">
                <img 
                    src={servicio.imagenUrl}
                    alt={servicio.nombre}
                />
                <div>
                    <h3>{servicio.nombre}</h3>
                    <p>{servicio.descripcion}</p>
                    <p><strong>Precio:</strong> ${servicio.precio}</p>
                    <p><strong>Duración:</strong> {servicio.duracionMin} min</p>
                </div>
            </div>

            <div className="form-cita">
                <label>Mascota:</label>
                <select value={mascotaId} onChange={(e) => setMascotaId(e.target.value)}>
                    <option value="">Seleccionar Mascota</option>
                    {mascotas.map(m => (
                        <option key={m.id} value={m.id}>{m.nombre}</option>
                    ))}
                </select>

                <label>Fecha:</label>
                <div 
                    className="input-fecha-wrapper"
                    onClick={() => document.getElementById("fecha").showPicker?.() || document.getElementById("fecha").focus()}
                >
                    <input
                        id="fecha"
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                    <span className="icon-calendar">📅</span>
                </div>

                <label>Hora:</label>
                <div 
                    className="input-hora-wrapper"
                    onClick={() => document.getElementById("hora").showPicker?.() || document.getElementById("hora").focus()}
                >
                    <input
                        id="hora"
                        type="time"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                    />
                    <span className="icon-clock">🕒</span>
                </div>

                <button className="btn-confirmar" onClick={crearCita}>
                    Confirmar Cita
                </button>
            </div>
        </div>
    );
}
