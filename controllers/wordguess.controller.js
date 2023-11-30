const Wordguess = require("../modules/wordguess.modules");

const wordguessGetAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder || "asc";

    const skip = (page - 1) * perPage;

    const sortOption = { [sortBy]: sortOrder };

    const words = await Wordguess.find({ deleted: false })
      .sort(sortOption)
      .skip(skip)
      .limit(perPage);

    let response = {
      message: 'palabras obtenidas exitosamente',
      words
    }

    if (page && perPage) {
      const total = await Wordguess.countDocuments({ deleted: false });
      const totalPages = Math.ceil(total / perPage);
      const currentPage = parseInt(page);

      response = {
        ...response, total, totalPages, currentPage
      }
    };
    return res.status(200).json({ response });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al cargar las palabras',
      error: error.message
    });
  }
};

const wordguessGetById = async (req, res) => {
  try {
    const idWord = req.params.id;
    const word = await Wordguess.findById(idWord);

    if (!word) {
      return res.status(404).json({
        message: 'Palabra no encontrada'
      })
    }
    return res.status(200).json({ word });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al consultar la palabra',
    });
  }
};

const wordguessCreate = async (req, res) => {
  const { words } = req.body;
  try {
    const newWord = new Wordguess({ words, createdBy: req.usuario.id });
    await newWord.save();

    return res.status(200).json({
      msg: 'Palabra agregada correctamente'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al agregar la palabra',
    });
  }
};

const wordguessDelete = async (req, res) => {
  const idWord = req.params.id;
  try {
    const word = await Wordguess.findByIdAndUpdate(idWord,
      { deleted: true, deletedAt: new Date(), deletedBy: req.usuario.id });

    if (!word) {
      return res.status(404).json({
        msg: "Palabra no encontrada",
      });
    }
    return res.status(200).json({
      msg: "Palabra eliminada correctamente",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error al eliminar la palabra",
    });
  }
};

const wordguessUpdate = async (req, res) => {
  const idWord = req.params.id;
  try {
    const { words } = req.body;
    const datosEditar = { words, updatedAt: new Date(), updatedBy: req.usuario.id };
    const word = await Palabra.findByIdAndUpdate(idWord, datosEditar);

    if (!word) {
      return res.status(404).json({
        msg: "Palabra no encontrada",
      });
    }
    return res.status(200).json({
      msg: "Palabra eliminada correctamente",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error al eliminar la palabra",
    });
  }
};

module.exports = {
  wordguessGetAll,
  wordguessGetById,
  wordguessCreate,
  wordguessDelete,
  wordguessUpdate
};
