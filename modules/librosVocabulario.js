const { Schema, model } = require("mongoose");

const libroVocabularioSchema = Schema({
  titulo: {
    type: String,
    required: [true, "El título es requerido"],
  },
  contenido: [{ contenidoEsp: String, contenidoIng: String, url:String }],
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


module.exports = model("libroVocabulario", libroVocabularioSchema);
