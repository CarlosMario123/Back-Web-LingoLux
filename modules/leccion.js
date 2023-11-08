const { Schema, model } = require("mongoose");

const leccionSchema = new Schema({
  titulo: {
    type: String,
  },
  temas: [{
    type: Schema.Types.ObjectId,
    ref: 'Tema'
  }],
  preguntas: [{
    type: Schema.Types.ObjectId,
    ref: 'Pregunta'
  }]
});

module.exports = model("Leccion", leccionSchema);