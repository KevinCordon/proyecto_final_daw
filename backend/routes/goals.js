const express = require('express');
const router = express.Router();
const verifyApiKey = require('../middleware/auth');
const Goal = require('../models/Goal');

// Obtener todas las metas
router.get('/getGoals', verifyApiKey, async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener metas desde la base de datos' });
  }
});

// Agregar una nueva meta
router.post('/addGoal', verifyApiKey, async (req, res) => {
  const { name, description, deadline } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Faltan parámetros: name o description' });
  }

  try {
    const newGoal = new Goal({ name, description, deadline });
    await newGoal.save();
    res.status(201).json({ message: 'Meta agregada correctamente', goal: newGoal });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la meta en la base de datos' });
  }
});

// Eliminar una meta por ID
router.delete('/removeGoal', verifyApiKey, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID requerido' });
  }

  try {
    const deletedGoal = await Goal.findByIdAndDelete(id);
    if (!deletedGoal) {
      return res.status(404).json({ error: 'Meta no encontrada' });
    }
    res.status(200).json({ message: 'Meta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la meta' });
  }
});

module.exports = router;
