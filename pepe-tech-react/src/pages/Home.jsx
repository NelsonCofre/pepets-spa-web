import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import {
  FaBath,
  FaCut,
  FaDog,
  FaStar,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useState } from "react";
import "./Home.css";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const servicios = [
    {
      icon: <FaBath />,
      title: "Baños Relajantes",
      desc: "Baños con productos hipoalergénicos y aromaterapia.",
    },
    {
      icon: <FaCut />,
      title: "Cortes Profesionales",
      desc: "Estilo, higiene y cuidado para cada raza.",
    },
    {
      icon: <FaDog />,
      title: "Alojamiento Seguro",
      desc: "Comodidad, vigilancia y amor garantizado.",
    },
  ];

  const images = [
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
    "https://images.unsplash.com/photo-1558788353-f76d92427f16",
    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d",
    "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb",
  ];

  const [index, setIndex] = useState(0);

  const prev = () => setIndex((index - 1 + images.length) % images.length);
  const next = () => setIndex((index + 1) % images.length);

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <span className="hero-badge">
            <FaStar /> Servicio Premium
          </span>

          <h1>
            ¡Hola <span>{user?.username}</span>!
          </h1>

          <p>
            En <strong>Pepets SPA</strong> cuidamos a tu mascota como parte de
            nuestra familia.
          </p>

          <div className="hero-buttons">
            <button
              className="btn primary"
              onClick={() => navigate("/servicios")}
            >
              Reservar ahora
            </button>
            <button
              className="btn secondary"
              onClick={() => navigate("/servicios")}
            >
              Ver servicios
            </button>
          </div>
        </div>

        {/* CARRUSEL */}
        <div className="carousel">
          <img src={images[index]} alt="Perrito feliz" />

          <button className="nav left" onClick={prev}>
            <FaChevronLeft />
          </button>
          <button className="nav right" onClick={next}>
            <FaChevronRight />
          </button>

          <div className="dots">
            {images.map((_, i) => (
              <span
                key={i}
                className={i === index ? "dot active" : "dot"}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="valores">
        <div className="valor-card">
          <FaHeart />
          <h3>Amor</h3>
          <p>Cuidamos a cada mascota con dedicación y respeto.</p>
        </div>

        <div className="valor-card">
          <FaStar />
          <h3>Calidad</h3>
          <p>Profesionales certificados y productos premium.</p>
        </div>

        <div className="valor-card">
          <FaDog />
          <h3>Confianza</h3>
          <p>Un espacio seguro para tu mejor amigo.</p>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="servicios">
        <h2>Servicios Destacados</h2>

        <div className="servicios-grid">
          {servicios.map((s, i) => (
            <div
              className="servicio-card"
              key={i}
              onClick={() => navigate("/servicios")}
            >
              <div className="icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="card-cta">Agendar →</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
