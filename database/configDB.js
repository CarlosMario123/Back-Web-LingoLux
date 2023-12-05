const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect('mongodb+srv://carlos:iFHxilrZNOVtxVpw@clusterlingolux.mpxr3pd.mongodb.net/lingoLuxDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Base de datos online");
    
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
