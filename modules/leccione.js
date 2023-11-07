const { Schema, model } = require("mongoose");
const pregunta = require("./pregunta");
const tema = require("./tema");


const leccionSchema = new Schema({
  titulo: {
    type: String,
    required: [true, "El titulo es requerido "],
  },
  temas: [tema],
  preguntas: [pregunta],
});

module.exports = model("leccion", leccionSchema);