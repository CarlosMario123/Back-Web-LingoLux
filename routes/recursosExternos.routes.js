const { Router } = require("express");
const {
  obtenerRecursosExternos,
  crearRecursoExterno,
  actualizarRecursoExterno,
  eliminarRecursoExterno,
} = require("../controllers/recursosExternos.controller");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");

const routerRecursosExternos = Router();

routerRecursosExternos.get("/", obtenerRecursosExternos);

routerRecursosExternos.post(
  "/",
  [
    check("link", "El link es obligatorio").not().isEmpty(),
    validarCampos,
    authMiddleware,
  ],
  crearRecursoExterno
);

routerRecursosExternos.put(
  "/:id",
  [
    check("link", "El link es obligatorio").not().isEmpty(),
    validarCampos,
    authMiddleware,
  ],
  actualizarRecursoExterno
);

routerRecursosExternos.delete("/:id", [authMiddleware], eliminarRecursoExterno);

module.exports = routerRecursosExternos;
