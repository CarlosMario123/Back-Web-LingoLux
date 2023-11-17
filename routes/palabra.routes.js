const { Router } = require("express");
const palabraRouter = require("../controllers/palabra.controller");

const routerPalabra = Router();

routerPalabra.get("/", palabraRouter.palbrasGet);
routerPalabra.post('/',palabraRouter.palabrasPost);



module.exports = routerPalabra;