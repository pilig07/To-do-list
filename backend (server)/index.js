const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user_model");
const jwt = require("jsonwebtoken"); //JSON WEB TOKENS

app.use(cors());
app.use(express.json()); //Convertir todo lo recibido en Json

//Iniciar conexión con MongoBD (por default al iniciar el launcher inicia con puerto 2701)

mongoose
  .connect("mongodb://127.0.0.1:27017/to-do")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error de conexión a MongoDB:", error);
  });

//Registro de usuario
app.post("/api/register", async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (e) {
    console.log(e);
    res.json({ status: "error", error: "Correo electrónico ya en uso" });
  }
});

//Logeo de usuario
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    //Encriptación base 64 de los datos del usuario
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.listen(1337, () => {
  console.log("server running");
});
