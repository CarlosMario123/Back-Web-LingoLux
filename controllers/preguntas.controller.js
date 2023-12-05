const { response } = require("express");
const mongoose = require('mongoose');
const Pregunta = require("../modules/preguntas");
const Leccion = require("../modules/leccion");
const Usuario = require("../modules/usuario");

const obtenerPreguntas = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'asc';
    const skip = (page - 1) * perPage;
    const sortOption = { [sortBy]: sortOrder };

    try {
        const preguntas = await Pregunta.find()
            .sort(sortOption)
            .skip(skip)
            .limit(perPage)
            .session(session);

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({ preguntas });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error(error);
        return res.status(500).json({
            msg: 'Error al cargar las preguntas',
            error: error.message
        });
    }
};

const consultarPregunta = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const idPregunta = req.params.id;
        const pregunta = await Pregunta.findById(idPregunta).session(session);
        const usuario = await Usuario.findById(req.usuario.id).session(session);

        if (!pregunta) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                message: 'Pregunta no encontrada'
            });
        }

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({ pregunta });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error(error);
        return res.status(500).json({
            msg: 'Error al consultar la pregunta',
        });
    }
};

const agregarPregunta = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { nombre, opciones, opcionCorrecta, leccion } = req.body;
    try {
        const pregunta = new Pregunta({ nombre, opciones, opcionCorrecta, leccion });
        await pregunta.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            msg: 'Pregunta nueva agregada'
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error(error);
        return res.status(500).json({
            msg: 'Error al agregar la pregunta',
        });
    }
};

const eliminarPregunta = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const idPregunta = req.params.id;
    try {
        const pregunta = await Pregunta.findByIdAndDelete(idPregunta).session(session);

        if (!pregunta) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                msg: "Pregunta no localizada",
            });
        }

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            msg: "Pregunta eliminada correctamente",
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.log(error);
        return res.status(500).json({
            msg: "Error al eliminar la pregunta",
        });
    }
};

const editarPregunta = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const idPregunta = req.params.id;

    try {
        const { nombre, opciones, opcionCorrecta, leccion } = req.body;
        const datosEditar = { nombre, opciones, opcionCorrecta, leccion, updateAt: new Date() };
        const pregunta = await Pregunta.findByIdAndUpdate(idPregunta, datosEditar, { new: true }).session(session);

        if (!pregunta) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                msg: "Pregunta no encontrada",
            });
        }

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            msg: "Pregunta actualizada correctamente"
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.log(error);
        res.status(500).json({
            msg: "Error al actualizar la pregunta",
        });
    }
};

const respuestaCorrecta = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { respuesta } = req.body;
    const idPregunta = req.params.id;
    const usuario = await Usuario.findById(req.usuario.id).session(session);
    const usuarioAuth = {
        idUsuario: usuario._id,
        username: usuario.nombre,
        estrellas: usuario.can_estrellas,
        completados: usuario.lecciones_compt,
    }
    try {
        const pregunta = await Pregunta.findById(idPregunta).populate('leccion').session(session);
        if (!pregunta) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                message: 'Pregunta no encontrada'
            })
        }
        const idLeccion = pregunta.leccion._id;
        const leccion = await Leccion.findById(idLeccion).session(session);

        if (respuesta !== pregunta.opcionCorrecta) {
            await session.commitTransaction();
            session.endSession();

            return res.status(200).json({
                nombreUsuario: usuarioAuth.username,
                msg: '¡Has fallado! La respuesta es incorrecta',
            });
        } else {
            if (pregunta.num_pregunta === leccion.preguntas.length) {
                usuarioAuth.completados++;
                usuarioAuth.estrellas += 3;
                const actualizado = {
                    lecciones_compt: usuarioAuth.completados,
                    can_estrellas: usuarioAuth.estrellas
                }
                const usuario = await Usuario.findByIdAndUpdate(usuarioAuth.idUsuario, actualizado).session(session);
                if (!usuario) {
                    await session.abortTransaction();
                    session.endSession();
                    return res.status(404).json({
                        message: 'Usuario no encontrado'
                    });
                }
            }

            await session.commitTransaction();
            session.endSession();

            return res.status(200).json({
                nombreUsuario: usuarioAuth.username,
                msg: '¡Acertaste! La respuesta es correcta',
            });
        }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error(error);
        return res.status(500).json({
            msg: 'Error al enviar la respuesta',
        });
    }
};

module.exports = {
    obtenerPreguntas,
    consultarPregunta,
    agregarPregunta,
    eliminarPregunta,
    editarPregunta,
    respuestaCorrecta
};
