const { Router } = require("express");
const {
  obtenerApuntes,
  crearApunte,
  actualizarApunte,
  eliminarApunte,
  obtenerApuntesPorUsuario,
  actualizarApuntePorUsuario,
} = require("../controllers/apunte.controller.js");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");

const routerApuntes = Router();

routerApuntes.get("/", obtenerApuntes);

routerApuntes.get(
  "/usuario",
  [authMiddleware],
  obtenerApuntesPorUsuario
);

routerApuntes.post(
  "/",
  [
    check("titulo", "El título es obligatorio").not().isEmpty(),
    validarCampos,
    authMiddleware,
  ],
  crearApunte
);

routerApuntes.put("/", [authMiddleware,validarCampos], actualizarApunte);

routerApuntes.delete("/:id", [authMiddleware], eliminarApunte);

routerApuntes.put(
  "/usuario/:idUsuario/apunte/:idApunte",
  [
    check("titulo", "El título es obligatorio").not().isEmpty(),
    validarCampos,
    authMiddleware,
  ],
  actualizarApuntePorUsuario
);

module.exports = routerApuntes;
