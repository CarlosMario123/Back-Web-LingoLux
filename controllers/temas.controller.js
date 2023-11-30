const Tema = require("../modules/temas");
const Usuario = require("../modules/usuario");
const mongoose = require('mongoose');

const obtenerTemas = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'asc';
    const skip = (page - 1) * perPage;
    const sortOption = { [sortBy]: sortOrder };

    const temas = await Tema.find()
      .sort(sortOption)
      .skip(skip)
      .limit(perPage)
      .session(session);

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ temas });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    return res.status(500).json({
      msg: 'Error al cargar los temas',
      error: error.message
    });
  }
};

const consultarTema = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const idTema = req.params.id;
    const tema = await Tema.findById(idTema).populate('leccion', { requisito: 1 }).session(session);
    const usuario = await Usuario.findById(req.usuario.id).session(session);

    if (!tema) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        message: 'Tema no encontrado'
      });
    }
    if (usuario.can_estrellas < tema.leccion.requisito) {
      await session.abortTransaction();
      session.endSession();
      return res.status(401).json({
        message: 'Lección bloqueada'
      });
    }

    await session.commitTransaction();
    session.endSession();

    return res.json({ tema });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    return res.status(500).json({
      msg: 'Error al consultar el tema',
    });
  }
};

const agregarTema = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { nombre, cuerpo, imagen, idLeccion } = req.body;
  
  try {
    const tema = new Tema({ nombre, cuerpo, imagen, idLeccion });
    await tema.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      msg: 'Tema nuevo agregado'
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    return res.status(500).json({
      msg: 'Error al agregar el tema',
    });
  }
};

const eliminarTema = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const idTema = req.params.id;
  
  try {
    const tema = await Tema.findByIdAndDelete(idTema).session(session);

    if (!tema) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        msg: "Tema no encontrado",
      });
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      msg: "Tema eliminado correctamente",
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    return res.status(500).json({
      msg: "Error al eliminar el tema",
    });
  }
};

const editarTema = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const idTema = req.params.id;

  try {
    const { nombre, cuerpo, imagen, leccion } = req.body;
    const datosEditar = { nombre, cuerpo, imagen, leccion, updatedAt: new Date() };
    const tema = await Tema.findByIdAndUpdate(idTema, datosEditar, { new: true }).session(session);

    if (!tema) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        msg: "Tema no encontrado",
      });
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      msg: "Tema actualizado correctamente"
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({
      msg: "Error al actualizar el tema",
    });
  }
};

module.exports = {
  obtenerTemas,
  consultarTema,
  agregarTema,
  eliminarTema,
  editarTema
};
