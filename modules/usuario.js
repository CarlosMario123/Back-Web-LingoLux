const { Schema, model } = require("mongoose");

const userSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido "],
  },
  correo: {
    type: String,
    required: [true, "El correo es requerido"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es requerida"],
  },
  can_estrellas: {
    type: Number,
    default: 0
  },
  puntaje: {
    type: Number,
    default: 0
  },
  lecciones_compt: {
    type: Number,
    default: 0
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

module.exports = model("Usuario", userSchema);
