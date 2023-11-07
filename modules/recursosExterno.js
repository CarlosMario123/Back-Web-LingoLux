const { Schema, model } = require("mongoose");


const recursosExternosSchema = new Schema({
  link: {
    type: String,
    required: [true, "El link es requerido"],
  },
});

module.exports = model("recursosExternos", recursosExternosSchema);