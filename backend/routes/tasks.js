// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const verifyApiKey = require('../middleware/auth');
const Task = require('../models/Task');

// Obtener todas las tareas
router.get('/getTasks', verifyApiKey, async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store');
    const tasks = await Task.find().sort({ createdAt: -1 }); // Ordenar por fecha de creación (más recientes primero)
    console.log('Tareas obtenidas desde la base de datos:', tasks);
    console.log('Número de tareas encontradas:', tasks.length);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tareas desde la base de datos' });
  }
});

router.post('/addTask', verifyApiKey, async (req, res) => {
  const { name, description, dueDate, priority } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Faltan parámetros: name o description son requeridos' });
  }

  try {
    const newTask = new Task({
      name,
      description,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority: priority || 'medium',
      completed: false
    });

    await newTask.save();
    res.status(201).json({ message: 'Tarea agregada correctamente', task: newTask.toJSON() });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la tarea en la base de datos' });
  }
});

router.patch('/updateTask', verifyApiKey, async (req, res) => {
  const { id, completed, name, description, dueDate, priority } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID de tarea requerido' });
  }

  try {
    const updateData = {};
    if (completed !== undefined) updateData.completed = completed;
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;
    if (priority !== undefined) updateData.priority = priority;

    const updatedTask = await Task.findByIdAndUpdate(
        id,
        updateData,
        { new: true } // Retornar el documento actualizado
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.status(200).json({ message: 'Tarea actualizada correctamente', task: updatedTask.toJSON() });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
});

router.delete('/removeTask', verifyApiKey, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID de tarea requerido' });
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