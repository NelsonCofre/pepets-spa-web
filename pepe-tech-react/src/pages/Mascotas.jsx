import { useState, useEffect } from "react";
import axios from "axios";
import "./Mascotas.css";

export default function Mascotas() {
  const [mascotas, setMascotas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [edad, setEdad] = useState("");
  const [editId, setEditId] = useState(null); // ID de la mascota a editar

  const usuario = JSON.parse(localStorage.getItem("user")); 
  const clienteId = usuario ? usuario.id : null;

  // Cargar mascotas del cliente logueado
  useEffect(() => {
    if (!clienteId) return;
    axios.get(`http://localhost:8083/api/mascotas/cliente/${clienteId}`)
      .then(res => setMascotas(res.data))
      .catch(err => console.error(err));
  }, [clienteId]);

  // Crear o actualizar mascota
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!usuario || !usuario.id) {
      alert("No se encontró el cliente. Por favor, inicia sesión.");
      return;
    }

    const mascotaData = {
      clienteId: clienteId,
      nombre: nombre,
      tipo: tipo,
      edad: parseInt(edad)
    };

    if (editId) {
      // Actualizar mascota
      axios.put(`http://localhost:8083/api/mascotas/${editId}`, mascotaData)
        .then(res => {
          setMascotas(mascotas.map(m => m.id === editId ? res.data : m));
          resetForm();
          // Scroll al top de la página
          window.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch(err => {
          console.error(err);
          alert("Error al actualizar la mascota.");
        });
    } else {
      // Crear nueva mascota
      axios.post("http://localhost:8083/api/mascotas/crear", mascotaData)
        .then(res => setMascotas([...mascotas, res.data]))
        .catch(err => {
          console.error(err);
          alert("Error al crear la mascota.");
        });
    }
  };

  // Preparar formulario para editar
  const handleEdit = (mascota) => {
    setNombre(mascota.nombre);
    setTipo(mascota.tipo);
    setEdad(mascota.edad);
    setEditId(mascota.id);
    
    // Scroll al top de la página
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Eliminar mascota
  const handleDelete = (id) => {
    if (!window.confirm("¿Seguro quieres eliminar esta mascota?")) return;

    axios.delete(`http://localhost:8083/api/mascotas/${id}`)
      .then(() => setMascotas(mascotas.filter(m => m.id !== id)))
      .catch(err => {
        console.error(err);
        alert("Error al eliminar la mascota.");
      });
  };

  // Resetear formulario
  const resetForm = () => {
    setNombre("");
    setTipo("");
    setEdad("");
    setEditId(null);
  };

  return (
    <div className="mascotas-container">

      {/* Crear / Editar Mascota */}
      <div className="crear-mascota-card">
        <h2>{editId ? "Editar Mascota" : "Registrar Nueva Mascota"}</h2>
        <form onSubmit={handleSubmit} className="form-mascota">
          <input 
            type="text" 
            placeholder="Nombre"
            value={nombre}
            required
            onChange={(e) => setNombre(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Tipo (Perro, Gato...)"
            value={tipo}
            required
            onChange={(e) => setTipo(e.target.value)}
          />
          <input 
            type="number" 
            placeholder="Edad"
            value={edad}
            required
            onChange={(e) => setEdad(e.target.value)}
          />
          <div className="form-buttons">
            <button type="submit">{editId ? "Actualizar" : "Agregar"}</button>
            {editId && <button type="button" onClick={resetForm}>Cancelar</button>}
          </div>
        </form>
      </div>

      {/* Listado Mascotas */}
      <div className="lista-mascotas-card">
        <h2>Mis Mascotas</h2>
        {mascotas.length === 0 ? (
          <p className="sin-mascotas">No tienes mascotas registradas aún.</p>
        ) : (
          <div className="mascotas-grid">
            {mascotas.map(m => (
              <div key={m.id} className="mascota-card">
                <div className="mascota-icon">🐾</div>
                <div className="mascota-info">
                  <h3>{m.nombre}</h3>
                  <p><strong>Tipo:</strong> {m.tipo}</p>
                  <p><strong>Edad:</strong> {m.edad} años</p>
                </div>
                <div className="mascota-actions">
                  <button onClick={() => handleEdit(m)}>✏️ Editar</button>
                  <button onClick={() => handleDelete(m.id)}>🗑️ Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
