const mongoose = require('mongoose');
const Memo = require('../modules/Memorama.modules');

const memoData = [
  {
    imagen: 'https://img.freepik.com/vector-gratis/diseno-etiqueta-manzana-aislada_1308-66383.jpg?size=626&ext=jpg&ga=GA1.1.869968824.1700621027&semt=ais',
    nombre: 'Memorama 1',
    palabra: 'Apple',
  },
  {
    imagen: 'https://img.freepik.com/vector-gratis/diseno-etiqueta-manzana-aislada_1308-66383.jpg?size=626&ext=jpg&ga=GA1.1.869968824.1700621027&semt=ais',
    nombre: 'Memorama 1',
    palabra: 'Manzana',
  },
  {
    imagen: 'https://holatelcel.com/wp-content/uploads/2018/06/HEAD-GARFIELD.jpg',
    nombre: 'Memorama 3',
    palabra: 'Cat',
  },
  {
    imagen: 'https://holatelcel.com/wp-content/uploads/2018/06/HEAD-GARFIELD.jpg',
    nombre: 'Memorama 3',
    palabra: 'Gato',
  },
];

async function seedDatabase() {
  try {
    // Conectar a la base de datos
    await mongoose.connect('mongodb://127.0.0.1:27017/lingoLuxBDD', { useNewUrlParser: true, useUnifiedTopology: true });

    // Eliminar todos los documentos existentes en la colección Memo
    await Memo.deleteMany({}).exec();

    // Insertar los datos del seeder en la colección Memo
    await Memo.insertMany(memoData);

    console.log('Seeder ejecutado con éxito');

    // Desconectar de la base de datos después de sembrar los datos
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error al ejecutar el seeder:', error);
  }
}

// Llamar a la función para sembrar la base de datos
seedDatabase();
