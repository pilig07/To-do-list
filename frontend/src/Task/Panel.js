import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/styles/panel.css";
import Insertar from "./Componentes/Insertar";

function Panel() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [lista, setLista] = useState([]);
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
    <div className="panel-container">
      <nav>
        <div className="wrapper">
          <div className="logo">
            <a href="#">To-do List</a>
          </div>
          <ul className="nav-links">
            <label for="close-btn" className="btn close-btn">
              <i className="fas fa-times"></i>
            </label>
            <li>
              <a>Bienvenido {user.name} </a>
            </li>
            <li onClick={handleLogout}>
              <a>Cerrar sesión</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="todo-list">
        <h2>To-do List</h2>
        <Insertar></Insertar>
        {lista.length === 0 ? (
          <div>
            <h2>No hay tareas pendientes</h2>
          </div>
        ) : (
          lista.map((item) => <div>{item}</div>)
        )}
      </div>
    </div>
  );
}

export default Panel;
