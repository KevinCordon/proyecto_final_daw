// components/TaskItem.js
import React, { useEffect, useState } from "react";
import { Card, Button, Badge, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeTask, getTasks, updateTask } from "../../../redux/actions/taskActions";
import './taskitem.scss'; // Asume que tendrás estilos similares

function TaskItem() {
  const dispatch = useDispatch();

  // Obtener todo el estado de tasks para debugging
  const taskState = useSelector((state) => state.tasks);
  const { tasks, loading, error } = taskState;

  console.log('🏠 TaskItem - Estado completo de tasks:', taskState);
  console.log('📋 TaskItem - Array de tasks:', tasks);
  console.log('⏳ TaskItem - Loading:', loading);
  console.log('❌ TaskItem - Error:', error);
  console.log('🔢 TaskItem - Cantidad de tasks:', tasks?.length || 0);

  // Llamar getTasks al cargar el componente
  useEffect(() => {
    console.log('🚀 TaskItem - Componente montado, disparando getTasks...');
    dispatch(getTasks());
  }, [dispatch]);

  // Log cuando cambia el estado de tasks
  useEffect(() => {
    console.log('📈 TaskItem - Tasks actualizadas:', tasks);
    if (tasks && tasks.length > 0) {
      console.log('✅ TaskItem - Primera task:', tasks[0]);
    }
  }, [tasks]);

  // Log cuando cambia el loading
  useEffect(() => {
    console.log('⏳ TaskItem - Loading state changed:', loading);
  }, [loading]);

  // Log cuando cambia el error
  useEffect(() => {
    if (error) {
      console.log('❌ TaskItem - Error state changed:', error);
    }
  }, [error]);

  const handleRemoveTask = async (taskId) => {
    console.log('🗑️ TaskItem - Removiendo task con ID:', taskId);

    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      console.log('✅ TaskItem - Usuario confirmó eliminación de task');
      dispatch(removeTask(taskId));
    } else {
      console.log('❌ TaskItem - Usuario canceló eliminación de task');
    }
  };

  const handleToggleComplete = (taskId, currentStatus) => {
    console.log('✅ TaskItem - Cambiando estado de completado:', taskId, 'de', currentStatus, 'a', !currentStatus);
    dispatch(updateTask(taskId, { completed: !currentStatus }));
  };

  const getPriorityVariant = (priority) => {
    switch(priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getPriorityText = (priority) => {
    switch(priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return 'Sin definir';
    }
  };

  // Mostrar estado de loading
  if (loading) {
    return <div className="task-list">Loading tasks...</div>;
  }

  // Mostrar error si existe
  if (error) {
    return <div className="task-list">Error: {error}</div>;
  }

  return (
      <div className="task-list">
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
          <strong>🔍 Debug Info - Tasks:</strong><br />
          Tasks count: {tasks?.length || 0}<br />
          Loading: {loading ? 'Yes' : 'No'}<br />
          Error: {error || 'None'}<br />
          Completed tasks: {tasks?.filter(task => task.completed).length || 0}<br />
          Pending tasks: {tasks?.filter(task => !task.completed).length || 0}
        </div>

        {!tasks || tasks.length === 0 ? (
            <p>No tasks added yet.</p>
        ) : (
            tasks.map((task, index) => {
              console.log(`🎯 TaskItem - Renderizando task ${index}:`, task);
              return (
                  <Card
                      style={{ width: '18rem' }}
                      key={task._id || index}
                      className={`mb-3 task-card ${task.completed ? 'completed-task' : ''}`}
                  >
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Card.Title style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                          <strong>Name</strong><br />{task.name || 'Sin nombre'}
                        </Card.Title>
                        <Badge variant={getPriorityVariant(task.priority)}>
                          {getPriorityText(task.priority)}
                        </Badge>
                      </div>

                      <Card.Text style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        <strong>Description</strong><br />{task.description || 'Sin descripción'}
                      </Card.Text>

                      <Card.Text>
                        <strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                      </Card.Text>

                      <Card.Text>
                        <strong>Status:</strong>
                        <Badge variant={task.completed ? 'success' : 'warning'} className="ml-2">
                          {task.completed ? 'Completada' : 'Pendiente'}
                        </Badge>
                      </Card.Text>

                      <div className="d-flex flex-column gap-2">
                        <Button
                            variant={task.completed ? 'warning' : 'success'}
                            className="w-100"
                            onClick={() => handleToggleComplete(task._id, task.completed)}
                        >
                          {task.completed ? 'Marcar como Pendiente' : 'Marcar como Completada'}
                        </Button>

                        <Button
                            variant="danger"
                            className="w-100"
                            onClick={() => handleRemoveTask(task._id)}
                        >
                          Remove Task
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
              );
            })
        )}
      </div>
  );
}

export default TaskItem;