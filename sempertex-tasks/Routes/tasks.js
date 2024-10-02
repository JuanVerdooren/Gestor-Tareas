const express = require("express");
const router = express.Router();
const Task = require("../Models/task");

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Crear una nueva tarea
router.post("/", async (req, res) => {
  const { title, description, priority, status, dueDate, assignedTo } = req.body;

  const newTask = new Task({
      title,
      description,
      priority,
      status,
      dueDate,
      assignedTo: assignedTo || null
  });

  try {
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
  } catch (error) {
      console.error("Error al guardar la tarea:", error);
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;

// Actualizar una tarea
router.put('/:id', async (req, res) => {
  const { title, description, priority, status, dueDate, assignedTo } = req.body;
  try {
      const updatedTask = await Task.findByIdAndUpdate(
          req.params.id,
          { title, description, priority, status, dueDate, assignedTo },
          { new: true }
      );
      res.json(updatedTask);
  } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;

// Eliminar una tarea
router.delete('/title/:title', async (req, res) => {
  const { title } = req.params;

  try {
      const deletedTask = await Task.findOneAndDelete({ title });
      
      if (!deletedTask) {
          return res.status(404).json({ message: 'Tarea no encontrada' });
      }

      res.status(200).json({ message: 'Tarea eliminada' });
  } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;

// Reporte del estado de tareas
router.patch("/:title/status", async (req, res) => {
  const { title } = req.params;
  const { status } = req.body; // Estado nuevo que se quiere asignar

  try {
    // Verifica que el estado sea válido
    if (!["pendiente", "en proceso", "completado"].includes(status)) {
      return res.status(400).json({ message: "Estado no válido." });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { title },
      { status },
      { new: true } // Devuelve el documento actualizado
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Tarea no encontrada." });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
