import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Servicios.css";

export default function Servicios() {
    const [servicios, setServicios] = useState([]);
    const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

    const navigate = useNavigate();

    // Cargar servicios
    useEffect(() => {
        axios.get("http://localhost:8085/api/servicios")
            .then(res => setServicios(res.data))
            .catch(err => console.log(err));
    }, []);

    // 🔥 Nueva función con validación de mascotas
    const irAReservar = async (servicioId) => {
        const usuario = JSON.parse(localStorage.getItem("user"));

        if (!usuario) {
            alert("Debes iniciar sesión para reservar.");
            return;
        }

        try {
            const res = await axios.get(
                `http://localhost:8083/api/mascotas/cliente/${usuario.id}`
            );

            if (res.data.length === 0) {
                alert("❗ No tienes mascotas registradas. Agrega al menos una para reservar.");
                navigate("/mascotas");
                return;
            }

            // Si tiene mascotas → continuar
            navigate(`/reservar/${servicioId}`);

        } catch (err) {
            console.error("Error al verificar mascotas:", err);
            alert("No se pudo verificar tus mascotas.");
        }
    };

   return (
    <div className="servicios-page">
        <div className="servicios-wrapper">
            <h2 className="titulo-servicios">Servicios Disponibles</h2>

            <div className="servicios-container">
                {servicios.map(s => (
                    <div
                        key={s.id}
                        className={`servicio-card ${servicioSeleccionado === s.id ? "selected" : ""}`}
                        onClick={() => {
                            setServicioSeleccionado(s.id);
                            irAReservar(s.id);
                        }}
                    >
                        <img
                            src={s.imagenUrl || "https://via.placeholder.com/300x200"}
                            alt={s.nombre}
                            className="servicio-img"
                        />

                        <h3 className="servicio-title">{s.nombre}</h3>
                        <p className="servicio-desc">{s.descripcion}</p>

                        <p className="servicio-precio">💸 ${s.precio}</p>
                        <p className="servicio-duracion">⏱ {s.duracionMin} min</p>

                        <button
                            className="btn-reservar"
                            onClick={(e) => {
                                e.stopPropagation();
                                irAReservar(s.id);
                            }}
                        >
                            Reservar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

}
