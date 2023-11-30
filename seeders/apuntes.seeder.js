const mongoose = require("mongoose");
const Apunte = require("../modules/apunte"); // Ajusta la ruta según tu estructura de archivos
//mongodb+srv://pablo:w3nZxo4HY4Dt9VCw@clusterlingolux.mpxr3pd.mongodb.net/lingoLuxDB
// Conectarse a la base de datos (asegúrate de tener una conexión válida configurada)
mongoose.connect("mongodb://localhost:27017/lingoLuxDB", { useNewUrlParser: true, useUnifiedTopology: true });
//
// Función para insertar apuntes de ejemplo
const seedApuntes = async () => {
  try {
    // Datos de ejemplo
    const apuntesEjemplo = [
      {
        titulo: "Apunte 1",
        contenido: ["Contenido 1", "Contenido 2"],
        createdBy: "Usuario1",
      },
      {
        titulo: "Apunte 2",
        contenido: ["Contenido 3", "Contenido 4"],
        createdBy: "Usuario2",
      },
      // Agrega más apuntes según sea necesario
    ];

    // Eliminar todos los apuntes existentes (opcional, dependiendo de tu caso)
    await Apunte.deleteMany({});

    // Insertar apuntes de ejemplo
    await Apunte.insertMany(apuntesEjemplo);

    console.log("Seed completado: Apuntes insertados con éxito");
  } catch (error) {
    console.error("Error durante la inserción de apuntes:", error);
  } finally {
    // Cerrar la conexión a la base de datos
    mongoose.connection.close();
  }
};

// Llamar a la función para ejecutar el seeder
seedApuntes();
