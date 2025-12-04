import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Mientras carga la sesión, mostrar algo o nada
  if (loading) return <p>Cargando...</p>; // 🔹 puedes poner un spinner si quieres

  // Si no hay usuario, redirigir al login
  if (!user) return <Navigate to="/login" replace />;

  // Si hay usuario, renderizar la ruta protegida
  return children;
};

export default ProtectedRoute;
