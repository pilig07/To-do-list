import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/App.css";

function Panel() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:1337/api/panel", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = await response.json();

      if (data.status === "ok") {
        setUser(data.user);
      } else {
        alert("No autorizado");
        navigate("/login");
      }
    }

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Cargando...</div>;
  }
  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar el token
    navigate("/login"); // Redirigir al login
  };
  return (
    <div>
      <h1>Bienvenido, {user.name}</h1>
      <p>Correo electrónico: {user.email}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>{" "}
      {/* Botón de logout */}
    </div>
  );
}

export default Panel;
