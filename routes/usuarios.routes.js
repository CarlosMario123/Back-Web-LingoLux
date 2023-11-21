//rutas para usuario en caso de una base de datos
const { Router } = require("express");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
  loginUsuario,
  obtenerUsuarioID,
  obtenerTopUsuarios, // Import the new controller function
} = require("../controllers/usuarios.controller");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos.js");
const { existeEmial, existeID } = require("../helpers/db-validator");
const { authMiddleware } = require("../middlewares/authMiddleware");

const routerUsuario = Router();

routerUsuario.get("/", usuariosGet);

routerUsuario.get('/',obtenerUsuarioID)

routerUsuario.get('/top', obtenerTopUsuarios); // New route to get top users


routerUsuario.get('/:id',[
  check('id','El id no es valido').isMongoId(),
  check('id', 'El id no existe').custom(existeID),
  validarCampos
],obtenerUsuarioID)

routerUsuario.put("/:id",authMiddleware ,usuariosPut);

routerUsuario.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("password", "La contraseña debe de ser mayor a 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(existeEmial),
    validarCampos,
  ],
  usuariosPost
);

routerUsuario.post("/login", [validarCampos], loginUsuario);

routerUsuario.delete("/:id", [authMiddleware, validarCampos], usuariosDelete);

routerUsuario.patch("/", usuariosPatch);

module.exports = routerUsuario;
