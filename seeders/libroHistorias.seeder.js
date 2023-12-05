const mongoose = require("mongoose");
const LibroHistoria = require("../modules/librosHistoria"); // Ajusta la ruta según tu estructura de archivos

mongoose.connect("mongodb://localhost:27017/lingoLuxDB", { useNewUrlParser: true, useUnifiedTopology: true });

const seedLibroHistorias = async () => {
  try {
    const libroHistoriasEjemplo = [
      {
        titulo: "Historia 1",
        contenido: [
          { contenidoEsp: "Contenido en español 1", contenidoIng: "Content in English 1" },
          { contenidoEsp: "Contenido en español 2", contenidoIng: "Content in English 2" },
        ],
        createdBy: "Admin",
      },
      {
        titulo: "Historia 2",
        contenido: [
          { contenidoEsp: "Contenido en español 3", contenidoIng: "Content in English 3" },
          { contenidoEsp: "Contenido en español 4", contenidoIng: "Content in English 4" },
        ],
        createdBy: "Admin",
      },
      // Agrega más historias según sea necesario
    ];

    await LibroHistoria.deleteMany({});
    await LibroHistoria.insertMany(libroHistoriasEjemplo);

    console.log("Seed completado: Datos de libroHistoria insertados con éxito");
  } catch (error) {
    console.error("Error durante la inserción de datos de libroHistoria:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedLibroHistorias();
