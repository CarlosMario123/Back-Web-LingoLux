const mongoose = require("mongoose");
const Leccion = require("../modules/leccion"); // Ajusta la ruta según tu estructura de archivos

// Conectarse a la base de datos (asegúrate de tener una conexión válida configurada)
mongoose.connect("mongodb://localhost:27017/lingoLuxDB", { useNewUrlParser: true, useUnifiedTopology: true });

// Función para insertar datos de ejemplo para la lección
const seedLecciones = async () => {
  try {
    // Datos de ejemplo
    const leccionesEjemplo = [
      {
        titulo: "Lección 1",
        num_leccion: 1,
        temas: [/* ID de temas relacionados */],
        preguntas: [/* ID de preguntas relacionadas */],
        requisito: 0,
        createdBy: "Usuario1",
      },
      {
        titulo: "Lección 2",
        num_leccion: 2,
        temas: [/* ID de temas relacionados */],
        preguntas: [/* ID de preguntas relacionadas */],
        requisito: 1,
        createdBy: "Usuario2",
      },
      // Agrega más lecciones según sea necesario
    ];

    // Eliminar todas las lecciones existentes (opcional, dependiendo de tu caso)
    await Leccion.deleteMany({});

    // Insertar lecciones de ejemplo
    await Leccion.insertMany(leccionesEjemplo);

    console.log("Seed completado: Datos de lección insertados con éxito");
  } catch (error) {
    console.error("Error durante la inserción de datos de lección:", error);
  } finally {
    // Cerrar la conexión a la base de datos
    mongoose.connection.close();
  }
};

// Llamar a la función para ejecutar el seeder
seedLecciones();
