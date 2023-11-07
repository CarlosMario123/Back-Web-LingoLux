const { Schema, model } = require("mongoose");

const temasSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del tema es requerido "],
  },
  cuerpo: {
    type: String
  },
  img:{
    type: []
  }
});

module.exports = model("tema", temasSchema);
