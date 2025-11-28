import { useState, useEffect } from "react";

function Perfil() {
  const [usuario, setUsuario] = useState({
    nombre: "Usuario Pepets",
    email: "usuario@ejemplo.com",
    password: "123456",
  });

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioGuardado) setUsuario(usuarioGuardado);
  }, []);

  const handleChange = (e) => setUsuario({ ...usuario, [e.target.name]: e.target.value });

  const guardarCambios = () => {
    localStorage.setItem("usuario", JSON.stringify(usuario));
    alert("Perfil actualizado ✅");
  };

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <h2>Perfil del Usuario</h2>
        <p>Aquí puedes ver y editar la información de tu cuenta 🧑‍💻</p>

        <div className="perfil-inputs">
          <label>Nombre:</label>
          <input type="text" name="nombre" value={usuario.nombre} onChange={handleChange} />

          <label>Email:</label>
          <input type="email" name="email" value={usuario.email} onChange={handleChange} />

          <label>Contraseña:</label>
          <input type="password" name="password" value={usuario.password} onChange={handleChange} />
        </div>

        <button className="perfil-btn" onClick={guardarCambios}>
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}

export default Perfil;
