const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../modules/usuario");
const bcryptjs = require("bcryptjs");

const usuariosGet = async (req = request, res = response) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder || "asc";

    const skip = (page - 1) * perPage;

    const sortOption = { [sortBy]: sortOrder };

    const usuarios = await Usuario.find({ deleted: false })
      .sort(sortOption)
      .skip(skip)
      .limit(perPage);

    res.json({
      usuarios,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener los usuarios",
    });
  }
};

const obtenerUsuarioID = async (req = request, res = response) => {

  try {
    const {id} = req.params;
    if (!id) {
      return res
        .status(404)
        .json({ msg: `EL usuario con el id ${id} no existe` });
    }
    const usuario = await Usuario.findById( id );

    res.json({
      msg: "usuario encontrado",
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al hacer la peticion",
    });
  }
};

const usuariosPut = async (req, res = response) => {
  const id = req.params.id;
  const { nombre, correo, can_estrellas, puntaje, lecciones_compt } = req.body;

  try {
    // Verificar si el usuario con el ID proporcionado existe
    const usuario = await Usuario.findByIdAndUpdate(
      id,
      {
        nombre,
        correo,
        can_estrellas,
        puntaje,
        lecciones_compt,
      },
      { new: true }
    );

    if (!usuario) {
      return res.status(404).json({
        msg: "Usuario no encontrado",
      });
    }

    res.json({
      msg: "Usuario actualizado correctamente",
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al actualizar el usuario",
    });
  }
};

const usuariosPost = async (req, res = response) => {
  const {
    nombre,
    correo,
    password,
    etapas,
    can_estrellas,
    nivel,
    puntaje,
    cuestionarios_compt,
    lecciones_compt,
  } = req.body;
  const usuario = new Usuario({
    nombre,
    correo,
    password,
    etapas,
    can_estrellas,
    nivel,
    puntaje,
    cuestionarios_compt,
    lecciones_compt,
  });

  //encriptar contraseña
  const salt = bcryptjs.genSaltSync(10);
  usuario.password = bcryptjs.hashSync(password, salt);

  //guardar en db
  await usuario.save();

  res.status(201).json({
    usuario,
  });

  console.log(usuario);
};

const mongoose = require("mongoose");
const { startSession } = require("mongoose");

const usuariosPostTrigger = async (req, res = response) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const {
      nombre,
      correo,
      password,
      etapas,
      can_estrellas,
      nivel,
      puntaje,
      cuestionarios_compt,
      lecciones_compt,
    } = req.body;

    const usuario = new Usuario({
      nombre,
      correo,
      password,
      etapas,
      can_estrellas,
      nivel,
      puntaje,
      cuestionarios_compt,
      lecciones_compt,
    });

    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      usuario,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({
      msg: "Error al guardar el usuario",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Busca el usuario por correo
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario no encontrado. Verifica tus credenciales.",
      });
    }

    // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Contraseña incorrecta. Verifica tus credenciales.",
      });
    }

    // Si el inicio de sesión es exitoso, genera un token JWT
    const payload = {
      usuario: {
        id: usuario._id,
      },
    };

    // Clave secreta para firmar el token
    const privateKey = "clave";

    jwt.sign(payload, privateKey, { expiresIn: "365d" }, (error, token) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          msg: "Error al generar el token JWT",
        });
      }

      // Devuelve el token JWT en la respuesta
      res.json({
        msg: "Inicio de sesión exitoso",
        token,
        usuario: {
          id: usuario.id,
        },
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el inicio de sesión",
    });
  }
};

const usuariosDelete = async (req, res = response) => {
  const id = req.params.id;
  const deletedBy = req.usuario.id; // Obtén el ID del usuario que realiza la eliminación

  try {
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({
        msg: "Usuario no encontrado",
      });
    }

    usuario.deleted = true;
    usuario.deletedAt = new Date();
    usuario.deletedBy = deletedBy;

    await usuario.save();

    res.json({
      msg: "Usuario eliminado lógicamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al eliminar lógicamente el usuario",
    });
  }
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API",
  });
};

const obtenerTopUsuarios = async (req, res) => {
  try {
    const topUsuarios = await Usuario.find({ deleted: false })
      .sort({ lecciones_compt: -1, puntaje: -1, can_estrellas: -1 })
      .limit(5);

    res.status(200).json({
      topUsuarios,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener los usuarios",
    });
  }
};

module.exports = {
  usuariosGet,
  obtenerUsuarioID,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
  agregarUsuario: usuariosPostTrigger,
  loginUsuario,
  obtenerTopUsuarios,
};
