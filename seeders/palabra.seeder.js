const mongoose = require("mongoose");
const Palabra = require("../modules/palabra"); // Ajusta la ruta según tu estructura de archivos

mongoose.connect("mongodb://localhost:27017/lingoLuxDB", { useNewUrlParser: true, useUnifiedTopology: true });

const seedPalabras = async () => {
  try {
    const palabrasEjemplo = [
      {
        imagen: "https://ejemplo.com/imagen1.jpg",
        nombre: "Palabra1",
        palabraEsp: "Casa",
        palabraIng: "House",
      },
      {
        imagen: "https://ejemplo.com/imagen2.jpg",
        nombre: "Palabra2",
        palabraEsp: "Perro",
        palabraIng: "Dog",
      },
      // Agrega más palabras según sea necesario
    ];

    await Palabra.deleteMany({});
    await Palabra.insertMany(palabrasEjemplo);

    console.log("Seed completado: Datos de Palabra insertados con éxito");
  } catch (error) {
    console.error("Error durante la inserción de datos de Palabra:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedPalabras();
