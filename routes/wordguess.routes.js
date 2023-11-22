const { Router } = require('express')
const wordRouter = require('../controllers/wordguess.controller')
const router = require('./generador.routes')

const routerWord = Router()

routerWord.get("/", wordRouter.wordguessGetAll)
routerWord.post("/", wordRouter.wordguessCreate)

module.exports = routerWord