const Palabra = require("../modules/palabra");

const palbrasGet = async (req, res) => {
  try {
    const palabras = await Palabra.find();
    return res.status(200).json({ palabras });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al cargar los palabras',
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
        message: 'palabra no encontrado'
      })
    }
    return res.json({ palabra });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al consultar el palabra',
    });
  }
};

const palabrasPost = async (req, res) => {
  const { imagen, palabraEsp,palabraIng, nombre } = req.body;
  try {
    const palabra = new Palabra({ imagen,nombre,palabraEsp,palabraIng});
    await palabra.save();

    return res.status(200).json({
      msg: 'palabra agregada'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al agregar el palabra',
    });
  }
};

const palabrasDelete = async (req, res) => {
  const idPalabra = req.params.id;
  try {
    const palabra = await Palabra.findByIdAndDelete(idPalabra);

    if (!palabra) {
      return res.status(404).json({
        msg: "palabra no encontrado",
      });
    }
    return res.status(200).json({
      msg: "palabra eliminado correctamente",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error al eliminar el palabra",
    });
  }
};

const palanrasPut = async (req, res) => {
  const idPalabra = req.params.id;

  try {
    const { imagen, palabraEsp,palabraIng, nombre } = req.body;
    const palabra = await Palabra.findByIdAndUpdate(idPalabra, palabraEsp,palabraIng,imagen,nombre);

    if (!palabra) {
      return res.status(404).json({
        msg: "palabra no encontrado",
      });
    }

    return res.status(200).json({
      msg: "palabra actualizado correctamente"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al actualizar el palabra",
    });
  }
};

const palabrasPatch = async (req, res) => {
  const idPalabra = req.params.id;

  try {
    const { imagen, palabraEsp,palabraIng } = req.body;
    const datosEditar = { palabraEsp, palabraIng, imagen };
    const palabra = await Palabra.findByIdAndUpdate(idPalabra, datosEditar);

    if (!palabra) {
      return res.status(404).json({
        msg: "palabra no encontrado",
      });
    }

    return res.status(200).json({
      msg: "palabra actualizado correctamente"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al actualizar el palabra",
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