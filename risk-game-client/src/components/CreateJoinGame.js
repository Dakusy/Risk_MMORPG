import React from 'react';
import { Grid, Typography,Button } from '@mui/material';

const CreateJoinGame = () => {
    const handleCreateGame = () => {
        // Logique pour créer une nouvelle partie
    };

    const handleJoinGame = () => {
        // Logique pour rejoindre une partie existante
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Typography variant="h5" gutterBottom>
                Create or Join Game
            </Typography>
            <div style={{ display: 'inline-block', marginRight: '10px' }}>
                <Button variant="contained" color="primary" onClick={handleCreateGame}>
                    Create Game
                </Button>
            </div>
            <div style={{ display: 'inline-block' }}>
                <Button variant="contained" color="secondary" onClick={handleJoinGame}>
                    Join Game
                </Button>
            </div>
        </div>
    );
};

export default CreateJoinGame;