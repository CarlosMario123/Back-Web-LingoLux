const { Router } = require("express");
const temasRouter = require("../controllers/temas.controller.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");
const routerTema = Router();

routerTema.get("/", authMiddleware, temasRouter.obtenerTemas);

routerTema.get("/:id", authMiddleware, temasRouter.consultarTema);

routerTema.post("/", authMiddleware, temasRouter.agregarTema);

routerTema.delete("/:id", authMiddleware, temasRouter.eliminarTema);

routerTema.patch("/:id", authMiddleware, temasRouter.editarTema);

module.exports = routerTema;