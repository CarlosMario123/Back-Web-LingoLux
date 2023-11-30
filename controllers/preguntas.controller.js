const Pregunta = require("../modules/preguntas");
const Leccion = require("../modules/leccion");
const Usuario = require("../modules/usuario");

const obtenerPreguntas = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'asc';
    const skip = (page - 1) * perPage;
    const sortOption = { [sortBy]: sortOrder };

    try {
        const preguntas = await Pregunta.find({ deleted: false })
            .sort(sortOption)
            .skip(skip)
            .limit(perPage);

        let response = {
            message: 'preguntas obtenidas exitosamente',
            preguntas
        }

        if (page && perPage) {
            const total = await Pregunta.countDocuments({ deleted: false });
            const totalPages = Math.ceil(total / perPage);
            const currentPage = parseInt(page);

            response = {
                ...response, total, totalPages, currentPage
            }
        }
        return res.status(200).json({ response });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error al cargar las preguntas',
            error: error.msg
        });
    }
};

const consultarPregunta = async (req, res) => {
    try {
        const idPregunta = req.params.id;
        const pregunta = await Pregunta.findById(idPregunta).populate('leccion', { requisito: 1 });

        if (!pregunta) {
            return res.status(404).json({
                message: 'Pregunta no encontrada'
            })
        }
        return res.status(200).json({ pregunta });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error al consultar la pregunta',
        });
    }
};

const agregarPregunta = async (req, res) => {
    const { nombre, opciones, opcionCorrecta, leccion } = req.body;
    try {
        const pregunta = new Pregunta({ nombre, opciones, opcionCorrecta, leccion, createdBy: req.usuario.id });
        await pregunta.save();

        return res.status(200).json({
            msg: 'Pregunta nueva agregada'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error al agregar la pregunta',
        });
    }
};

const eliminarPreguntaLog = async (req, res) => {
    const idPregunta = req.params.id;
    try {
        const pregunta = await Pregunta.findByIdAndUpdate(idPregunta,
            { deleted: true, deletedAt: new Date(), deletedBy: req.usuario.id });

        if (!pregunta) {
            return res.status(404).json({
                msg: "Pregunta no localizada",
            });
        }
        return res.status(200).json({
            msg: "Pregunta eliminada correctamente",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error al eliminar la pregunta",
        });
    }
};

const eliminarPreguntaFis = async (req, res) => {
    const idPregunta = req.params.id;
    try {
        const pregunta = await Pregunta.findByIdAndDelete(idPregunta);

        if (!pregunta) {
            return res.status(404).json({
                msg: "Pregunta no localizada",
            });
        }
        return res.status(200).json({
            msg: "Pregunta eliminada correctamente",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error al eliminar la pregunta",
        });
    }
};

const editarPregunta = async (req, res) => {
    const idPregunta = req.params.id;

    try {
        const { nombre, opciones, opcionCorrecta, leccion } = req.body;
        const datosEditar = { nombre, opciones, opcionCorrecta, leccion, updatedAt: new Date(), updatedBy: req.usuario.id };
        const pregunta = await Pregunta.findByIdAndUpdate(idPregunta, datosEditar);

        if (!pregunta) {
            return res.status(404).json({
                msg: "Pregunta no encontrada",
            });
        }

        return res.status(200).json({
            msg: "Pregunta actualizada correctamente"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al actualizar la pregunta",
        });
    }
};

const respuestaCorrecta = async (req, res) => {
    const { respuesta } = req.body;
    const idPregunta = req.params.id;
    const usuario = await Usuario.findById(req.usuario.id);
    const usuarioAuth = {
        idUsuario: usuario._id,
        username: usuario.nombre,
        estrellas: usuario.can_estrellas,
        completados: usuario.lecciones_compt,
    }
    try {
        const pregunta = await Pregunta.findById(idPregunta).populate('leccion');
        if (!pregunta) {
            return res.status(404).json({
                message: 'Pregunta no encontrada'
            })
        }
        const idLeccion = pregunta.leccion._id;
        const leccion = await Leccion.findById(idLeccion);

        if (respuesta !== pregunta.opcionCorrecta) {
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
                const usuario = await Usuario.findByIdAndUpdate(usuarioAuth.idUsuario, actualizado);
                if (!usuario) {
                    return res.status(404).json({
                        message: 'Usuario no encontrado'
                    });
                }
            }
            return res.status(200).json({
                nombreUsuario: usuarioAuth.username,
                msg: '¡Acertaste! La respuesta es correcta',
            });
        }
    } catch (error) {
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
    eliminarPregunta: eliminarPreguntaLog,
    editarPregunta,
    respuestaCorrecta
};