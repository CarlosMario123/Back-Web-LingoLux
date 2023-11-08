const { Router } = require("express");
const preguntasRouter = require("../controllers/preguntas.controller.js");

const routerProduct = Router();

routerProduct.get("/", preguntasRouter.preguntasGet);

routerProduct.get("/:id", preguntasRouter.preguntasGetById);

routerProduct.post("/", preguntasRouter.preguntasPost);

routerProduct.post("/:id", preguntasRouter.respuestaCorrecta);

/* routerProduct.delete("/:id", preguntasRouter.temasDelete);

routerProduct.put("/:id", preguntasRouter.temasPut);

routerProduct.patch("/:id", preguntasRouter.temasPatch); */

module.exports = routerProduct;