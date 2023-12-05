const { response } = require("express");
const mongoose = require('mongoose');
const RecursoExterno = require("../modules/recursosExterno");

const obtenerRecursosExternos = async (req, res = response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const recursosExternos = await RecursoExterno.find().session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      recursosExternos,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({
      msg: "Error al obtener los recursos externos",
    });
  }
};

const crearRecursoExterno = async (req, res = response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { link } = req.body;

  try {
    const nuevoRecursoExterno = new RecursoExterno({
      link,
    });

    await nuevoRecursoExterno.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      recursoExterno: nuevoRecursoExterno,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({
      msg: "Error al crear el recurso externo",
    });
  }
};

const actualizarRecursoExterno = async (req, res = response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const id = req.params.id;
  const { link } = req.body;

  try {
    const recursoExterno = await RecursoExterno.findById(id).session(session);

    if (!recursoExterno) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        msg: "Recurso externo no encontrado",
      });
    }

    recursoExterno.link = link;

    await recursoExterno.save();

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      msg: "Recurso externo actualizado correctamente",
      recursoExterno,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({
      msg: "Error al actualizar el recurso externo",
    });
  }
};

const eliminarRecursoExterno = async (req, res = response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const id = req.params.id;

  try {
    const recursoExterno = await RecursoExterno.findById(id).session(session);

    if (!recursoExterno) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        msg: "Recurso externo no encontrado",
      });
    }

    await RecursoExterno.deleteOne({ _id: id });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      msg: "Recurso externo eliminado correctamente",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({
      msg: "Error al eliminar el recurso externo",
    });
  }
};

module.exports = {
  obtenerRecursosExternos,
  crearRecursoExterno,
  actualizarRecursoExterno,
  eliminarRecursoExterno,
};
