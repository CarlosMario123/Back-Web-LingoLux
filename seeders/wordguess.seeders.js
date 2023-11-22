const mongoose = require("mongoose");
const Wordguess = require("../modules/wordguess.modules");

mongoose.connect("mongodb://localhost:27017/your-database-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = [
  {
    words: ["apple", "banana", "orange"]
  },
  // Agrega más objetos según sea necesario
];

async function seedDatabase() {
  try {
    await Wordguess.deleteMany({}); // Limpia la colección antes de agregar nuevos datos
    await Wordguess.insertMany(seedData);
    console.log("Seed data added successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.disconnect(); // Cierra la conexión después de agregar los datos
  }
}

seedDatabase();
