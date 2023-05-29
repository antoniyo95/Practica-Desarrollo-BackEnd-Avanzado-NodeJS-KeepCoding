const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Crear esquema
const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
})

// Método estático
usuarioSchema.statics.hashPassword = function(passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 7)
}

// Método de instancia
usuarioSchema.methods.comparePassword = function(passwordEnClaro) {
  return bcrypt.compare(passwordEnClaro, this.password);
}

// Crear el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Exportar el modelo
module.exports = Usuario;