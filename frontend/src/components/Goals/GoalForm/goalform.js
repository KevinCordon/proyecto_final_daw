import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap"; // Importamos Alert para mostrar errores
import { useDispatch } from "react-redux";
import { addGoal } from "../../../redux/actions/goalActions";
import './goalform.scss';

function GoalForm() {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState("");  // Estado para el error

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || !description.trim()) {
            setError("Por favor, ingresa nombre y descripción del goal.");
            return;  // No continúa si falta algo
        }

        if (!dueDate) {
            setError("Por favor, selecciona una fecha límite.");
            return;
        }

        setError("");

        const dueDateObj = new Date(dueDate);
        console.log('Enviando dueDate:', dueDateObj);
        dispatch(addGoal({ name, description, dueDate: dueDateObj }));

        setName("");
        setDescription("");
        setDueDate("");
    };

    return (
        <Form className="goal-form" style={{ width: '30rem' }} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Goal name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Goal description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </Form.Group>

            {/* Mostrar error si existe */}
            {error && <Alert variant="danger">{error}</Alert>}

            <Button variant="primary" type="submit" className="w-100">
                ADD GOAL
            </Button>
        </Form>
    );
}

export default GoalForm;
