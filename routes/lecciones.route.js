const { Router } = require("express");
const leccionesRouter = require("../controllers/lecciones.controller.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");
const routerLeccion = Router();

routerLeccion.get("/", authMiddleware, leccionesRouter.obtenerLecciones);

routerLeccion.get("/disponibles/:estrellas", authMiddleware, leccionesRouter.leccionesDisponibles);

routerLeccion.get("/bloqueadas/:estrellas", authMiddleware, leccionesRouter.leccionesBloqueadas);

routerLeccion.get("/:id", authMiddleware, leccionesRouter.consultarLeccion);

routerLeccion.post("/", authMiddleware, leccionesRouter.agregarLeccion);

routerLeccion.delete("/:id", authMiddleware, leccionesRouter.eliminarLeccion);

routerLeccion.patch("/:id", authMiddleware, leccionesRouter.editarLeccion);

module.exports = routerLeccion;