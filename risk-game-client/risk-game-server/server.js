// Dans votre fichier server.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());



// Importez le modèle User
const User = require('./models/User');
const bcrypt = require('bcrypt');

// Route d'inscription
app.post('/api/auth/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Vérifiez si l'utilisateur existe déjà dans la base de données
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Vérifiez si le nom d'utilisateur est déjà pris
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        // Hachez le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créez un nouvel utilisateur avec les données d'inscription
        const newUser = new User({ username, email, password: hashedPassword });

        // Enregistrez le nouvel utilisateur dans la base de données
        await newUser.save();

        // Répondez avec un message de succès
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route de connexion
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Recherchez l'utilisateur dans la base de données par email
        const user = await User.findOne({ email });

        if (!user) {
            // Si l'utilisateur n'est pas trouvé, renvoyez une réponse d'erreur
            return res.status(404).json({ error: 'User not found' });
        }

        // Comparez le mot de passe fourni avec celui stocké dans la base de données
        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            // Si le mot de passe est incorrect, renvoyez une réponse d'erreur
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Si les informations d'identification sont correctes, renvoyez une réponse réussie
        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route pour obtenir l'username associé à un email
app.get('/api/auth/username/:email', async (req, res) => {
    const { email } = req.params;

    try {
        // Recherchez l'utilisateur dans la base de données par email
        const user = await User.findOne({ email });

        if (!user) {
            // Si l'utilisateur n'est pas trouvé, renvoyez une réponse d'erreur
            return res.status(404).json({ error: 'User not found' });
        }

        // Si l'utilisateur est trouvé, renvoyez son username
        res.json({ username: user.username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
