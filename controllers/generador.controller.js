const Generador = require("../modules/generadore");
const mongoose = require('mongoose');

// Controlador para obtener todos los generadores
const obtenerGeneradores = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const generadores = await Generador.find({}).session(session);
        const cantidadGeneradores = generadores.length;

        if (cantidadGeneradores === 0) {
            await session.commitTransaction();
            session.endSession();
            return res.status(404).json({
                msg: "No hay generadores disponibles",
            });
        }

        const indiceAleatorio = Math.floor(Math.random() * cantidadGeneradores);
        const generadorAleatorio = generadores[indiceAleatorio];

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            generador: generadorAleatorio,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error(error);
        res.status(500).json({
            msg: "Error al obtener el generador aleatorio",
        });
    }
};

// Controlador para obtener un solo generador por su ID
const obtenerGeneradorPorId = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const id = req.params.id;

    try {
        const generador = await Generador.findById(id).session(session);

        if (!generador) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                msg: "Generador no encontrado",
            });
        }

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            generador,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error(error);
        res.status(500).json({
            msg: "Error al obtener el generador por ID",
        });
    }
};

// Controlador para crear un nuevo generador
const crearGenerador = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const nuevoGenerador = new Generador(req.body);
        await nuevoGenerador.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            mensaje: "Generador creado exitosamente",
            generador: nuevoGenerador,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error(error);
        res.status(500).json({
            msg: "Error al crear el generador",
        });
    }
};

// Controlador para actualizar un generador por su ID
const actualizarGenerador = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const id = req.params.id;
    const { ingles, español, respuestas } = req.body;

    try {
        const generador = await Generador.findByIdAndUpdate(id, { ingles, español, respuestas }, { new: true }).session(session);

        if (!generador) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                msg: "Generador no encontrado",
            });
        }

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            msg: "Generador actualizado correctamente",
            generador,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error(error);
        res.status(500).json({
            msg: "Error al actualizar el generador",
        });
    }
};

// Controlador para eliminar lógicamente un generador por su ID
const eliminarGeneradorLog = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const id = req.params.id;

    try {
        const generador = await Generador.findById(id).session(session);

        if (!generador) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                msg: "Generador no encontrado",
            });
        }

        await generador.deleteOne();
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            msg: "Generador eliminado",
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error(error);
        res.status(500).json({
            msg: "Error al eliminar lógicamente el generador",
        });
    }
};

module.exports = {
    obtenerGeneradores,
    obtenerGeneradorPorId,
    crearGenerador,
    actualizarGenerador,
    eliminarGeneradorLog,
};
