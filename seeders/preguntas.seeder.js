const mongoose = require("mongoose");
const Pregunta = require("../modules/preguntas"); // Ajusta la ruta según tu estructura de archivos
const Leccion = require("../modules/leccion"); // Ajusta la ruta según tu estructura de archivos

mongoose.connect("mongodb://localhost:27017/lingoLuxDB", { useNewUrlParser: true, useUnifiedTopology: true });

const seedPreguntas = async () => {
  try {
    // Buscar una lección existente (asegúrate de que haya lecciones en tu base de datos)
    const leccionEjemplo = await Leccion.findOne();

    if (!leccionEjemplo) {
      console.error("No se encontró ninguna lección en la base de datos.");
      return;
    }

    const preguntasEjemplo = [
      {
        nombre: "Pregunta 1",
        opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
        opcionCorrecta: "Opción B",
        leccion: leccionEjemplo._id,
        createdBy: "Admin",
      },
      {
        nombre: "Pregunta 2",
        opciones: ["Opción X", "Opción Y", "Opción Z"],
        opcionCorrecta: "Opción Z",
        leccion: leccionEjemplo._id,
        createdBy: "Admin",
      },
      // Agrega más preguntas según sea necesario
    ];

    await Pregunta.deleteMany({});
    await Pregunta.insertMany(preguntasEjemplo);

    console.log("Seed completado: Datos de Pregunta insertados con éxito");
  } catch (error) {
    console.error("Error durante la inserción de datos de Pregunta:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedPreguntas();
