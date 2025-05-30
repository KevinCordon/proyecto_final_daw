import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addTask } from "../../../redux/actions/taskActions";
import './taskform.scss';

function TaskForm() {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || !description.trim()) {
            setError("Por favor, ingresa nombre y descripción del task.");
            return;  // No continúa si falta algo
        }

        if (!dueDate) {
            setError("Por favor, selecciona una fecha límite.");
            return;
        }

        setError("");

        const dueDateObj = new Date(dueDate);
        console.log("Enviando dueDate:", dueDateObj);
        dispatch(addTask({ name, description, dueDate: dueDateObj }));

        setName("");
        setDescription("");
        setDueDate("");
        setError("");
    };

    return (
        <Form className="task-form" style={{ width: "30rem" }} onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Task name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Task description"
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

            <Button variant="primary" type="submit" className="w-100">
                ADD TASK
            </Button>
        </Form>
    );
}

export default TaskForm;
