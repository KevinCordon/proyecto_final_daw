
import React from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeGoal } from "../../../redux/actions/goalActions";
import './goalitem.scss';

function Goalitem() {
  const goals = useSelector((state) => state.goals);
  const dispatch = useDispatch();

  return (
    <div className="goal-list">
      {goals.length === 0 ? (
        <p>No goals added yet.</p>
      ) : (
        goals.map((goal, index) => (
          <Card style={{ width: '18rem' }} key={index} className="mb-3 goal-card">
            <Card.Body>
              <Card.Title><strong>Name</strong><br />{goal.name}</Card.Title>
              <Card.Text>
                <strong>Description</strong><br />{goal.description}
              </Card.Text>
              <Card.Text>
                <strong>Due Date:</strong> {goal.dueDate}
              </Card.Text>
              <Button
                variant="danger"
                className="w-100"
                onClick={() => dispatch(removeGoal(index))}
              >
                Remove
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default Goalitem;



