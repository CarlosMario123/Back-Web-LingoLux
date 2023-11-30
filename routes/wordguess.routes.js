const { Router } = require('express')
const wordRouter = require('../controllers/wordguess.controller')
const router = require('./generador.routes')

const routerWord = Router()

routerWord.get("/", wordRouter.wordguessGetAll)
routerWord.get("/:id", wordRouter.wordguessGetById)
routerWord.post("/", wordRouter.wordguessCreate)
routerWord.delete("/:id", wordRouter.wordguessDelete)
routerWord.patch("/:id", wordRouter.wordguessUpdate)

module.exports = routerWord