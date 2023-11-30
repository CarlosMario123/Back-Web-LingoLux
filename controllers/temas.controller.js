const Tema = require("../modules/temas");

const obtenerTemas = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const sortBy = req.query.sortBy || 'createdAt';
  const sortOrder = req.query.sortOrder || 'asc';
  const skip = (page - 1) * perPage;
  const sortOption = { [sortBy]: sortOrder };

  try {
    const temas = await Tema.find({ deleted: false })
      .sort(sortOption)
      .skip(skip)
      .limit(perPage);

    let response = {
      message: 'temas obtenidos exitosamente',
      temas
    }

    if (page && perPage) {
      const total = await Tema.countDocuments({ deleted: false });
      const totalPages = Math.ceil(total / perPage);
      const currentPage = parseInt(page);

      response = {
        ...response, total, totalPages, currentPage
      }
    }
    return res.status(200).json({ response });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al cargar los temas',
      error: error.msg
    });
  }
};

const consultarTema = async (req, res) => {
  try {
    const idTema = req.params.id;
    const tema = await Tema.findById(idTema);

    if (!tema) {
      return res.status(404).json({
        message: 'Tema no encontrado'
      })
    }
    return res.status(200).json({ tema });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al consultar el tema',
    });
  }
};

const agregarTema = async (req, res) => {
  const { nombre, cuerpo, imagen, leccion } = req.body;
  try {
    const tema = new Tema({ nombre, cuerpo, imagen, leccion, createdBy: req.usuario.id });
    await tema.save();

    return res.status(200).json({
      msg: 'Tema nuevo agregado'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al agregar el tema',
    });
  }
};

const eliminarTemaLog = async (req, res) => {
  const idTema = req.params.id;
  try {
    const tema = await Tema.findByIdAndUpdate(idTema,
      { deleted: true, deletedAt: new Date(), deletedBy: req.usuario.id });

    if (!tema) {
      return res.status(404).json({
        msg: "Tema no encontrado",
      });
    }
    return res.status(200).json({
      msg: "Tema eliminado correctamente",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error al eliminar el tema",
    });
  }
};

const eliminarTemaFis = async (req, res) => {
  const idTema = req.params.id;
  try {
    const tema = await Tema.findByIdAndDelete(idTema);

    if (!tema) {
      return res.status(404).json({
        msg: "Tema no encontrado",
      });
    }
    return res.status(200).json({
      msg: "Tema eliminado correctamente",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error al eliminar el tema",
    });
  }
};

const editarTema = async (req, res) => {
  const idTema = req.params.id;

  try {
    const { nombre, cuerpo, imagen, leccion } = req.body;
    const datosEditar = { nombre, cuerpo, imagen, leccion, updatedAt: new Date(), updatedBy: req.usuario.id };
    const tema = await Tema.findByIdAndUpdate(idTema, datosEditar);

    if (!tema) {
      return res.status(404).json({
        msg: "Tema no encontrado",
      });
    }

    return res.status(200).json({
      msg: "Tema actualizado correctamente"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al actualizar el tema",
    });
  }
};

module.exports = {
  obtenerTemas,
  consultarTema,
  agregarTema,
  eliminarTema: eliminarTemaLog,
  editarTema
};