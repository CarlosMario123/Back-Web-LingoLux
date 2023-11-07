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
routerLibroVocabulario.get("/", authMiddleware, obtenerLibros);
routerLibroVocabulario.post("/", authMiddleware, crearLibro);
routerLibroVocabulario.put("/:id", authMiddleware, actualizarLibro);
routerLibroVocabulario.delete("/:id", authMiddleware, eliminarLibro);

module.exports = routerLibroVocabulario;
