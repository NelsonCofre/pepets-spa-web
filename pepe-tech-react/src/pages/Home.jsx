import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { FaBath, FaCut, FaDog } from "react-icons/fa";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAgendar = () => {
    navigate("/servicios");
  };

  return (
    <div style={{ backgroundColor: "#e0f7fa", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* Hero de bienvenida */}
      <section
        className="home-hero"
        style={{
          backgroundColor: "#b3e5fc",
          padding: "4rem 2rem",
          textAlign: "center",
          borderBottomLeftRadius: "30px",
          borderBottomRightRadius: "30px"
        }}
      >
        <h1 style={{ color: "#0288d1", fontWeight: 600 }}>¡Bienvenido, {user?.username}!</h1>
        <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
          Gracias por visitar <strong>Pepets SPA</strong>, el lugar donde tu mascota es nuestra prioridad.
        </p>
      </section>

      {/* Historia del SPA */}
      <section
        className="home-story"
        style={{
          padding: "3rem 2rem",
          maxWidth: "800px",
          margin: "2rem auto"
        }}
      >
        <div
          className="card p-4 shadow-sm"
          style={{ borderRadius: "12px", backgroundColor: "#fff" }}
        >
          <h2 style={{ color: "#0288d1", marginBottom: "1rem" }}>Nuestra Historia</h2>
          <p>
            Pepets SPA nació con el sueño de ofrecer un espacio seguro y acogedor para tus mascotas.
            Nuestro objetivo es brindarles cuidado, diversión y bienestar, combinando profesionalismo 
            con mucho cariño.
          </p>
          <p>
            Desde baños relajantes hasta cortes de pelo especializados, nuestro equipo se asegura de 
            que tu mascota tenga la mejor experiencia posible. ¡Gracias por confiar en nosotros!
          </p>
        </div>
      </section>

      {/* Servicios destacados */}
      <section
        className="home-services"
        style={{
          padding: "3rem 2rem",
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem"
        }}
      >
        <div className="card p-4 shadow-sm" style={{ borderRadius: "12px", backgroundColor: "#fff", textAlign: "center" }}>
          <FaBath size={50} color="#0288d1" />
          <h3 style={{ color: "#0288d1", marginTop: "1rem" }}>Baños Relajantes</h3>
          <p>Tu mascota disfrutará de un baño profesional con productos suaves y aromáticos.</p>
        </div>

        <div className="card p-4 shadow-sm" style={{ borderRadius: "12px", backgroundColor: "#fff", textAlign: "center" }}>
          <FaCut size={50} color="#0288d1" />
          <h3 style={{ color: "#0288d1", marginTop: "1rem" }}>Cortes de Pelo</h3>
          <p>Estilistas expertos garantizan un look moderno y cómodo para tu amigo peludo.</p>
        </div>

        <div className="card p-4 shadow-sm" style={{ borderRadius: "12px", backgroundColor: "#fff", textAlign: "center" }}>
          <FaDog size={50} color="#0288d1" />
          <h3 style={{ color: "#0288d1", marginTop: "1rem" }}>Alojamiento</h3>
          <p>Estancias seguras y confortables para tus mascotas mientras disfrutas de tus actividades.</p>
        </div>
      </section>

      {/* Botón Agendar */}
      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        <button
          onClick={handleAgendar}
          style={{
            padding: "1rem 2rem",
            fontSize: "1.2rem",
            backgroundColor: "#0288d1",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            transition: "0.3s"
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#03a9f4")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#0288d1")}
        >
          Agendar
        </button>
      </div>

    </div>
  );
}

export default Home;
