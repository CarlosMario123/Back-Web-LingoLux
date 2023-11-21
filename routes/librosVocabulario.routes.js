const { Router } = require("express");
const {
  obtenerLibros,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
  obtenerLibroPorId,
} = require("../controllers/libroVocabulario.controller");
const { authMiddleware } = require("../middlewares/authMiddleware");
const routerLibroVocabulario = Router();

// Rutas
routerLibroVocabulario.get("/", obtenerLibros);
routerLibroVocabulario.post("/", crearLibro);
routerLibroVocabulario.get('/:id',obtenerLibroPorId)
routerLibroVocabulario.put("/:id", authMiddleware, actualizarLibro);
routerLibroVocabulario.delete("/:id", authMiddleware, eliminarLibro);

module.exports = routerLibroVocabulario;
