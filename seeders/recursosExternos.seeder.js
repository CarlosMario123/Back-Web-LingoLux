const mongoose = require("mongoose");
const RecursosExternos = require("../modules/recursosExterno"); // Ajusta la ruta según tu estructura de archivos

mongoose.connect("mongodb://localhost:27017/lingoLuxDB", { useNewUrlParser: true, useUnifiedTopology: true });

const seedRecursosExternos = async () => {
  try {
    const recursosExternosEjemplo = [
      {
        link: "https://ejemplo.com/recurs1",
      },
      {
        link: "https://ejemplo.com/recurs2",
      },
      // Agrega más recursos externos según sea necesario
    ];

    await RecursosExternos.deleteMany({});
    await RecursosExternos.insertMany(recursosExternosEjemplo);

    console.log("Seed completado: Datos de RecursosExternos insertados con éxito");
  } catch (error) {
    console.error("Error durante la inserción de datos de RecursosExternos:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedRecursosExternos();
