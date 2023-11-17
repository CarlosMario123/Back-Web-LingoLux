const { Router } = require("express");
const {
  obtenerLibros,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
} = require("../controllers/librosHistorias.controller");
const { authMiddleware } = require("../middlewares/authMiddleware");
const routerLibrosHistorias = Router();

// Rutas
routerLibrosHistorias.get("/", authMiddleware, obtenerLibros);
routerLibrosHistorias.post("/", authMiddleware, crearLibro);
routerLibrosHistorias.put("/:id", authMiddleware, actualizarLibro);
routerLibrosHistorias.delete("/:id", authMiddleware, eliminarLibro);

module.exports = routerLibrosHistorias;