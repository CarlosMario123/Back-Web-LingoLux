const Leccion = require("../modules/leccion");
const Usuario = require("../modules/usuario");
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

const obtenerLecciones = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const sortBy = req.query.sortBy || 'createdAt';
  const sortOrder = req.query.sortOrder || 'asc';
  const skip = (page - 1) * perPage;
  const sortOption = { [sortBy]: sortOrder };

  const session = await iniciarTransaccion();

  try {
    const usuario = await Usuario.findById(req.usuario.id);
    const usuarioAuth = {
      idUsuario: usuario._id,
      username: usuario.nombre,
      estrellas: usuario.can_estrellas,
      completados: usuario.lecciones_compt,
    };

    const lecciones = await Leccion.find()
      .sort(sortOption)
      .skip(skip)
      .limit(perPage)
      .session(session);

    await finalizarTransaccionExito(session);

    return res.status(200).json({
      usuarioAuth,
      lecciones,
    });

  } catch (error) {
    await abortarTransaccion(session);

    console.error(error);
    return res.status(500).json({
      msg: 'Error al cargar las lecciones',
      error: error.msg,
    });
  }
};

const leccionesDisponibles = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const sortBy = req.query.sortBy || 'createdAt';
  const sortOrder = req.query.sortOrder || 'asc';
  const skip = (page - 1) * perPage;
  const sortOption = { [sortBy]: sortOrder };

  const session = await iniciarTransaccion();

  try {
    const { estrellas } = req.params;
    const lecciones = await Leccion.find({ requisito: { $lte: estrellas } })
      .sort(sortOption)
      .skip(skip)
      .limit(perPage)
      .session(session);

    await finalizarTransaccionExito(session);

    return res.status(200).json({
      lecciones,
    });

  } catch (error) {
    await abortarTransaccion(session);

    console.error(error);
    return res.status(500).json({
      msg: 'Error al cargar las lecciones',
      error: error.msg,
    });
  }
};

const leccionesBloqueadas = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const sortBy = req.query.sortBy || 'createdAt';
  const sortOrder = req.query.sortOrder || 'asc';
  const skip = (page - 1) * perPage;
  const sortOption = { [sortBy]: sortOrder };

  const session = await iniciarTransaccion();

  try {
    const lecciones = await Leccion.find({ requisito: { $gt: req.params.estrellas } })
      .sort(sortOption)
      .skip(skip)
      .limit(perPage)
      .session(session);

    await finalizarTransaccionExito(session);

    return res.status(200).json({
      lecciones,
    });

  } catch (error) {
    await abortarTransaccion(session);

    console.error(error);
    return res.status(500).json({
      msg: 'Error al cargar las lecciones',
      error: error.msg,
    });
  }
};

const consultarLeccion = async (req, res) => {
  const session = await iniciarTransaccion();

  try {
    const idLeccion = req.params.id;
    const leccion = await Leccion.findById(idLeccion).session(session);
    const usuario = await Usuario.findById(req.usuario.id);

    if (!leccion) {
      await abortarTransaccion(session);
      return res.status(404).json({
        message: 'Lección no localizada',
      });
    }

    if (usuario.can_estrellas < leccion.requisito) {
      await abortarTransaccion(session);
      return res.status(401).json({
        message: 'Lección bloqueada',
        requisito:leccion.requisito
      });
    } else {
      await finalizarTransaccionExito(session);
      return res.status(200).json({
        idUsuario: req.usuario.id,
        usuario: req.usuario.nombre,
        leccion,
      });
    }

  } catch (error) {
    await abortarTransaccion(session);

    console.error(error);
    return res.status(500).json({
      msg: 'Error al consultar la lección',
    });
  }
};

const agregarLeccion = async (req, res) => {
  const { titulo, temas, preguntas, requisito } = req.body;
  const session = await iniciarTransaccion();

  try {
    const leccion = new Leccion({ titulo, temas, preguntas, requisito });
    await leccion.save({ session });

    await finalizarTransaccionExito(session);

    return res.status(200).json({
      msg: 'Lección nueva agregada',
    });

  } catch (error) {
    await abortarTransaccion(session);

    console.error(error);
    return res.status(500).json({
      msg: 'Error al agregar la lección',
    });
  }
};

const eliminarLeccion = async (req, res) => {
  const idLeccion = req.params.id;
  const session = await iniciarTransaccion();

  try {
    const leccion = await Leccion.findByIdAndDelete(idLeccion).session(session);

    if (!leccion) {
      await abortarTransaccion(session);
      return res.status(404).json({
        msg: "Lección no localizada",
      });
    }

    await finalizarTransaccionExito(session);

    return res.status(200).json({
      msg: "Lección eliminada correctamente",
    });

  } catch (error) {
    await abortarTransaccion(session);

    console.log(error);
    return res.status(500).json({
      msg: "Error al eliminar la lección",
    });
  }
};

const editarLeccion = async (req, res) => {
  const idLeccion = req.params.id;
  const session = await iniciarTransaccion();

  try {
    const { titulo, temas, preguntas } = req.body;
    const datosEditar = { titulo, temas, preguntas, updatedAt: new Date() };
    const leccion = await Leccion.findByIdAndUpdate(idLeccion, datosEditar, { new: true }).session(session);

    if (!leccion) {
      await abortarTransaccion(session);
      return res.status(404).json({
        msg: "Lección no localizada",
      });
    }

    await finalizarTransaccionExito(session);

    return res.status(200).json({
      msg: "Lección actualizada correctamente",
    });

  } catch (error) {
    await abortarTransaccion(session);

    console.log(error);
    res.status(500).json({
      msg: "Error al actualizar la lección",
    });
  }
};

module.exports = {
  obtenerLecciones,
  leccionesDisponibles,
  leccionesBloqueadas,
  consultarLeccion,
  agregarLeccion,
  eliminarLeccion,
  editarLeccion,
};
