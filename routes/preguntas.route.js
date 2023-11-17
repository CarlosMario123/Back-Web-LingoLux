const { Router } = require("express");
const preguntasRouter = require("../controllers/preguntas.controller.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");
const routerPregunta = Router();

routerPregunta.get("/", authMiddleware, preguntasRouter.obtenerPreguntas);

routerPregunta.get("/:id", authMiddleware, preguntasRouter.consultarPregunta);

routerPregunta.post("/", authMiddleware, preguntasRouter.agregarPregunta);

routerPregunta.post("/:id", authMiddleware, preguntasRouter.respuestaCorrecta);

routerPregunta.delete("/:id", authMiddleware, preguntasRouter.eliminarPregunta);

routerPregunta.patch("/:id", authMiddleware, preguntasRouter.editarPregunta);

module.exports = routerPregunta;