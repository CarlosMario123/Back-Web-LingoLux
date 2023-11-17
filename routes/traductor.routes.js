const { Router } = require("express");
const { traducirTxt } = require("../controllers/traductor.cotroller");

const routerTraductor = Router();

routerTraductor.get("/", traducirTxt);


module.exports = routerTraductor