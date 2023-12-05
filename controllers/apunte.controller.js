const { request } = require("express");
const Apunte = require("../modules/apunte");
const mongoose = require('mongoose');

// Controlador para obtener todos los apuntes con paginación y ordenamiento
const obtenerApuntes = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder || "asc";

    const skip = (page - 1) * perPage;

    const sortOption = { [sortBy]: sortOrder };

    const apuntes = await Apunte.find({ deleted: false })
      .sort(sortOption)
      .skip(skip)
      .limit(perPage)
      .session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      apuntes,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({
      msg: "Error al obtener los apuntes",
    });
  }
};

// Controlador para crear un nuevo apunte
const crearApunte = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { titulo, contenido } = req.body;

  try {
    const nuevoApunte = new Apunte({
      titulo,
      contenido,
      createdBy: req.usuario.id, // Establece el usuario creador
    });

    await nuevoApunte.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      apunte: nuevoApunte,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({
      msg: "Error al crear el apunte",
    });
  }
};

// Controlador para actualizar un apunte
const actualizarApunte = async (req = request, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const id = req.params.id;

  try {
    const apunte = await Apunte.findById(id).session(session);

    if (!apunte) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        msg: "Apunte no encontrado",
      });
    }

    const { titulo, contenido } = req.body;

    apunte.titulo = titulo;
    apunte.contenido = contenido;
    apunte.updatedAt = new Date();
    apunte.updatedBy = req.usuario.id; // Establece el usuario que realiza la actualización

    await apunte.save();

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      msg: "Apunte actualizado correctamente",
      apunte,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({
      msg: "Error al actualizar el apunte",
    });
  }
};

// Controlador para eliminar lógicamente un apunte
const eliminarApunteLogico = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const id = req.params.id;

  try {
    const apunte = await Apunte.findById(id).session(session);

    if (!apunte) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        msg: "Apunte no encontrado",
      });
    }

    // Eliminación lógica
    apunte.deleted = true;
    apunte.deletedAt = new Date();
    apunte.deletedBy = req.usuario.id; // Establece el usuario que realiza la eliminación lógica

    await apunte.save();

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      msg: "Apunte eliminado lógicamente",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({
      msg: "Error al eliminar el apunte lógicamente",
    });
  }
};

// Controlador para obtener apuntes por ID de usuario
const obtenerApuntesPorUsuario = async (req, res) => {
  const idUsuario = req.params.idUsuario;

  try {
    const apuntes = await Apunte.find({
      createdBy: idUsuario,
      deleted: false,
    });

    res.status(200).json({
      apuntes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener los apuntes del usuario",
    });
  }
};

const actualizarApuntePorUsuario = async (req, res) => {
  const idUsuario = req.params.idUsuario;
  const idApunte = req.params.idApunte;
  const { titulo, contenido } = req.body;

  try {
    // Find and update the apunte for the specified user
    const updatedApunte = await Apunte.findByIdAndUpdate(
      { _id: idApunte, createdBy: idUsuario },
      {
        titulo,
        contenido,
        updatedAt: new Date(),
        updatedBy: req.usuario.id, // Update with the current user ID
      },
      { new: true } // To return the updated document
    );

    if (!updatedApunte) {
      return res.status(404).json({
        msg: "Apunte no encontrado para el usuario especificado",
      });
    }

    res.status(200).json({
      msg: "Apunte actualizado correctamente",
      apunte: updatedApunte,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al actualizar el apunte",
    });
  }
}


module.exports = {
  obtenerApuntes,
  crearApunte,
  actualizarApunte,
  eliminarApunte: eliminarApunteLogico,
  obtenerApuntesPorUsuario,
  actualizarApuntePorUsuario
};
