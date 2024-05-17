import React, { useState, useEffect } from "react";
import "../../styles/panel.css";
import { useNavigate } from "react-router-dom";

function Insertar() {
  const [task, setTask] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    setUserEmail(userEmail);
  }, []);

  const AddTask = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:1337/api/addtask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        task: task,
      }),
    });
    const data = await response.json();

    console.log("Server response:", data);
  };

  return (
    <div className="task-form">
      <form onSubmit={AddTask}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button type="submit">Añadir</button>
      </form>
    </div>
  );
}

export default Insertar;
