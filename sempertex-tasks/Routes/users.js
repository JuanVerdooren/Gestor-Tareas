const express = require('express');
const router = express.Router();
const User = require('../Models/user');

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Obtener un usuario específico
router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'No hay usuarios registrados' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    const { document, name, email } = req.body;

    // Validar campos obligatorios
    if (!document || !name) {
        return res.status(400).json({ message: 'Los campos son obligatorios.' });
    }

    try {
        // Verifica si el documento ya existe
        const existingUser = await User.findOne({ document });
        if (existingUser) {
            return res.status(400).json({ message: 'El documento ya está registrado.' });
        }

        const newUser = new User({ document, name, email });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error al guardar el usuario:', error); // Imprimir el error
        res.status(400).json({ message: error.message });
    }
});
module.exports = router;


// Eliminar un usuario

router.delete('/document/:document', async (req, res) => {
  try {
      const document = Number(req.params.document); // Convierte a número

      // Busca y elimina el usuario por el campo 'document'
      const deletedUser = await User.findByIDAndDelete({ document });

      if (!deletedUser) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;


module.exports = router;

  router.put(':document', async (req, res) => {
    const { document, name, email } = req.body; 
    try {
        const updatedUser = await User.findOneAndUpdate( 
            { document: req.params.document }, 
            { name, email },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;