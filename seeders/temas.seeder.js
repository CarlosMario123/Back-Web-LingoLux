const mongoose = require("mongoose");
const Tema = require("../modules/temas"); // Ajusta la ruta según tu estructura de archivos
const Leccion = require("../modules/leccion"); // Ajusta la ruta según tu estructura de archivos

mongoose.connect("mongodb://localhost:27017/lingoLuxDB", { useNewUrlParser: true, useUnifiedTopology: true });

const seedTemas = async () => {
  try {
    // Buscar una lección existente (asegúrate de que haya lecciones en tu base de datos)
    const leccionEjemplo = await Leccion.findOne();

    if (!leccionEjemplo) {
      console.error("No se encontró ninguna lección en la base de datos.");
      return;
    }

    const temasEjemplo = [
      {
        nombre: "Tema 1",
        cuerpo: "Contenido del Tema 1",
        imagen: ["https://ejemplo.com/imagen1.jpg", "https://ejemplo.com/imagen2.jpg"],
        leccion: leccionEjemplo._id,
        createdBy: "Admin",
      },
      {
        nombre: "Tema 2",
        cuerpo: "Contenido del Tema 2",
        imagen: ["https://ejemplo.com/imagen3.jpg"],
        leccion: leccionEjemplo._id,
        createdBy: "Admin",
      },
      // Agrega más temas según sea necesario
    ];

    await Tema.deleteMany({});
    await Tema.insertMany(temasEjemplo);

    console.log("Seed completado: Datos de Tema insertados con éxito");
  } catch (error) {
    console.error("Error durante la inserción de datos de Tema:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedTemas();
