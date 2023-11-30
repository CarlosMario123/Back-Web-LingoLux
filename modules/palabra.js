const { Schema, model } = require("mongoose");

const palabraSchema = Schema({
  imagen: {
    type: String,
  },
  palabraEsp: {
    type: String,
  },
  palabraIng: {
    type: String,
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

module.exports = model("Palabra", palabraSchema);