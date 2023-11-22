const Wordguess = require("../modules/wordguess.modules");

const wordguessGetAll = async (req, res) => {
  try {
    const words = await Wordguess.find();
    return res.status(200).json({ words });

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
    return res.json({ word });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al consultar la palabra',
    });
  }
};

const wordguessCreate = async (req, res) => {
  const { word } = req.body;
  try {
    const newWord = new Wordguess({ word });
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
    const word = await Wordguess.findByIdAndDelete(idWord);

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
};
