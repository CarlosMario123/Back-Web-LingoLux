const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Memo = require('../modules/Memorama.modules');

// Obtener todos los elementos
router.get('/', async (req, res) => {
  try {
    const memoramas = await Memo.find();
    res.json(memoramas);
  } catch (error) {
    console.error('Error al obtener los elementos:', error);
    res.status(500).send('Error del servidor');
  }
});

// Obtener un elemento por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const memorama = await Memo.findById(id);
    if (!memorama) {
      return res.status(404).json({ msg: 'Memorama no encontrado' });
    }
    res.json(memorama);
  } catch (error) {
    console.error('Error al obtener el elemento por ID:', error);
    res.status(500).send('Error del servidor');
  }
});

// Agregar un nuevo elemento
router.post('/', async (req, res) => {
  const { imagen, nombre, palabra } = req.body;

  try {
    // Validar campos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Crear nuevo elemento
    const nuevoMemorama = new Memo({
      imagen,
      nombre,
      palabra,
    });

    // Guardar en la base de datos
    await nuevoMemorama.save();

    res.json(nuevoMemorama);
  } catch (error) {
    console.error('Error al agregar un nuevo elemento:', error);
    res.status(500).send('Error del servidor');
  }
});

// Actualizar un elemento por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { imagen, nombre, palabra } = req.body;

  try {
    // Validar campos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Buscar y actualizar el elemento
    const memorama = await Memo.findByIdAndUpdate(
      id,
      { imagen, nombre, palabra },
      { new: true }
    );

    if (!memorama) {
      return res.status(404).json({ msg: 'Memorama no encontrado' });
    }

    res.json(memorama);
  } catch (error) {
    console.error('Error al actualizar el elemento por ID:', error);
    res.status(500).send('Error del servidor');
  }
});

// Eliminar un elemento por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar y eliminar el elemento
    const memorama = await Memo.findByIdAndRemove(id);

    if (!memorama) {
      return res.status(404).json({ msg: 'Memorama no encontrado' });
    }

    res.json({ msg: 'Memorama eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el elemento por ID:', error);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
