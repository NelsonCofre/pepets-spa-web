import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./Citas.css";

export default function Citas() {
  const { user } = useAuth();
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_CITAS = "http://localhost:8085/api/citas";
  const API_MASCOTAS = "http://localhost:8083/api/mascotas";
  const API_SERVICIOS = "http://localhost:8085/api/servicios";

  const cargarCitas = async () => {
    try {
      const res = await axios.get(`${API_CITAS}/cliente/${user.id}`);
      const citasBase = res.data;

      // 🟦 Cargar datos adicionales mascota + servicio + imagen
      const citasConDatos = await Promise.all(
        citasBase.map(async (cita) => {
          const mascotaRes = await axios.get(`${API_MASCOTAS}/${cita.mascotaId}`);
          const servicioRes = await axios.get(`${API_SERVICIOS}/${cita.servicioId}`);

          return {
            ...cita,
            mascotaNombre: mascotaRes.data.nombre,
            servicioNombre: servicioRes.data.nombre,
            precio: servicioRes.data.precio,
            imagenUrl: servicioRes.data.imagenUrl || "/placeholder-servicio.jpg",
          };
        })
      );

      setCitas(citasConDatos);
    } catch (err) {
      console.error(err);
      setError("Error al cargar las citas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setError("No hay sesión activa.");
      setLoading(false);
      return;
    }
    cargarCitas();
  }, [user]);

  const cancelarCita = async (id) => {
    if (!confirm("¿Seguro que deseas cancelar esta cita?")) return;

    try {
      await axios.delete(`${API_CITAS}/${id}`);
      setCitas((prev) => prev.filter((c) => c.id !== id));
      alert("Cita cancelada.");
    } catch (err) {
      alert("No se pudo cancelar la cita.");
    }
  };

  if (loading) return <p className="citas-loading">Cargando tus citas...</p>;
  if (error) return <p className="citas-error">{error}</p>;

  return (
    <div className="citas-container">
      <h2 className="citas-title">Mis Citas</h2>

      {citas.length === 0 ? (
        <p className="citas-empty">No tienes citas agendadas.</p>
      ) : (
        <div className="citas-grid">
          {citas.map((cita) => (
            <div key={cita.id} className="cita-card">

              {/* --- COLUMNA IZQUIERDA: IMAGEN --- */}
              <div className="cita-left">
                <img
                  src={cita.imagenUrl}
                  alt={cita.servicioNombre}
                  className="cita-img"
                />
              </div>

              {/* --- COLUMNA DERECHA: INFO --- */}
              <div className="cita-right">
                <h4 className="cita-servicio">{cita.servicioNombre}</h4>

                <p className="cita-mascota">Mascota: {cita.mascotaNombre}</p>

                <p className="cita-fecha">
                  {cita.fecha} | {cita.hora}
                </p>

                {cita.precio && (
                  <p className="cita-precio">
                    ${Number(cita.precio).toLocaleString("es-CL")} CLP
                  </p>
                )}

                <button
                  className="btn-cancelar"
                  onClick={() => cancelarCita(cita.id)}
                >
                  Cancelar
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
