const mongoose = require("mongoose");
const Generador = require("../modules/generadore"); // Ajusta la ruta según tu estructura de archivos

// Conectarse a la base de datos (asegúrate de tener una conexión válida configurada)
mongoose.connect("mongodb://localhost:27017/lingoLuxDB", { useNewUrlParser: true, useUnifiedTopology: true });

// Función para insertar datos de ejemplo para el generador
const seedGenerador = async () => {
  try {
    // Datos de ejemplo
    const datosEjemplo = [
      {
        ingles: "Hello",
        español: "Hola",
        respuestas: ["Hi", "Hey"],
      },
      {
        ingles: "Goodbye",
        español: "Adiós",
        respuestas: ["Farewell", "See you later"],
      },
      // Agrega más datos según sea necesario
    ];

    // Eliminar todos los datos existentes (opcional, dependiendo de tu caso)
    await Generador.deleteMany({});

    // Insertar datos de ejemplo
    await Generador.insertMany(datosEjemplo);

    console.log("Seed completado: Datos del generador insertados con éxito");
  } catch (error) {
    console.error("Error durante la inserción de datos del generador:", error);
  } finally {
    // Cerrar la conexión a la base de datos
    mongoose.connection.close();
  }
};

// Llamar a la función para ejecutar el seeder
seedGenerador();
