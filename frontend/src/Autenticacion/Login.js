import "../../src/styles/auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();

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
    <div className="main">
      <h1 className="sign">Iniciar sesión</h1>
      <form onSubmit={loginUser} className="form1">
        <input
          className="un"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
        />

        <input
          type="password"
          className="un"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <div class="form-container">
          <button type="submit" className="submit">
            Iniciar sesión
          </button>
        </div>
      </form>
      <h1 className="forgot">
        <a className="forgot" href="/register">
          ¿No tienes cuenta? Registrate!
        </a>
      </h1>
    </div>
  );
}

export default Login;
