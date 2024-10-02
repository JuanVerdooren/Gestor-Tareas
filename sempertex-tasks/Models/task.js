const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String },
    priority: { type: String, enum: ['bajo', 'medio', 'alto'], default: 'medio' },
    status: { type: String, enum: ['pendiente', 'en proceso', 'completado'], default: 'pendiente' },
    dueDate: { type: Date },
    assignedTo: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;