import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/styles/panel.css";
import Insertar from "./Componentes/Insertar";

//ICONOS
import { GoDot } from "react-icons/go";
import { TiDeleteOutline } from "react-icons/ti";
import { GrStatusGood } from "react-icons/gr";

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

  const EditTask = async (id, updatedTask) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:1337/api/edittask/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        task: updatedTask,
      }),
    });

    const data = await response.json();
    if (data.status === "ok") {
      // Actualiza la lista local con la tarea editada
      setLista((prevLista) =>
        prevLista.map((item) =>
          item._id === id ? { ...item, task: updatedTask } : item
        )
      );
    } else {
      alert("Error al actualizar la tarea");
    }
  };
  const deleteTask = async (id) => {
    const response = await fetch(`http://localhost:1337/api/task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setLista(lista.filter((task) => task._id !== id));
    }
  };

  const toggleTaskDone = async (id, done) => {
    const response = await fetch(`http://localhost:1337/api/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done: !done }),
    });

    if (response.ok) {
      setLista(
        lista.map((task) => (task._id === id ? { ...task, done: !done } : task))
      );
    }
  };

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
        <Insertar />
        <br />
        {lista.length === 0 ? (
          <div>
            <h2>No hay tareas pendientes</h2>
          </div>
        ) : (
          lista.map((item) => (
            <div key={item._id} className={`task ${item.done ? "done" : ""}`}>
              <div
               className={`checkbox ${item.done ? "done" : ""}`}
                onClick={() => {
                  const newTask = prompt("Edita la tarea:", item.task);
                  if (newTask) {
                    EditTask(item._id, newTask);
                  }
                }}
              >
                <GoDot className="icon" />
                <p>{item.task}</p>
              </div>
              <div className="icons">
                <span onClick={() => deleteTask(item._id)}>
                  <TiDeleteOutline className="icon" />
                </span>
                <GrStatusGood
                  className="icon"
                  onClick={() => toggleTaskDone(item._id, item.done)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Panel;
