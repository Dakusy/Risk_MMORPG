const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { collection: 'Users' });

// Méthode pour comparer le mot de passe
UserSchema.methods.comparePassword = function(candidatePassword) {
    // Comparaison du mot de passe fourni avec le mot de passe hashé stocké dans la base de données
    return bcrypt.compare(candidatePassword, this.password);
};


module.exports = mongoose.model('User', UserSchema);
