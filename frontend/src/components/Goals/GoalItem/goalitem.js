import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeGoal, getGoals } from "../../../redux/actions/goalActions";
import './goalitem.scss';

function Goalitem() {
  const dispatch = useDispatch();

  // Obtener todo el estado de goals para debugging
  const goalState = useSelector((state) => state.goals);
  const { goals, loading, error } = goalState;

  console.log('🏠 GoalItem - Estado completo de goals:', goalState);
  console.log('📋 GoalItem - Array de goals:', goals);
  console.log('⏳ GoalItem - Loading:', loading);
  console.log('❌ GoalItem - Error:', error);
  console.log('🔢 GoalItem - Cantidad de goals:', goals?.length || 0);

  // Llamar getGoals al cargar el componente
  useEffect(() => {
    console.log('🚀 GoalItem - Componente montado, disparando getGoals...');
    dispatch(getGoals());
  }, [dispatch]);

  // Log cuando cambia el estado de goals
  useEffect(() => {
    console.log('📈 GoalItem - Goals actualizados:', goals);
    if (goals && goals.length > 0) {
      console.log('✅ GoalItem - Primer goal:', goals[0]);
    }
  }, [goals]);

  // Log cuando cambia el loading
  useEffect(() => {
    console.log('⏳ GoalItem - Loading state changed:', loading);
  }, [loading]);

  // Log cuando cambia el error
  useEffect(() => {
    if (error) {
      console.log('❌ GoalItem - Error state changed:', error);
    }
  }, [error]);

  const handleRemoveGoal = (goalId) => {
    console.log('🗑️ GoalItem - Removiendo goal con ID:', goalId);
    dispatch(removeGoal(goalId));
  };

  // Mostrar estado de loading
  if (loading) {
    return <div className="goal-list">Loading goals...</div>;
  }

  // Mostrar error si existe
  if (error) {
    return <div className="goal-list">Error: {error}</div>;
  }

  return (
      <div className="goal-list">
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
          <strong>Debug Info:</strong><br />
          Goals count: {goals?.length || 0}<br />
          Loading: {loading ? 'Yes' : 'No'}<br />
          Error: {error || 'None'}
        </div>

        {!goals || goals.length === 0 ? (
            <p>No goals added yet.</p>
        ) : (
            goals.map((goal, index) => {
              console.log(`🎯 GoalItem - Renderizando goal ${index}:`, goal);
              return (
                  <Card style={{ width: '18rem' }} key={goal._id || index} className="mb-3 goal-card">
                    <Card.Body>
                      <Card.Title><strong>Name</strong><br />{goal.name || 'Sin nombre'}</Card.Title>
                      <Card.Text>
                        <strong>Description</strong><br />{goal.description || 'Sin descripción'}
                      </Card.Text>
                      <Card.Text>
                        <strong>Due Date: {goal.dueDate ? new Date(goal.dueDate).toLocaleDateString() : 'No due date'}</strong>
                      </Card.Text>
                      <Button
                          variant="danger"
                          className="w-100"
                          onClick={() => handleRemoveGoal(goal._id)}
                      >
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>
              );
            })
        )}
      </div>
  );
}

export default Goalitem;