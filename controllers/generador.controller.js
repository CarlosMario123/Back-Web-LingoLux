const Generador = require("../modules/generadore");

// Controlador para obtener todos los generadores
const obtenerGeneradores = async (req, res) => {
    try {
        const generadores = await Generador.find({});
        const cantidadGeneradores = generadores.length;
    
        if (cantidadGeneradores === 0) {
          return res.status(404).json({
            msg: "No hay generadores disponibles",
          });
        }
    
        const indiceAleatorio = Math.floor(Math.random() * cantidadGeneradores);
        const generadorAleatorio = generadores[indiceAleatorio];
    
        res.status(200).json({
          generador: generadorAleatorio,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          msg: "Error al obtener el generador aleatorio",
        });
      }
};

// Controlador para obtener un solo generador por su ID
const obtenerGeneradorPorId = async (req, res) => {
  const id = req.params.id;

  try {
    const generador = await Generador.findById(id);

    if (!generador) {
      return res.status(404).json({
        msg: "Generador no encontrado",
      });
    }

    res.status(200).json({
      generador,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener el generador por ID",
    });
  }
};

// Controlador para crear un nuevo generador
const crearGenerador = async (req, res) => {
  try {
    const nuevoGenerador = new Generador(req.body);
    await nuevoGenerador.save();

    res.status(201).json({
      mensaje: "Generador creado exitosamente",
      generador: nuevoGenerador,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al crear el generador",
    });
  }
};

// Controlador para actualizar un generador por su ID
const actualizarGenerador = async (req, res) => {
  const id = req.params.id;
  const { ingles, español, respuestas } = req.body;

  try {
    const generador = await Generador.findById(id);

    if (!generador) {
      return res.status(404).json({
        msg: "Generador no encontrado",
      });
    }

    generador.ingles = ingles;
    generador.español = español;
    generador.respuestas = respuestas;

    await generador.save();

    res.status(200).json({
      msg: "Generador actualizado correctamente",
      generador,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al actualizar el generador",
    });
  }
};

// Controlador para eliminar lógicamente un generador por su ID
const eliminarGeneradorLog = async (req, res) => {
  const id = req.params.id;

  try {
    const generador = await Generador.findById(id);

    if (!generador) {
      return res.status(404).json({
        msg: "Generador no encontrado",
      });
    }

    await generador.deleteOne();

    res.status(200).json({
      msg: "Generador eliminado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al eliminar lógicamente el generador",
    });
  }
};


module.exports = {
  obtenerGeneradores,
  obtenerGeneradorPorId,
  crearGenerador,
  actualizarGenerador,
  eliminarGeneradorLog,
};
