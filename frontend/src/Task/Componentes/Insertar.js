import React from "react";
import "../../styles/panel.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Insertar() {
  const [task, setTask] = useState();
  const AddTask = async () => {
    const response = await fetch("http://localhost:1337/api/addtask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: task,
      }),
    });
    const data = await response.json();

    // Debugging: Verificar respuesta del servidor
    console.log("Server response:", data);
  };

  return (
    <div className="task-form">
      <form onSubmit={AddTask}>
        <input
          type="text"
          onChange={(e) => setTask(e.target.value)}
          placeholder="Nueva tarea"
        ></input>
        <button type="submit">Añadir</button>
      </form>
    </div>
  );
}

export default Insertar;
