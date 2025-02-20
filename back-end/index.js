// Importar librerías
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}` 
});
const express = require("express");
const cors = require("cors");
const path = require("path");

// Importar rutas
const cocheRoutes = require("./routes/cocheRoutes");
const concesionarioRoutes = require("./routes/concesionarioRoutes");

// Importar conexión a la base de datos
const sequelize = require("./config/sequelize");

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    origin: "http://localhost:8081",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/coche", cocheRoutes);
app.use("/api/concesionario", concesionarioRoutes);

// Configurar el middleware para servir archivos estáticos desde el directorio 'public\old_js_vainilla'
app.use(express.static(path.join(__dirname, "public")));

//Ruta para manejar las solicitudes al archivo index.html
// app.get('/', (req, res) => {
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar el servidor
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
  });
}

//Exportamos la aplicacion para hacer pruebas
module.exports = app;
