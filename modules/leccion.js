const { Schema, model } = require("mongoose");

const leccionSchema = new Schema({
  titulo: {
    type: String,
  },
  num_leccion: {
    type: Number,
  },
  temas: [{
    type: Schema.Types.ObjectId,
    ref: 'Tema'
  }],
  preguntas: [{
    type: Schema.Types.ObjectId,
    ref: 'Pregunta'
  }],
  requisito: {
    type: Number,
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

module.exports = model("Leccion", leccionSchema);