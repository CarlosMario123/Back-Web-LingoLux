const Pregunta = require("../modules/preguntas");

const preguntasGet = async (req, res) => {
    try {
        const preguntas = await Pregunta.find();
        return res.status(200).json({ preguntas });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error al cargar las preguntas',
            error: error.msg
        });
    }
};

const preguntasGetById = async (req, res) => {
    try {
        const idPregunta = req.params.id;
        const pregunta = await Pregunta.findById(idPregunta);

        if (!pregunta) {
            return res.status(404).json({
                message: 'Pregunta no encontrada'
            })
        }
        return res.json({ pregunta });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error al consultar la pregunta',
        });
    }
};

const preguntasPost = async (req, res) => {
    const { nombre, opciones, opcionCorrecta, idLeccion } = req.body;
    try {
        const pregunta = new Pregunta({ nombre, opciones, opcionCorrecta, idLeccion });
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

const respuestaCorrecta = async (req, res) => {
    const { respuestaUsuario } = req.body;
    const idPregunta = req.params.id;
    try {
        const pregunta = await Pregunta.findById(idPregunta);
        if (!pregunta) {
            return res.status(404).json({
                message: 'Pregunta no encontrada'
            })
        }
        const respuesta = pregunta.opcionCorrecta;

        if (respuestaUsuario !== respuesta) {
            return res.status(200).json({
                msg: '¡Has fallado! La respuesta es incorrecta',
            });
        } else {
            return res.status(200).json({
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
    preguntasGet,
    preguntasGetById,
    preguntasPost,
    respuestaCorrecta
};