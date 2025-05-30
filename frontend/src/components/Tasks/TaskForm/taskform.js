import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addTask } from "../../../redux/actions/taskActions"; // Cambiado de goalActions a taskActions
import './taskitem.scss';

function TaskForm() {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("medium"); // Añadido campo de prioridad

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación básica
        if (!name || !description || !dueDate) {
            console.log('⚠️ TaskForm - Faltan campos requeridos');
            return;
        }

        console.log('📝 TaskForm - Creando nueva task:', { name, description, dueDate, priority });

        // Crear objeto de task con todos los campos necesarios
        const newTask = {
            name,
            description,
            dueDate: new Date(dueDate), // Convertir string a objeto Date
            priority,
            completed: false // Las tareas nuevas siempre empiezan como no completadas
        };

        console.log('🚀 TaskForm - Despachando addTask con:', newTask);
        dispatch(addTask(newTask));

        // Limpiar el formulario después de enviar
        setName("");
        setDescription("");
        setDueDate("");
        setPriority("medium");

        console.log('✅ TaskForm - Formulario limpiado');
    };

    return (
        <Form className="task-form" style={{ width: '30rem' }} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Task name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
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
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                    as="select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="low">Baja</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
                ADD Task
            </Button>
        </Form>
    );
}

export default TaskForm;