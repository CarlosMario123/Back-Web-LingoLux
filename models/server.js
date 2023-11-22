const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/configDB");
class ServerApi {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usuariosRoutes = "/API/usuarios";
    this.libroVocRoutes = "/API/libroVocabulario";
    this.libroHisRoutes = "/API/libroHistorias";
    this.apunte = '/API/apuntes'
    this.lecciones = '/API/lecciones';
    this.temas = '/API/temas';
    this.preguntas = '/API/preguntas'
    this.traductor = "/API/traductor";
    this.palabra = "/API/palabra"
    this.generador = '/API/generador'
    this.recursoExterno = '/API/recursoExterno'
    this.memorama = '/API/memorama'
    //Conectar a base de datos
    this.conectarDB();

    //middelewares
    this.middelewares();

    //Rutas
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middelewares() {
    this.app.use(cors());

    //Parseo y lectura del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("Public/build"));
  }

  routes() {
    this.app.use(this.usuariosRoutes, require("../routes/usuarios.routes")),
    this.app.use(this.libroVocRoutes,require("../routes/librosVocabulario.routes")),
    this.app.use(this.libroHisRoutes,require("../routes/librosHistorias.routes"));
    this.app.use(this.apunte,require('../routes/apunte.routes'))
    this.app.use(this.lecciones,require('../routes/lecciones.route'));
    this.app.use(this.temas,require('../routes/temas.route'));
    this.app.use(this.preguntas,require('../routes/preguntas.route'));
    this.app.use(this.traductor, require("../routes/traductor.routes"));
    this.app.use(this.palabra, require("../routes/palabra.routes"));
    this.app.use(this.generador, require("../routes/generador.routes"));
    this.app.use(this.recursoExterno,require('../routes/recursosExternos.routes'))
    this.app.use(this.memorama,require('../routes/memorama.routes'))
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Escuchando en el puerto ${this.port}`)
    );
  }
}

module.exports = ServerApi;
