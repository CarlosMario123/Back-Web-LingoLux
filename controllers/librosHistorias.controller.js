const { request, response } = require("express");
const LibroHistorias = require("../modules/librosHistoria");
const mongoose = require("mongoose");

// Función para iniciar una transacción
const iniciarTransaccion = async () => {
  const session = await mongoose.startSession();
  session.startTransaction();
  return session;
};

// Función para finalizar una transacción con éxito
const finalizarTransaccionExito = async (session) => {
  await session.commitTransaction();
  session.endSession();
};

// Función para abortar una transacción en caso de error
const abortarTransaccion = async (session) => {
  await session.abortTransaction();
  session.endSession();
};

// Controlador para obtener todos los libros de historias
const obtenerLibros = async (req, res) => {
  try {
    const libros = await LibroHistorias.find({ deleted: false });
    res.status(200).json({
      libros,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener los libros de historias",
    });
  }
};

// Controlador para obtener un libro de historias por su ID
const obtenerLibro = async (req = request, res = response) => {
  const id = req.params.id;

  try {
    const libro = await LibroHistorias.findById(id);

    if (!libro) {
      return res.status(404).json({
        msg: "Libro de historias no encontrado",
      });
    }

    res.status(200).json({
      libro,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener el libro de historias por ID",
    });
  }
};

// Controlador para crear un nuevo libro de historias
const crearLibro = async (req = request, res) => {
  const session = await iniciarTransaccion();

  try {
    const nuevoLibro = new LibroHistorias(req.body);
    await nuevoLibro.save({ session });

    await finalizarTransaccionExito(session);

    res.status(201).json({
      mensaje: "Libro de historias creado exitosamente",
      libro: nuevoLibro,
    });
  } catch (error) {
    await abortarTransaccion(session);

    console.error(error);
    res.status(500).json({
      msg: "Error al crear el libro de historias",
    });
  }
};

// Controlador para actualizar un libro de historias por su ID
const actualizarLibro = async (req, res) => {
  const session = await iniciarTransaccion();
  const id = req.params.id;
  const { titulo, contenido } = req.body;

  try {
    const libro = await LibroHistorias.findById(id).session(session);

    if (!libro) {
      await abortarTransaccion(session);
      return res.status(404).json({
        msg: "Libro de historias no encontrado",
      });
    }

    libro.titulo = titulo;
    libro.contenido = contenido;
    libro.updatedAt = new Date();
    libro.updatedBy = req.usuario.id;

    await libro.save();

    await finalizarTransaccionExito(session);

    res.status(200).json({
      msg: "Libro de historias actualizado correctamente",
      libro,
    });
  } catch (error) {
    await abortarTransaccion(session);

    console.error(error);
    res.status(500).json({
      msg: "Error al actualizar el libro de historias",
    });
  }
};

// Controlador para eliminar lógicamente un libro de historias por su ID
const eliminarLibroLog = async (req, res) => {
  const session = await iniciarTransaccion();
  const id = req.params.id;

  try {
    const libro = await LibroHistorias.findById(id).session(session);

    if (!libro) {
      await abortarTransaccion(session);
      return res.status(404).json({
        msg: "Libro de historias no encontrado",
      });
    }

    libro.deleted = true;
    libro.deletedAt = new Date();
    libro.deletedBy = req.usuario.id;

    await libro.save();

    await finalizarTransaccionExito(session);

    res.status(200).json({
      msg: "Libro de historias eliminado lógicamente",
    });
  } catch (error) {
    await abortarTransaccion(session);

    console.error(error);
    res.status(500).json({
      msg: "Error al eliminar lógicamente el libro de historias",
    });
  }
};

// Controlador para eliminar físicamente un libro de historias
const eliminarLibroFis = async (req, res) => {
  const session = await iniciarTransaccion();
  const id = req.params.id;

  try {
    const libro = await LibroHistorias.findById(id).session(session);

    if (!libro) {
      await abortarTransaccion(session);
      return res.status(404).json({
        msg: "Libro de historias no encontrado",
      });
    }

    await libro.deleteOne({ _id: id });

    await finalizarTransaccionExito(session);

    return res.status(200).json({
      msg: "Libro de historias eliminado físicamente",
    });
  } catch (error) {
    await abortarTransaccion(session);

    console.error(error);
    res.status(500).json({
      msg: "Error al eliminar el libro de historias",
    });
  }
};

module.exports = {
  obtenerLibros,
  crearLibro,
  actualizarLibro,
  eliminarLibro: eliminarLibroLog,
  obtenerLibro,
};
