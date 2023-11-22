const { Schema, model } = require("mongoose");

const palabraSchema = Schema({
  imagen: {
    type: String,
  },
  nombre:{
    type: String
  },
  palabraEsp: {
    type: String,
  },
  palabraIng: {
    type: String,
  },
});

module.exports = model("Palabra", palabraSchema);