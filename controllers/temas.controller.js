const Tema = require("../modules/temas");

const temasGet = async (req, res) => {
  try {
    const temas = await Tema.find();
    return res.status(200).json({ temas });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al cargar los temas',
      error: error.msg
    });
  }
};

const temasGetById = async (req, res) => {
  try {
    const idTema = req.params.id;
    const tema = await Tema.findById(idTema);

    if (!tema) {
      return res.status(404).json({
        message: 'Tema no encontrado'
      })
    }
    return res.json({ tema });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al consultar el tema',
    });
  }
};

const temasPost = async (req, res) => {
  const { nombre, cuerpo, imagen, idLeccion } = req.body;
  try {
    const tema = new Tema({ nombre, cuerpo, imagen, idLeccion });
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

const temasDelete = async (req, res) => {
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

const temasPut = async (req, res) => {
  const idTema = req.params.id;

  try {
    const datosEditar = {
      nombre: req.body.nombre || null,
      cuerpo: req.body.cuerpo || null,
      imagen: req.body.imagen || null
    };
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

const temasPatch = async (req, res) => {
  const idTema = req.params.id;

  try {
    const { nombre, cuerpo, imagen } = req.body;
    const datosEditar = { nombre, cuerpo, imagen };
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
  temasGet,
  temasGetById,
  temasPost,
  temasPut,
  temasPatch,
  temasDelete,
};