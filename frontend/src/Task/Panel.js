import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/styles/panel.css";
import Insertar from "./Componentes/Insertar";
import { GoDot } from "react-icons/go";
import { TiDeleteOutline } from "react-icons/ti";

function Panel() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [lista, setLista] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");

      // Obtener datos del usuario
      const userDataResponse = await fetch("http://localhost:1337/api/panel", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const userData = await userDataResponse.json();

      if (userData.status === "ok") {
        setUser(userData.user);

        // Obtener lista de tareas pendientes
        const taskListResponse = await fetch(
          "http://localhost:1337/api/lista",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        const taskListData = await taskListResponse.json();
        setLista(taskListData);
      } else {
        alert("No autorizado");
        navigate("/login");
      }
    }

    fetchData();
  }, [navigate]);

  if (!user) {
    return <div>Cargando...</div>;
  }
  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar el token
    navigate("/login"); // Redirigir al login
  };

  const EditTask = () => {};
  return (
    <div className="panel-container">
      <nav>
        <div className="wrapper">
          <div className="logo">
            <a href="#">To-do List</a>
          </div>
          <ul className="nav-links">
            <label htmlFor="close-btn" className="btn close-btn">
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
      <div className="todo-list container">
        <h2>To-do List</h2>
        <Insertar></Insertar>
        <br></br>
        {lista.length === 0 ? (
          <div>
            <h2>No hay tareas pendientes</h2>
          </div>
        ) : (
          lista.map((item) => (
            <div key={item._id} className="task">
              <div className="checkbox" onClick={EditTask}>
                <GoDot className="icon" />
                <p>{item.task}</p>
              </div>
              <div>
                {" "}
                <span>
                  {" "}
                  <TiDeleteOutline className="icon" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Panel;
