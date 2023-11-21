const LibroVocabulario = require("../modules/librosVocabulario");

// Controlador para obtener todos los libros de vocabulario
const obtenerLibros = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder || "asc";

    const skip = (page - 1) * perPage;

    const sortOption = { [sortBy]: sortOrder };

    const libros = await LibroVocabulario.find({ deleted: false })
      .sort(sortOption)
      .skip(skip)
      .limit(perPage);

    res.status(200).json({
      libros,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener los libros de vocabulario",
    });
  }
};

// Controlador para obtener un libro de vocabulario por su ID
const obtenerLibroPorId = async (req, res) => {
  const id = req.params.id;

  try {
    const libro = await LibroVocabulario.findById(id);

    if (!libro) {
      return res.status(404).json({
        msg: "Libro de vocabulario no encontrado",
      });
    }

    res.status(200).json({
      libro,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener el libro de vocabulario por ID",
    });
  }
};

// Controlador para crear un nuevo libro de vocabulario
const crearLibro = async (req, res) => {
  try {
    // Crea una nueva instancia del modelo con los datos del cuerpo de la solicitud
    const nuevoLibro = new LibroVocabulario(req.body);

    // Guarda el nuevo libro en la base de datos
    await nuevoLibro.save();

    // Devuelve una respuesta exitosa
    res
      .status(201)
      .json({
        mensaje: "Libro de vocabulario creado exitosamente",
        libro: nuevoLibro,
      });
  } catch (error) {
    // Maneja los errores y devuelve una respuesta de error
    res.status(500).json({ error: "Error al crear el libro de vocabulario" });
  }
};

// Controlador para actualizar un libro de vocabulario por su ID
const actualizarLibro = async (req, res) => {
  const id = req.params.id;
  const { titulo, contenido } = req.body;

  try {
    const libro = await LibroVocabulario.findById(id);

    if (!libro) {
      return res.status(404).json({
        msg: "Libro de vocabulario no encontrado",
      });
    }

    libro.titulo = titulo;
    libro.contenido = contenido;
    libro.updatedAt = new Date();
    libro.updatedBy = req.usuario.id; // Establece el usuario que realiza la actualización

    await libro.save();

    res.status(200).json({
      msg: "Libro de vocabulario actualizado correctamente",
      libro,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al actualizar el libro de vocabulario",
    });
  }
};

// Controlador para eliminar lógicamente un libro de vocabulario por su ID
const eliminarLibroLog = async (req, res) => {
  const id = req.params.id;

  try {
    const libro = await LibroVocabulario.findById(id);

    if (!libro) {
      return res.status(404).json({
        msg: "Libro de vocabulario no encontrado",
      });
    }

    libro.deleted = true;
    libro.deletedAt = new Date();
    libro.deletedBy = req.usuario.id; // Establece el usuario que realiza la eliminación

    await libro.save();

    res.status(200).json({
      msg: "Libro de vocabulario eliminado lógicamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al eliminar lógicamente el libro de vocabulario",
    });
  }
};

// Controlador para eliminar físicamente un libro de vocabulario
const eliminarLibroFis = async (req, res) => {
  const id = req.params.id;

  try {
    const libro = await LibroVocabulario.findById(id);

    if (!libro) {
      return res.status(404).json({
        msg: "Libro de vocabulario no encontrado",
      });
    }

    // Eliminación física (borrado permanente)
    await libro.remove();

    return res.status(200).json({
      msg: "Libro de vocabulario eliminado físicamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al eliminar el libro de vocabulario",
    });
  }
};

module.exports = {
  obtenerLibros,
  crearLibro,
  actualizarLibro,
  eliminarLibro: eliminarLibroLog,
  obtenerLibroPorId
};
