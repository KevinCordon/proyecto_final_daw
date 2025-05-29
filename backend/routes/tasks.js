const express = require('express');
const router = express.Router();
const verifyApiKey = require('../middleware/auth');
const Task = require('../models/Task');


router.get('/getTasks', verifyApiKey, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

router.post('/addTask', verifyApiKey, async (req, res) => {
  const { name, description, dueDate } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Faltan parámetros: name o description' });
  }

  try {
    const newTask = new Task({ name, description, dueDate });
    await newTask.save(); // guarda en MongoDB
    res.status(201).json({ message: 'Tarea agregada', task: newTask });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar tarea' });
  }
});

router.delete('/removeTask', verifyApiKey, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Falta el parámetro id' });
  }

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(400).json({ error: 'No se encontró la tarea con ese id' });
    }

    res.status(200).json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar tarea' });
  }
});

module.exports = router;
