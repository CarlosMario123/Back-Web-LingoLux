const { Router } = require("express");
const temasRouter = require("../controllers/temas.controller.js");

const routerProduct = Router();

routerProduct.get("/", temasRouter.temasGet);

routerProduct.get("/:id", temasRouter.temasGetById);

routerProduct.post("/", temasRouter.temasPost);

routerProduct.delete("/:id", temasRouter.temasDelete);

routerProduct.put("/:id", temasRouter.temasPut);

routerProduct.patch("/:id", temasRouter.temasPatch);

module.exports = routerProduct;