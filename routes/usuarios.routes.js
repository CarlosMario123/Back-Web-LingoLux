//rutas para usuario en caso de una base de datos
const { Router } = require("express");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
  loginUsuario
} = require("../controllers/usuarios.controller");
const { check } = require("express-validator");
const { validarCampos } = require('../middlewares/validar-campos.js');
const { existeEmial } = require("../helpers/db-validator");

const routerProduct = Router();

routerProduct.get("/", usuariosGet);


routerProduct.put("/:id", usuariosPut);

routerProduct.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("password", "La contraseña debe de ser mayor a 6 letras").isLength({min: 6}),
    check("correo", "El correo no es válido").isEmail(),
    check('correo').custom(existeEmial),
    validarCampos
  ],
  usuariosPost
);

routerProduct.post("/login", [
 validarCampos
], loginUsuario);

routerProduct.delete("/:id", usuariosDelete);

routerProduct.patch("/", usuariosPatch);

module.exports = routerProduct;
