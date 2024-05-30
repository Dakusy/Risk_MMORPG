import React, { useState } from 'react';
import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const CreateJoinGame = () => {
    const [open, setOpen] = useState(false);
    const [gameName, setGameName] = useState('');
    const [password, setPassword] = useState('');

    const handleJoinGame = () => {
        // Logic to join an existing game
    };

    const handleCreateGame = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreateGameConfirm = () => {
        // Perform action to create game with name and password (if provided)
        console.log('Creating game with name:', gameName, 'and password:', password);
        // Close the dialog
        setOpen(false);
    };

    return (
        <>
            <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}> 
                Create or Join Game
            </Typography>
            <div style={{ textAlign: 'center' }}>
                <Button variant="contained" color="primary" onClick={handleCreateGame} style={{ marginRight: '10px' }}>
                    Create Game
                </Button>
                <Button variant="contained" color="secondary" onClick={handleJoinGame}>
                    Join Game
                </Button>
            </div>

            {/* Dialog for creating a game */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a Game</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Game Name"
                        type="text"
                        fullWidth
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Password (optional)"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateGameConfirm} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CreateJoinGame;
