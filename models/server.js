const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../database/configDB");
class ServerApi {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usuariosRoutes = '/API/usuarios';
    //Conectar a base de datos
    this.conectarDB();


    //middelewares
    this.middelewares();

    //Rutas
    this.routes();
    
  }

  async conectarDB(){
    await dbConnection();
  }

  middelewares() {

    this.app.use(cors());

    //Parseo y lectura del body
    this.app.use(express.json())

    //Directorio publico
    this.app.use(express.static("Public/build"));
    
  }

  routes() {
    this.app.use(this.usuariosRoutes,require('../routes/usuarios.js'))
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Escuchando en el puerto ${this.port}`)
    );
  }
}

module.exports = ServerApi;
