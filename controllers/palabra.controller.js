const Palabra = require("../modules/palabra");

const palabrasGet = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder || "asc";

    const skip = (page - 1) * perPage;

    const sortOption = { [sortBy]: sortOrder };

    const palabras = await Palabra.find({ deleted: false })
      .sort(sortOption)
      .skip(skip)
      .limit(perPage);

    let response = {
      message: 'palabras obtenidas exitosamente',
      palabras
    }

    if (page && perPage) {
      const total = await Palabra.countDocuments({ deleted: false });
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
      msg: 'Error al cargar las palabras',
      error: error.msg
    });
  }
};

const palabrasGetById = async (req, res) => {
  try {
    const idPalabra = req.params.id;
    const palabra = await Palabra.findById(idPalabra);

    if (!palabra) {
      return res.status(404).json({
        message: 'palabra no encontrada'
      })
    }
    return res.status(200).json({ palabra });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al consultar la palabra',
    });
  }
};

const palabrasPost = async (req, res) => {
  const { imagen, palabraEsp, palabraIng } = req.body;
  try {
    const palabra = new Palabra({ imagen, palabraEsp, palabraIng, createdBy: req.usuario.id });
    await palabra.save();

    return res.status(200).json({
      msg: 'palabra agregada'
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Error al agregar la palabra',
    });
  }
};

const palabrasDelete = async (req, res) => {
  const idPalabra = req.params.id;
  try {
    const palabra = await Palabra.findByIdAndUpdate(idPalabra,
      { deleted: true, deletedAt: new Date(), deletedBy: req.usuario.id });

    if (!palabra) {
      return res.status(404).json({
        msg: "palabra no encontrada",
      });
    }
    return res.status(200).json({
      msg: "palabra eliminada correctamente",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error al eliminar la palabra",
    });
  }
};

const palabrasPatch = async (req, res) => {
  const idPalabra = req.params.id;

  try {
    const { imagen, palabraEsp, palabraIng } = req.body;
    const datosEditar = { imagen, palabraEsp, palabraIng, updatedAt: new Date(), updatedBy: req.usuario.id };
    const palabra = await Palabra.findByIdAndUpdate(idPalabra, datosEditar);

    if (!palabra) {
      return res.status(404).json({
        msg: "palabra no encontrada",
      });
    }

    return res.status(200).json({
      msg: "palabra actualizada correctamente"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al actualizar la palabra",
    });
  }
};

module.exports = {
  palabrasGet,
  palabrasGetById,
  palabrasPost,
  palabrasPatch,
  palabrasDelete,
};