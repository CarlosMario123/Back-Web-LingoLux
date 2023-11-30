const { response } = require("express");
const RecursoExterno = require("../modules/recursosExterno");

const obtenerRecursosExternos = async (req, res = response) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder || "asc";

    const skip = (page - 1) * perPage;

    const sortOption = { [sortBy]: sortOrder };

    const recursosExternos = await RecursoExterno.find({ deleted: false })
      .sort(sortOption)
      .skip(skip)
      .limit(perPage);

    let response = {
      message: 'recursos obtenidos exitosamente',
      recursosExternos
    }

    if (page && perPage) {
      const total = await RecursoExterno.countDocuments({ deleted: false });
      const totalPages = Math.ceil(total / perPage);
      const currentPage = parseInt(page);

      response = {
        ...response, total, totalPages, currentPage
      }
    };

    res.status(200).json({
      response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener los recursos externos",
    });
  }
};

const obtenerRecursoExterno = async (req, res) => {
  try {
    const id = req.params.id;
    const recursoExterno = await RecursoExterno.findById(id);

    if (!recursoExterno) {
      return res.status(404).json({
        message: 'Recurso externo no encontrado'
      })
    }
    return res.status(200).json({ recursoExterno });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al consultar el recurso externo',
    });
  }
};

const crearRecursoExterno = async (req, res = response) => {
  const { link } = req.body;

  try {
    const nuevoRecursoExterno = new RecursoExterno({
      link, createdBy: req.usuario.id
    });

    await nuevoRecursoExterno.save();

    res.status(201).json({
      msg: 'Recurso externo agregado',
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
    recursoExterno.updatedAt = new Date();
    recursoExterno.updatedBy = req.usuario.id;

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

const eliminarRecursoExternoLog = async (req, res = response) => {
  const id = req.params.id;

  try {
    const recursoExterno = await RecursoExterno.findById(id);

    if (!recursoExterno) {
      return res.status(404).json({
        msg: "Recurso externo no encontrado",
      });
    }

    recursoExterno.deleted = true;
    recursoExterno.deletedAt = new Date();
    recursoExterno.deletedBy = req.usuario.id;

    await recursoExterno.save();

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

const eliminarRecursoExternoFis = async (req, res = response) => {
  const id = req.params.id;

  try {
    const recursoExterno = await RecursoExterno.findById(id);

    if (!recursoExterno) {
      return res.status(404).json({
        msg: "Recurso externo no encontrado",
      });
    }

    await RecursoExterno.delete({ _id: id });

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
  obtenerRecursoExterno,
  crearRecursoExterno,
  actualizarRecursoExterno,
  eliminarRecursoExterno: eliminarRecursoExternoLog,
};
