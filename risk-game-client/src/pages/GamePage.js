import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios'; // Importer Axios


const Game = () => {
    const [username, setUsername] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);


    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const loggedInUser = localStorage.getItem('loggedInUser');
                if (loggedInUser) {
                    const { email } = JSON.parse(loggedInUser);
                    const res = await axios.get(`http://localhost:5000/api/auth/username/${email}`);
                    setUsername(res.data.username);
                }
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };

        fetchUsername();
    }, []);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Clear local storage and redirect to login page
        localStorage.removeItem('loggedInUser');
        window.location.href = '/login';
    };

    const handleSettings = () => {
        // Redirect to settings page
        window.location.href = '/settings';
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Risk Game
                    </Typography>
                    <Typography variant="h6" component="div">
                        Welcome, {username}
                    </Typography>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenuClick}
                        sx={{ ml: 2 }}
                    >
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleSettings}>Settings</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            {/* Other components and game logic */}
        </div>
    );
};

export default Game;
