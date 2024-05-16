import "../../src/App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault(); //Esperar una acción
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
    <div>
      <h1 className="title">Registrate</h1>
      <form onSubmit={registerUser} className="login-form">
        <div className="flex-row">
          <input
            type="text"
            className="lf--input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
          ></input>
        </div>
        <div className="flex-row">
          <input
            type="email"
            value={email}
            className="lf--input"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
          ></input>
        </div>
        <div className="flex-row">
          <input
            type="password"
            value={password}
            className="lf--input"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          ></input>
        </div>

        <button className="lf--submit" type="submit">
          Registrarse
        </button>
      </form>
      <h1 className="lf--forgot">
        <a className="lf--forgot" href="/login">
          ¿Ya tienes cuenta? Inicia sesión!
        </a>
      </h1>
    </div>
  );
}

export default Register;
