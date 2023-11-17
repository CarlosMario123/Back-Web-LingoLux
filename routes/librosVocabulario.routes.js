const { Router } = require("express");
const {
  obtenerLibros,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
} = require("../controllers/libroVocabulario.controller");
const { authMiddleware } = require("../middlewares/authMiddleware");
const routerLibroVocabulario = Router();

// Rutas
routerLibroVocabulario.get("/", obtenerLibros);
routerLibroVocabulario.post("/", crearLibro);
routerLibroVocabulario.put("/:id", authMiddleware, actualizarLibro);
routerLibroVocabulario.delete("/:id", authMiddleware, eliminarLibro);

module.exports = routerLibroVocabulario;
