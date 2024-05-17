const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken"); // JSON WEB TOKENS
const bcrypt = require("bcrypt"); // Para el hash de contraseñas
const verifyToken = require("./authMiddleware");

//MODELOS
const User = require("./models/user_model");
const Task = require("./models/task_model");

app.use(cors());
app.use(express.json()); // Convertir todo lo recibido en JSON

// Iniciar conexión con MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/to-do")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error de conexión a MongoDB:", error);
  });

// Registro de usuario
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "error", message: "Correo electrónico ya en uso" });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({ status: "ok" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "error", error: "Error interno del servidor" });
  }
});

// Login de usuario
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(email);
  console.log(password);
  // Buscar usuario por correo electrónico
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(401)
      .json({ status: "error", message: "Credenciales inválidas" });
  }

  // Verificar contraseña
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res
      .status(401)
      .json({ status: "error", message: "Credenciales inválidas" });
  }

  // Generar token JWT
  const token = jwt.sign({ email: user.email }, "secret123", {
    expiresIn: "1h",
  });

  res.json({ status: "ok", token });
});

// Ruta protegida
app.get("/api/panel", verifyToken, async (req, res) => {
  try {
    // Obtener datos del usuario desde el token decodificado
    const userEmail = req.userEmail;
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "Usuario no encontrado" });
    }

    // Devolver datos del usuario
    res.json({ status: "ok", user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "error", error: "Error interno del servidor" });
  }
});

// Añadir tarea
app.post("/api/addtask", async (req, res) => {
  const task = req.body.task;
  Task.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

//Lista de tareas
app.get("/api/lista", async (req, res) => {
  Task.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

//Editar tarea
app.put("/api/edittask/:id", async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task },
      { new: true }
    );
    res.json({ status: "ok", task: updatedTask });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

// Eliminar task
app.delete("/api/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

// Marcar como hecha tarea
app.put("/api/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { done } = req.body;
    const task = await Task.findByIdAndUpdate(id, { done }, { new: true });
    res.json({ status: "ok", task });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

app.listen(1337, () => {
  console.log("server running");
});
