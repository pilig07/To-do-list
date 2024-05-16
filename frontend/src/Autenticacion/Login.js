import "../../src/App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();

    // Debugging: Verificar datos antes de enviarlos
    console.log("Logging in with:", { email, password });

    const response = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    // Debugging: Verificar respuesta del servidor
    console.log("Server response:", data);

    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Iniciaste sesión correctamente!");
      navigate("/panel");
    } else {
      alert("Por favor verifica tus credenciales");
    }
  }

  return (
    <div>
      <h1 className="title">Iniciar sesión</h1>
      <form onSubmit={loginUser} className="login-form">
        <div className="flex-row">
          <input
            className="lf--input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
          />
        </div>
        <div className="flex-row">
          <input
            type="password"
            className="lf--input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
        </div>
        <button type="submit" className="lf--submit">
          Iniciar sesión
        </button>
      </form>
      <h1 className="lf--forgot"><a className="lf--forgot" href="/register">
        ¿No tienes cuenta? Registrate!
      </a></h1>
    </div>
  );
}

export default Login;
