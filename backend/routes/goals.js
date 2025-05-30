const express = require('express');
const router = express.Router();
const verifyApiKey = require('../middleware/auth');
const Goal = require('../models/Goal');

router.get('/getGoals', verifyApiKey, async (req, res) => {
  try {
    console.log('Iniciando consulta a la base de datos...');
    res.set('Cache-Control', 'no-store');
    const goals = await Goal.find();
    console.log('Número de Goals encontrados:', goals.length);
    res.status(200).json(goals);
  } catch (error) {
    console.error('Error en getGoals:', error);
    res.status(500).json({ error: 'Error al obtener metas desde la base de datos' });
  }
});

router.post('/addGoal', verifyApiKey, async (req, res) => {
  const { name, description, dueDate } = req.body;
  console.log('Recibido en backend:', { name, description, dueDate });
  if (!name || !description) {
    return res.status(400).json({ error: 'Faltan parámetros: name o description' });
  }

  try {
    const newGoal = new Goal({
      name,
      description,
      dueDate: dueDate ? new Date(dueDate) : undefined
    });
    await newGoal.save();
    res.status(201).json({ message: 'Meta agregada correctamente', goal: newGoal.toJSON() });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la meta en la base de datos' });
  }
});

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
