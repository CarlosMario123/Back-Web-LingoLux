const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Usuario = require("../modules/usuario");

mongoose.connect("mongodb://localhost:27017/lingoLuxDB", { useNewUrlParser: true, useUnifiedTopology: true });

const salt = 10;

const seedUsuarios = async () => {
  try {
    const usuariosEjemplo = [
      {
        nombre: "Pablo",
        correo: "pablo@example.com",
        password: bcrypt.hashSync('1234',salt),
        can_estrellas: 10,
        puntaje: 100,
        lecciones_compt: 5,
        createdAt: new Date(),
        createdBy: "Admin",
        updatedAt: null,
        updatedBy: null,
        deleted: false,
        deletedAt: null,
        deletedBy: null,
      },
      {
        nombre: "Adrian",
        correo: "adrian2@example.com",
        password: bcrypt.hashSync('1234',salt),
        can_estrellas: 5,
        puntaje: 50,
        lecciones_compt: 3,
        createdAt: new Date(),
        createdBy: "Admin",
        updatedAt: null,
        updatedBy: null,
        deleted: false,
        deletedAt: null,
        deletedBy: null,
      },
      {
        nombre: "carlos",
        correo: "carlos@example.com",
        password: bcrypt.hashSync('1234',salt),
        can_estrellas: 10,
        puntaje: 100,
        lecciones_compt: 5,
        createdAt: new Date(),
        createdBy: "Admin",
        updatedAt: null,
        updatedBy: null,
        deleted: false,
        deletedAt: null,
        deletedBy: null,
      },
      {
        nombre: "Eduardo",
        correo: "eduardo@example.com",
        password: bcrypt.hashSync('1234',salt),
        can_estrellas: 5,
        puntaje: 50,
        lecciones_compt: 3,
        createdAt: new Date(),
        createdBy: "Admin",
        updatedAt: null,
        updatedBy: null,
        deleted: false,
        deletedAt: null,
        deletedBy: null,
      },
      // Agrega más usuarios según sea necesario
    ];

    await Usuario.deleteMany({});
    await Usuario.insertMany(usuariosEjemplo);

    console.log("Seed completado: Datos de usuario insertados con éxito");
  } catch (error) {
    console.error("Error durante la inserción de datos de usuario:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedUsuarios();
