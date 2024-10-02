require('dotenv').config(); 

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./sempertex-tasks/config/db');
const taskRoutes = require('./sempertex-tasks/Routes/tasks');
const userRoutes = require('./sempertex-tasks/Routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


// Rutas
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});