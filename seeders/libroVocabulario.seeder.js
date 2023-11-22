const mongoose = require("mongoose");
const LibroVocabulario = require("../modules/librosVocabulario"); // Ajusta la ruta según tu estructura de archivos

mongoose.connect("mongodb://localhost:27017/lingoLuxDB", { useNewUrlParser: true, useUnifiedTopology: true });

const seedLibroVocabulario = async () => {
  try {
    const libroVocabularioEjemplo = [
      {
        titulo: "Vocabulario 1",
        contenido: [
          { contenidoEsp: "Palabra 1", contenidoIng: "Word 1", url: "https://ejemplo.com/palabra1" },
          { contenidoEsp: "Palabra 2", contenidoIng: "Word 2", url: "https://ejemplo.com/palabra2" },
        ],
        createdBy: "Admin",
      },
      {
        titulo: "Vocabulario 2",
        contenido: [
          { contenidoEsp: "Palabra 3", contenidoIng: "Word 3", url: "https://ejemplo.com/palabra3" },
          { contenidoEsp: "Palabra 4", contenidoIng: "Word 4", url: "https://ejemplo.com/palabra4" },
        ],
        createdBy: "Admin",
      },
      // Agrega más vocabulario según sea necesario
    ];

    await LibroVocabulario.deleteMany({});
    await LibroVocabulario.insertMany(libroVocabularioEjemplo);

    console.log("Seed completado: Datos de libroVocabulario insertados con éxito");
  } catch (error) {
    console.error("Error durante la inserción de datos de libroVocabulario:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedLibroVocabulario();
