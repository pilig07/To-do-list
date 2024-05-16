import { useEffect, useState } from "react";

function Panel() {
  const [user, setUser] = useState(null);

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
      }
    }

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Bienvenido, {user.name}</h1>
      <p>Correo electrónico: {user.email}</p>
    </div>
  );
}

export default Panel;
