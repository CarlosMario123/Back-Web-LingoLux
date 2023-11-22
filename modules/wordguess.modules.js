const { Schema, model } = require("mongoose");

const wordguessSchema = Schema({
    words: {
        type: [String]  // Cambiado a un arreglo de cadenas
    }
});

module.exports = model("Wordguess", wordguessSchema);
