const Leccion = require("../modules/leccion");
const Usuario = require("../modules/usuario");

const obtenerLecciones = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const sortBy = req.query.sortBy || 'createdAt';
  const sortOrder = req.query.sortOrder || 'asc';
  const skip = (page - 1) * perPage;
  const sortOption = { [sortBy]: sortOrder };

  const usuario = await Usuario.findById(req.usuario.id);
  const usuarioAuth = {
    idUsuario: usuario._id,
    username: usuario.nombre,
    estrellas: usuario.can_estrellas,
    completados: usuario.lecciones_compt,
  }
  try {
    const lecciones = await Leccion.find()
      .sort(sortOption)
      .skip(skip)
      .limit(perPage);

    return res.status(200).json({
      usuarioAuth,
      lecciones
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al cargar las lecciones',
      error: error.msg
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

  try {
    const { estrellas } = req.params;
    const lecciones = await Leccion.find({ requisito: { $lte: estrellas} })
      .sort(sortOption)
      .skip(skip)
      .limit(perPage);

    return res.status(200).json({
      lecciones
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al cargar las lecciones',
      error: error.msg
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

  try {
    const lecciones = await Leccion.find({ requisito: { $gt: req.params.estrellas} })
      .sort(sortOption)
      .skip(skip)
      .limit(perPage);

    return res.status(200).json({
      lecciones
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al cargar las lecciones',
      error: error.msg
    });
  }
};

const consultarLeccion = async (req, res) => {
  try {
    const idLeccion = req.params.id;
    const leccion = await Leccion.findById(idLeccion);
    const usuario = await Usuario.findById(req.usuario.id);

    if (!leccion) {
      return res.status(404).json({
        message: 'Lección no localizada',
      })
    }
    if (usuario.can_estrellas < leccion.requisito) {
      return res.status(401).json({
        message: 'Lección bloqueada',
      })
    } else {
      return res.status(200).json({
        idUsuario: req.usuario.id,
        usuario: req.usuario.nombre,
        leccion
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al consultar la lección',
    });
  }
};

const agregarLeccion = async (req, res) => {
  const { titulo, temas, preguntas, requisito } = req.body;
  try {
    const leccion = new Leccion({ titulo, temas, preguntas, requisito });
    await leccion.save();

    return res.status(200).json({
      msg: 'Lección nueva agregada'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al agregar la lección',
    });
  }
};

const eliminarLeccion = async (req, res) => {
  const idLeccion = req.params.id;
  try {
    const leccion = await Leccion.findByIdAndDelete(idLeccion);

    if (!leccion) {
      return res.status(404).json({
        msg: "Lección no localizada",
      });
    }
    return res.status(200).json({
      msg: "Lección eliminada correctamente",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error al eliminar la lección",
    });
  }
};

const editarLeccion = async (req, res) => {
  const idLeccion = req.params.id;

  try {
    const { titulo, temas, preguntas } = req.body;
    const datosEditar = { titulo, temas, preguntas, updatedAt: new Date() };
    const leccion = await Leccion.findByIdAndUpdate(idLeccion, datosEditar);

    if (!leccion) {
      return res.status(404).json({
        msg: "Lección no localizada",
      });
    }

    return res.status(200).json({
      msg: "Lección actualizada correctamente"
    });

  } catch (error) {
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