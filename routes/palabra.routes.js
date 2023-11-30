const { Router } = require("express");
const palabraRouter = require("../controllers/palabra.controller");

const routerPalabra = Router();

routerPalabra.get("/", palabraRouter.palabrasGet);
routerPalabra.get("/:id", palabraRouter.palabrasGetById);
routerPalabra.post('/',palabraRouter.palabrasPost);
routerPalabra.delete("/:id", palabraRouter.palabrasGet);
routerPalabra.patch('/:id',palabraRouter.palabrasPost);

module.exports = routerPalabra;