const express = require('express');
const router = express.Router();
const verifyApiKey = require('../middleware/auth');
const Task = require('../models/task');

router.get('/getTasks', verifyApiKey, async (req, res) => {
  try {
    console.log('Iniciando consulta a la base de datos...');
    res.set('Cache-Control', 'no-store');
    const tasks = await Task.find();
    console.log('Número de Tasks encontradas:', tasks.length);
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error en getTasks:', error);
    res.status(500).json({ error: 'Error al obtener tareas desde la base de datos' });
  }
});

router.post('/addTask', verifyApiKey, async (req, res) => {
  const { name, description, dueDate } = req.body;
  console.log('Recibido en backend:', { name, description, dueDate });
  if (!name || !description) {
    return res.status(400).json({ error: 'Faltan parámetros: name o description' });
  }

  try {
    const newTask = new Task({
      name,
      description,
      dueDate: dueDate ? new Date(dueDate) : undefined
    });
    await newTask.save();
    res.status(201).json({ message: 'Tarea agregada correctamente', task: newTask.toJSON() });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la tarea en la base de datos' });
  }
});

router.delete('/removeTask', verifyApiKey, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID requerido' });
  }

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(200).json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
});

module.exports = router;