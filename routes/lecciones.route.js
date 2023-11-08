const { Router } = require("express");
const leccionesRouter = require("../controllers/lecciones.controller.js");

const routerProduct = Router();

routerProduct.get("/", leccionesRouter.leccionesGet);

routerProduct.get("/:id", leccionesRouter.leccionesGetById);

routerProduct.post("/", leccionesRouter.leccionesPost);

routerProduct.delete("/:id", leccionesRouter.leccionesDelete);

routerProduct.put("/:id", leccionesRouter.leccionesPut);

routerProduct.patch("/:id", leccionesRouter.leccionesPatch);

module.exports = routerProduct;