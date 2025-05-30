import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeTask, getTasks } from "../../../redux/actions/taskActions";
import './taskitem.scss';
import { motion, AnimatePresence } from "framer-motion";

function TaskItem() {
  const dispatch = useDispatch();

  const taskState = useSelector((state) => state.tasks || state);
  const { tasks, loading, error } = taskState;

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
    }
  }, [tasks]);

  useEffect(() => {
  }, [loading]);

  useEffect(() => {
    if (error) {
    }
  }, [error]);

  const handleRemoveTask = async (taskId) => {

    if (window.confirm('¿Estás seguro de que quieres eliminar esta task?')) {
      dispatch(removeTask(taskId));
    } else {
      console.log('TaskItem - Usuario canceló eliminación');
    }
  };

  if (loading) {
    return <div className="task-list">Loading tasks...</div>;
  }

  if (error) {
    return <div className="task-list">Error: {error}</div>;
  }

  return (
      <div className="task-list">

        {!tasks || tasks.length === 0 ? (
            <p>No tasks added yet.</p>
        ) : <AnimatePresence>
          {tasks.map((task, index) => (
              <motion.div
                  key={task._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  layout
              >
                <Card style={{ width: '18rem' }} className="mb-3 task-card">
                  <Card.Body>
                    <Card.Title><strong>Name</strong><br />{task.name || 'Sin nombre'}</Card.Title>
                    <Card.Text><strong>Description</strong><br />{task.description || 'Sin descripción'}</Card.Text>
                    <Card.Text><strong>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</strong></Card.Text>
                    <Button variant="danger" className="w-100" onClick={() => handleRemoveTask(task._id)}>
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
          ))}
        </AnimatePresence>}
      </div>
  );
}

export default TaskItem;