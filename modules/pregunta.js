const { Schema, model } = require("mongoose");

const preguntasSchema = Schema({
  preguntas: { pregunta: String, respuestas: [String] },
  respuestaCorrecta: {
    type: String,
    required: [true, "La respuesta correcta es obligatoria"],
  },
});

module.exports = model("pregunta", preguntasSchema);