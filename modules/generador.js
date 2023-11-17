const { Schema, model } = require("mongoose");

const generadorSchema = Schema({
  ingles: {
    type: String,
  },
  español: {
    type: String,
  },
  respuestas: [String],
});



module.exports = model("generaoor", generadorSchema);
