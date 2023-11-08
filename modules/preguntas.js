const { Schema, model } = require("mongoose");

const preguntaSchema = Schema({
  nombre: {
    type: String
  },
  opciones: {
    type: [String]
  },
  opcionCorrecta: {
    type: String
  },
  respuestaUsuario: {
    type: String
  },
  leccion: {
    type: Schema.Types.ObjectId,
    ref: "Leccion"
  }
});

module.exports = model("Pregunta", preguntaSchema);