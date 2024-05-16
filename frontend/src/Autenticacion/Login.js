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
      <h1>Inicia sesión</h1>
      <form onSubmit={loginUser}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Login;
