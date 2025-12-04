import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { FaBath, FaCut, FaDog } from "react-icons/fa";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAgendar = () => navigate("/servicios");

  return (
    <div style={{ backgroundColor: "#e0f7fa", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #b3e5fc, #81d4fa)",
          padding: "5rem 2rem",
          textAlign: "center",
          borderBottomLeftRadius: "30px",
          borderBottomRightRadius: "30px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}
      >
        <h1 style={{ color: "#01579b", fontWeight: 700, fontSize: "2.5rem" }}>
          ¡Bienvenido, {user?.username}!
        </h1>
        <p style={{ fontSize: "1.2rem", marginTop: "1rem", color: "#0277bd" }}>
          Gracias por visitar <strong>Pepets SPA</strong>, el lugar donde tu mascota es nuestra prioridad.
        </p>
        <button
          onClick={handleAgendar}
          style={{
            marginTop: "2rem",
            padding: "1rem 2.5rem",
            fontSize: "1.2rem",
            backgroundColor: "#0288d1",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
            transition: "all 0.3s"
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#03a9f4")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#0288d1")}
        >
          Reservar Ahora
        </button>
      </section>

      {/* Historia */}
      <section style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "2rem auto" }}>
        <div style={{ borderRadius: "15px", backgroundColor: "#ffffff", padding: "3rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h2 style={{ color: "#0288d1", marginBottom: "1rem", fontSize: "2rem" }}>Nuestra Historia</h2>
          <p style={{ marginBottom: "1rem", lineHeight: "1.6", color: "#555" }}>
            Pepets SPA nació con el sueño de ofrecer un espacio seguro y acogedor para tus mascotas. Nuestro objetivo es brindarles cuidado, diversión y bienestar, combinando profesionalismo con mucho cariño.
          </p>
          <p style={{ lineHeight: "1.6", color: "#555" }}>
            Desde baños relajantes hasta cortes de pelo especializados, nuestro equipo se asegura de que tu mascota tenga la mejor experiencia posible. ¡Gracias por confiar en nosotros!
          </p>
        </div>
      </section>

      {/* Servicios */}
      <section
        style={{
          padding: "3rem 2rem",
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem"
        }}
      >
        {[
          { icon: <FaBath size={50} color="#0288d1" />, title: "Baños Relajantes", desc: "Tu mascota disfrutará de un baño profesional con productos suaves y aromáticos." },
          { icon: <FaCut size={50} color="#0288d1" />, title: "Cortes de Pelo", desc: "Estilistas expertos garantizan un look moderno y cómodo para tu amigo peludo." },
          { icon: <FaDog size={50} color="#0288d1" />, title: "Alojamiento", desc: "Estancias seguras y confortables para tus mascotas mientras disfrutas de tus actividades." }
        ].map((service, i) => (
          <div
            key={i}
            style={{
              borderRadius: "15px",
              backgroundColor: "#fff",
              padding: "2rem",
              textAlign: "center",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
              cursor: "pointer"
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {service.icon}
            <h3 style={{ color: "#0288d1", marginTop: "1rem", fontSize: "1.5rem" }}>{service.title}</h3>
            <p style={{ color: "#555", marginTop: "0.5rem" }}>{service.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
