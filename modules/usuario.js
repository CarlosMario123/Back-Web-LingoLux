const {Schema,model} = require('mongoose');

const userSchema = Schema({

    nombre:{
        type: String,
        required: [true,'El nombre es requerido ']
    },
    correo:{
        type: String,
        required:[true,'El correo es requerido'],
        unique:true
    },
    password:{
        type: String,
        required:[true,'La contraseña es requerida']
    },
    etapas:{
        type: String
    },
    can_estrellas:{
        type : Number
    },
    nivel:{
        type: Number
    },
    puntaje:{
        type: Number
    },
    cuestionarios_compt:{
        type:Number
    },
    lecciones_compt:{
        type:Number
    }

    /*google:{
        type: Boolean,   
        default: true   
    },*/
});

module.exports = model('Usuario', userSchema)