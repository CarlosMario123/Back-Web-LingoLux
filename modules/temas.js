const { Schema, model } = require("mongoose");

const temaSchema = Schema({
  nombre: {
    type: String
  },
  cuerpo: {
    type: String
  },
  imagen: {
    type: [String]
  },
  leccion: {
    type: Schema.Types.ObjectId,
    ref: "Leccion"
  }
});

module.exports = model("Tema", temaSchema);