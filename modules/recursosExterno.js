const { Schema, model } = require("mongoose");


const recursosExternosSchema = new Schema({
  link: {
    type: String,
    required: [true, "El link es requerido"],
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

module.exports = model("recursosExternos", recursosExternosSchema);