const { request, response } = require("express");
const LibroHistorias = require("../modules/librosHistoria");

// Controlador para obtener todos los libros de vocabulario
const obtenerLibros = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder || "asc";

    const skip = (page - 1) * perPage;

    const sortOption = { [sortBy]: sortOrder };

    const libros = await LibroHistorias.find({ deleted: false })
      .sort(sortOption)
      .skip(skip)
      .limit(perPage);

    let response = {
      message: 'libros obtenidos exitosamente',
      libros
    }

    if (page && perPage) {
      const total = await LibroHistorias.countDocuments({ deleted: false });
      const totalPages = Math.ceil(total / perPage);
      const currentPage = parseInt(page);

      response = {
        ...response, total, totalPages, currentPage
      }
    }

    res.status(200).json({
      response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener los libros de historias",
    });
  }
};

const obtenerLibro = async (req = request, res = response) => {
  const id = req.params.id;

  console.log(id);

  try {
    const libro = await LibroHistorias.findById(id);

    if (!libro) {
      return res.status(404).json({
        msg: "Libro de historias no encontrado",
      });
    }

    res.status(200).json({
      libro,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener el libro de historias por ID",
    });
  }

}

// Controlador para crear un nuevo libro de historias
const crearLibro = async (req = request, res) => {
  try {
    // Usa el modelo correcto para crear una nueva instancia
    const nuevoLibro = new LibroHistorias(req.body);
    await nuevoLibro.save();

    res.status(201).json({ mensaje: "Libro de historias creado exitosamente", libro: nuevoLibro });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear el libro de historias" });
  }
};

// Controlador para actualizar un libro de vocabulario por su ID
const actualizarLibro = async (req, res) => {
  const id = req.params.id;
  const { titulo, contenido } = req.body;

  try {
    const libro = await LibroHistorias.findById(id);

    if (!libro) {
      return res.status(404).json({
        msg: "Libro de historias no encontrado",
      });
    }

    libro.titulo = titulo;
    libro.contenido = contenido;
    libro.updatedAt = new Date();
    libro.updatedBy = req.usuario.id; // Establece el usuario que realiza la actualización

    await libro.save();

    res.status(200).json({
      msg: "Libro de historias actualizado correctamente",
      libro,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al actualizar el libro de historias",
    });
  }
};

// Controlador para eliminar lógicamente un libro de historias por su ID
const eliminarLibroLog = async (req, res) => {
  const id = req.params.id;

  try {
    const libro = await LibroHistorias.findById(id);

    if (!libro) {
      return res.status(404).json({
        msg: "Libro de historias no encontrado",
      });
    }

    libro.deleted = true;
    libro.deletedAt = new Date();
    libro.deletedBy = req.usuario.id; // Establece el usuario que realiza la eliminación

    await libro.save();

    res.status(200).json({
      msg: "Libro de historias eliminado lógicamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al eliminar lógicamente el libro de historias",
    });
  }
};

// Controlador para eliminar físicamente un libro de historias
const eliminarLibroFis = async (req, res) => {
  const id = req.params.id;

  try {
    const libro = await LibroHistorias.findById(id);

    if (!libro) {
      return res.status(404).json({
        msg: "Libro de historias no encontrado",
      });
    }

    // Eliminación física (borrado permanente)
    await libro.deleteOne({ _id: id });

    return res.status(200).json({
      msg: "Libro de historias eliminado físicamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al eliminar el libro de historias",
    });
  }
};


module.exports = {
  obtenerLibros,
  crearLibro,
  actualizarLibro,
  eliminarLibro: eliminarLibroLog,
  obtenerLibro
};
