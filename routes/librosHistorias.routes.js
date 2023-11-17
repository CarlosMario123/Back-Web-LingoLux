const { Router } = require("express");
const {
  obtenerLibros,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
} = require("../controllers/librosHistorias.routes");
const { authMiddleware } = require("../middlewares/authMiddleware");
const routerLibrosHistorias = Router();

// Rutas
routerLibrosHistorias.get("/", obtenerLibros);
routerLibrosHistorias.post("/", crearLibro);
routerLibrosHistorias.put("/:id", authMiddleware, actualizarLibro);
routerLibrosHistorias.delete("/:id", authMiddleware, eliminarLibro);

module.exports = routerLibrosHistorias;