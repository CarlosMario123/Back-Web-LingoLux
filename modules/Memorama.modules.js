const { Schema, model } = require("mongoose")

const memoramaSchema = Schema({
    imagen: {
        type: String,
      },
      nombre:{
        type: String
      },
      palabra: {
        type: String,
      },
})

module.exports = model("memorama", memoramaSchema);
