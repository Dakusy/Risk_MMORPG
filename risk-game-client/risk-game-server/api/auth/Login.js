// Importer les modules nécessaires
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Importer le modèle User
const User = require('../models/User');

// Route de connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe dans la base de données
        let user = await User.findOne({ email });

        // Si l'utilisateur n'existe pas, renvoyer un message d'erreur
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Vérifier si le mot de passe est correct
        const isMatch = await bcrypt.compare(password, user.password);

        // Si le mot de passe est incorrect, renvoyer un message d'erreur
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Si les identifiants sont corrects, vous pouvez renvoyer une réponse réussie
        res.json({ message: 'Login successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
