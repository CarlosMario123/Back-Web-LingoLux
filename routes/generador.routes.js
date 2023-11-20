const { Router } = require("express");
const { obtenerGeneradores, obtenerGeneradorPorId, crearGenerador, actualizarGenerador, eliminarGeneradorLog, eliminarGeneradorFis } = require("../controllers/generador.controller");
const router = Router();

// Ruta para obtener todos los generadores
router.get("/", obtenerGeneradores);

// Ruta para obtener un solo generador por su ID
router.get("/:id", obtenerGeneradorPorId);

// Ruta para crear un nuevo generador
router.post("/", crearGenerador);

// Ruta para actualizar un generador por su ID
router.put("/:id", actualizarGenerador);

// Ruta para eliminar lógicamente un generador por su ID
router.delete("/:id", eliminarGeneradorLog);

module.exports = router;
