const { Router } = require("express");
const {
  obtenerApuntes,
  crearApunte,
  actualizarApunte,
  eliminarApunte,
} = require("../controllers/apunte.controller.js");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");

const routerApuntes = Router();

routerApuntes.get("/", obtenerApuntes);

routerApuntes.post(
  "/",
  [
    check("titulo", "El título es obligatorio").not().isEmpty(),
    validarCampos,
    authMiddleware,
  ],
  crearApunte
);

routerApuntes.put(
  "/:id",
  [
    check("titulo", "El título es obligatorio").not().isEmpty(),
    validarCampos,
    authMiddleware,
  ],
  actualizarApunte
);

routerApuntes.delete("/:id", [authMiddleware], eliminarApunte);

module.exports = routerApuntes;
