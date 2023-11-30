const { Schema, model } = require("mongoose");

const wordguessSchema = Schema({
    words: {
        type: [String]  // Cambiado a un arreglo de cadenas
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

module.exports = model("Wordguess", wordguessSchema);
