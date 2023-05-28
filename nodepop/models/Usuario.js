const mongoose = require('mongoose');

// Crear esquema
const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
})

// Crear el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Exportar el modelo
module.exports = Usuario;