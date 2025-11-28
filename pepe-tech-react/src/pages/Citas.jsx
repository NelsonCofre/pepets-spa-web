import { useEffect, useState } from "react";

function Citas() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const citasGuardadas = JSON.parse(localStorage.getItem("citas")) || [];
    setCitas(citasGuardadas);
  }, []);

  const cancelarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    localStorage.setItem("citas", JSON.stringify(nuevasCitas));
    setCitas(nuevasCitas);
    alert("Cita cancelada");
  };

  return (
    <div
      style={{
        padding: "2rem 1rem",
        backgroundColor: "#e0f7fa",
        minHeight: "100vh",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          color: "#0288d1",
          marginBottom: "1.5rem",
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        Mis Citas
      </h2>

      {citas.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "1rem" }}>No tienes citas agendadas.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
          }}
        >
          {citas.map((cita) => (
            <div
              key={cita.id}
              style={{
                borderRadius: "10px",
                backgroundColor: "#fff",
                padding: "0.6rem",
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h4 style={{ color: "#0288d1", margin: "0.2rem 0", fontSize: "0.95rem" }}>
                  {cita.servicio}
                </h4>
                <p style={{ fontSize: "0.75rem", margin: "0.1rem 0" }}>
                  {cita.fecha} | {cita.hora}
                </p>
                {cita.precio && (
                  <p style={{ fontSize: "0.75rem", fontWeight: 600, margin: "0.1rem 0" }}>
                    ${cita.precio.toLocaleString("es-CL")} CLP
                  </p>
                )}
              </div>
              <button
                onClick={() => cancelarCita(cita.id)}
                style={{
                  marginTop: "0.4rem",
                  padding: "0.25rem 0.5rem",
                  fontSize: "0.7rem",
                  backgroundColor: "#d32f2f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  alignSelf: "center",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#f44336")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#d32f2f")}
              >
                Cancelar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Citas;
