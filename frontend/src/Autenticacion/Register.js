import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/styles/auth.css";
function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Función de efecto para restablecer el estado al montar el componente
  useEffect(() => {
    // Restablecer los valores de los campos a una cadena vacía
    setName("");
    setEmail("");
    setPassword("");
  }, []);

  async function registerUser(event) {
    event.preventDefault(); // Esperar una acción
    const response = await fetch("http://localhost:1337/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      navigate("/login");
    }
  }

  return (
    <div className="main">
      <h1 className="sign">Registrate</h1>
      <form onSubmit={registerUser} className="form1">
        <input
          type="text"
          className="un"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
        ></input>
        <input
          type="email"
          value={email}
          className="un"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
        ></input>
        <input
          type="password"
          value={password}
          className="un"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        ></input>
        <div class="form-container">
          <button className="submit" type="submit">
            Registrarse
          </button>
        </div>
      </form>
      <h1 className="forgot">
        <a className="forgot" href="/login">
          ¿Ya tienes cuenta? Inicia sesión!
        </a>
      </h1>
    </div>
  );
}

export default Register;
