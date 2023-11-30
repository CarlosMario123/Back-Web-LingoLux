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
  leccion: {
    type: Schema.Types.ObjectId,
    ref: "Leccion"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
  },
  updatedAt: {
    type: Date,
  },
  updatedBy: {
    type: String,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
  },
  deletedBy: {
    type: String,
  },
});

module.exports = model("Pregunta", preguntaSchema);