"use strict";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4001; // Corrección en el operador OR

app.use(morgan("tiny"));

// Configuración de CORS
const corsOptions = {
  origin: 'https://fictional-trout-w57759w94q9f6qq-5500.app.github.dev', // Reemplaza con el dominio de tu frontend
  credentials: true, // Incluye credenciales como cookies
};

app.use(cors(corsOptions));

app.use(cookieParser(process.env.TOKEN_KEY));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type,Content-Type, Authorization, Authentication, withCredentials, Content-Length, Accept, x-access-token, credentials, Origin, X-Content-Type-Options");
  res.header("Access-Control-Expose-Headers", "x-access-token, Authorization, Authentication, withCredentials, credentials, Set-Cookie");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "https://fictional-trout-w57759w94q9f6qq-5500.app.github.dev");

  next();
});

// Rutas de la aplicación
app.use("/auth", require("./routes/authHandling"));
app.use("/admin", require("./routes/adminHandling"));

const server = app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
});
