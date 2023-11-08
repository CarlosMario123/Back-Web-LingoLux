const Leccion = require("../modules/leccion");

const leccionesGet = async (req, res) => {
  try {
    const lecciones = await Leccion.find().populate(['temas', 'preguntas']);
    return res.status(200).json({ lecciones });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al cargar las lecciones',
      error: error.msg
    });
  }
};

const leccionesGetById = async (req, res) => {
  try {
    const idLeccion = req.params.id;
    const leccion = await Leccion.findById(idLeccion).populate(['temas', 'preguntas']);

    if (!leccion) {
      return res.status(404).json({
        message: 'Lección no localizada'
      })
    }
    return res.json({ data: leccion });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al consultar la lección',
    });
  }
};

const leccionesPost = async (req, res) => {
  const { titulo, temas, preguntas } = req.body;
  try {
    const leccion = new Leccion({ titulo, temas, preguntas });
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

const leccionesDelete = async (req, res) => {
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

const leccionesPut = async (req, res) => {
  const idLeccion = req.params.id;

  try {
    const datosEditar = {
      titulo: req.body.titulo || null
    };
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

const leccionesPatch = async (req, res) => {
  const idLeccion = req.params.id;

  try {
    const { titulo, temas, preguntas } = req.body;
    const datosEditar = { titulo, temas, preguntas };
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
  leccionesGet,
  leccionesGetById,
  leccionesPost,
  leccionesPut,
  leccionesPatch,
  leccionesDelete,
};