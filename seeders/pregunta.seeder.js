const mongoose = require("mongoose");
const Pregunta = require("../modules/pregunta"); // Ajusta la ruta según tu estructura de archivos

mongoose.connect("mongodb://localhost:27017/lingoLuxDB", { useNewUrlParser: true, useUnifiedTopology: true });

const seedPreguntas = async () => {
  try {
    const preguntasEjemplo = [
      {
        preguntas: {
          pregunta: "¿Cuál es la capital de Francia?",
          respuestas: ["Madrid", "Berlín", "París", "Londres"],
        },
        respuestaCorrecta: "París",
      },
      {
        preguntas: {
          pregunta: "¿Cuántas patas tiene un gato?",
          respuestas: ["2", "4", "6", "8"],
        },
        respuestaCorrecta: "4",
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
