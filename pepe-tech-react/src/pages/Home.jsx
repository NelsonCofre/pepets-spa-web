import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { FaBath, FaCut, FaDog } from "react-icons/fa";
import "./Home.css";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAgendar = () => navigate("/servicios");

  const servicios = [
    {
      icon: <FaBath size={50} />,
      title: "Baños Relajantes",
      desc: "Baños profesionales con productos hipoalergénicos y aromáticos."
    },
    {
      icon: <FaCut size={50} />,
      title: "Cortes de Pelo",
      desc: "Estilistas expertos para un look moderno y saludable."
    },
    {
      icon: <FaDog size={50} />,
      title: "Alojamiento",
      desc: "Estancias cómodas y seguras para tu compañerito."
    },
  ];

  return (
    <div className="home-page">

      {/* HERO */}
      <section className="hero">
        <h1>¡Bienvenido, {user?.username}!</h1>
        <p>
          En <strong>Pepets SPA</strong>, tu mascota encuentra el cuidado y cariño que merece.
        </p>

        <button className="btn-hero" onClick={handleAgendar}>
          Reservar Ahora
        </button>
      </section>

      {/* HISTORIA */}
      <section className="historia">
        <div className="historia-card">
          <h2>Nuestra Historia</h2>
          <p>
            Pepets SPA nació con el sueño de entregar un espacio seguro y acogedor para cada mascota.
            Brindamos bienestar con profesionalismo y mucho amor.
          </p>
          <p>
            Desde baños relajantes hasta cortes especializados, nuestro equipo se encarga de ofrecer la
            mejor experiencia posible. ¡Gracias por confiar en nosotros!
          </p>
        </div>
      </section>

      {/* SERVICIOS DESTACADOS */}
      <section className="servicios-home">
        {servicios.map((s, i) => (
          <div
            className="serv-home-card"
            key={i}
            onClick={() => navigate("/servicios")}
          >
            <div className="icono">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </section>

    </div>
  );
}

export default Home;
