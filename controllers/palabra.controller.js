const Palabra = require("../modules/palabra");
const mongoose = require('mongoose');

const palbrasGet = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const palabras = await Palabra.find().session(session);
    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ palabras });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    return res.status(500).json({
      msg: 'Error al cargar las palabras',
      error: error.message
    });
  }
};

const palabrasGetById = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const idPalabra = req.params.id;
    const palabra = await Palabra.findById(idPalabra).session(session);

    if (!palabra) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        message: 'Palabra no encontrada'
      });
    }

    await session.commitTransaction();
    session.endSession();

    return res.json({ palabra });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    return res.status(500).json({
      msg: 'Error al consultar la palabra',
    });
  }
};

const palabrasPost = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { imagen, palabraEsp, palabraIng, nombre } = req.body;
  try {
    const palabra = new Palabra({ imagen, nombre, palabraEsp, palabraIng });
    await palabra.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      msg: 'Palabra agregada'
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    return res.status(500).json({
      msg: 'Error al agregar la palabra',
    });
  }
};

const palabrasDelete = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const idPalabra = req.params.id;
  try {
    const palabra = await Palabra.findByIdAndDelete(idPalabra).session(session);

    if (!palabra) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        msg: "Palabra no encontrada",
      });
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      msg: "Palabra eliminada correctamente",
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.log(error);
    return res.status(500).json({
      msg: "Error al eliminar la palabra",
    });
  }
};

const palanrasPut = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const idPalabra = req.params.id;

  try {
    const { imagen, palabraEsp, palabraIng, nombre } = req.body;
    const palabra = await Palabra.findByIdAndUpdate(idPalabra, { imagen, nombre, palabraEsp, palabraIng }, { new: true }).session(session);

    if (!palabra) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        msg: "Palabra no encontrada",
      });
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      msg: "Palabra actualizada correctamente"
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.log(error);
    res.status(500).json({
      msg: "Error al actualizar la palabra",
    });
  }
};

const palabrasPatch = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const idPalabra = req.params.id;

  try {
    const { imagen, palabraEsp, palabraIng } = req.body;
    const datosEditar = { palabraEsp, palabraIng, imagen };
    const palabra = await Palabra.findByIdAndUpdate(idPalabra, datosEditar, { new: true }).session(session);

    if (!palabra) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        msg: "Palabra no encontrada",
      });
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      msg: "Palabra actualizada correctamente"
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.log(error);
    res.status(500).json({
      msg: "Error al actualizar la palabra",
    });
  }
};

module.exports = {
  palbrasGet,
  palabrasGetById,
  palabrasPost,
  palanrasPut,
  palabrasPatch,
  palabrasDelete,
};
