import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Servicios from "./pages/Servicios.jsx";
import Citas from "./pages/Citas.jsx";
import Perfil from "./pages/Perfil.jsx";
import CrearCita from "./pages/CrearCita.jsx";
import Mascotas from "./pages/Mascotas.jsx";



import "./App.css";



function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar />

        <div className="app-content">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/servicios"
              element={
                <ProtectedRoute>
                  <Servicios />
                </ProtectedRoute>
              }
            />
            <Route
              path="/citas"
              element={
                <ProtectedRoute>
                  <Citas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <Perfil />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reservar/:servicioId"
              element={
                <ProtectedRoute>
                  <CrearCita />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mascotas"
              element={
                <ProtectedRoute>
                  <Mascotas />
                </ProtectedRoute>
              }
            />


          </Routes>
        </div>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
