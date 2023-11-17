const usuario = require('../modules/usuario');
const Usuario = require('../modules/usuario')

const existeEmial = async(correo ='') =>{
   const emailExiste = await Usuario.findOne({correo});

    if (emailExiste) {
        throw new Error(`El correo ${correo}, ya existe`)
    }
}

const existeID = async(id = '')=>{
    const idExiste = await usuario.findOne({id});

    if (!idExiste) {
        throw new Error(`EL id ${idExiste} no es valido`)
    }
}

module.exports ={
    existeEmial,
    existeID
}