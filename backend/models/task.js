// backend/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    dueDate: {
        type: Date,
        required: false
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    }
}, {
    timestamps: true // Esto agrega createdAt y updatedAt automáticamente
});

// Método para convertir a JSON limpio
taskSchema.methods.toJSON = function() {
    const task = this.toObject();
    return {
        _id: task._id,
        name: task.name,
        description: task.description,
        dueDate: task.dueDate,
        completed: task.completed,
        priority: task.priority,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt
    };
};

module.exports = mongoose.model('Task', taskSchema);