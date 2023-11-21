const { response } = require("express");
const RecursoExterno = require("../modules/recursosExterno");

const obtenerRecursosExternos = async (req, res = response) => {
  try {
    const recursosExternos = await RecursoExterno.find();

    res.status(200).json({
      recursosExternos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener los recursos externos",
    });
  }
};

const crearRecursoExterno = async (req, res = response) => {
  const { link } = req.body;

  try {
    const nuevoRecursoExterno = new RecursoExterno({
      link,
    });

    await nuevoRecursoExterno.save();

    res.status(201).json({
      recursoExterno: nuevoRecursoExterno,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al crear el recurso externo",
    });
  }
};

const actualizarRecursoExterno = async (req, res = response) => {
  const id = req.params.id;
  const { link } = req.body;

  try {
    const recursoExterno = await RecursoExterno.findById(id);

    if (!recursoExterno) {
      return res.status(404).json({
        msg: "Recurso externo no encontrado",
      });
    }

    recursoExterno.link = link;

    await recursoExterno.save();

    res.status(200).json({
      msg: "Recurso externo actualizado correctamente",
      recursoExterno,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al actualizar el recurso externo",
    });
  }
};

const eliminarRecursoExterno = async (req, res = response) => {
  const id = req.params.id;

  try {
    const recursoExterno = await RecursoExterno.findById(id);

    if (!recursoExterno) {
      return res.status(404).json({
        msg: "Recurso externo no encontrado",
      });
    }

    await RecursoExterno.deleteOne({ _id: id });

    res.status(200).json({
      msg: "Recurso externo eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al eliminar el recurso externo",
    });
  }
};

module.exports = {
  obtenerRecursosExternos,
  crearRecursoExterno,
  actualizarRecursoExterno,
  eliminarRecursoExterno,
};
