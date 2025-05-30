
import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeGoal, getGoals } from "../../../redux/actions/goalActions";
import './goalitem.scss';
import { motion, AnimatePresence } from "framer-motion";

function Goalitem() {
  const dispatch = useDispatch();

  const goalState = useSelector((state) => state.goals || state);
  const { goals, loading, error } = goalState;

  useEffect(() => {
    dispatch(getGoals());
  }, [dispatch]);

  useEffect(() => {
    if (goals && goals.length > 0) {
    }
  }, [goals]);

  useEffect(() => {
  }, [loading]);

  useEffect(() => {
    if (error) {
    }
  }, [error]);

  const handleRemoveGoal = async (goalId) => {

    if (window.confirm('¿Estás seguro de que quieres eliminar este goal?')) {
      dispatch(removeGoal(goalId));
    } else {
      console.log('GoalItem - Usuario canceló eliminación');
    }
  };

  if (loading) {
    return <div className="goal-list">Loading goals...</div>;
  }

  if (error) {
    return <div className="goal-list">Error: {error}</div>;
  }

  return (
      <div className="goal-list">

        {!goals || goals.length === 0 ? (
            <p>No goals added yet.</p>
        ) : <AnimatePresence>
          {goals.map((goal, index) => (
              <motion.div
                  key={goal._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}  // Animación al borrar
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  layout  // Ayuda a animar el reacomodo de elementos
              >
                <Card style={{ width: '18rem' }} className="mb-3 goal-card">
                  <Card.Body>
                    <Card.Title><strong>Name</strong><br />{goal.name || 'Sin nombre'}</Card.Title>
                    <Card.Text><strong>Description</strong><br />{goal.description || 'Sin descripción'}</Card.Text>
                    <Card.Text><strong>Due Date: {goal.dueDate ? new Date(goal.dueDate).toLocaleDateString() : 'No due date'}</strong></Card.Text>
                    <Button variant="danger" className="w-100" onClick={() => handleRemoveGoal(goal._id)}>
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
          ))}
        </AnimatePresence>
        }
      </div>
  );
}

export default Goalitem;