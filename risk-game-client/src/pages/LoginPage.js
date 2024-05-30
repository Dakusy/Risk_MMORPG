import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Paper, Typography, TextField, Button, Link, Dialog, DialogTitle, DialogContent, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios'; // Importer Axios

const CenteredBox = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: 400,
    width: '100%',
    textAlign: 'center',
}));

const StyledForm = styled('form')(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(2, 0),
}));

const ErrorMessage = styled(Typography)({
    color: 'red',
    marginTop: '8px',
});

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false); // State for showing login progress dialog

    useEffect(() => {
        // Hide login progress dialog after 2 seconds
        const timer = setTimeout(() => {
            setIsLoggingIn(false);
        }, 2000);

        // Clear the timer on component unmount
        return () => clearTimeout(timer);
    }, [isLoggingIn]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setIsLoggingIn(true); // Show login progress dialog
    
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });
        
            // Process server response here
            console.log(res.data);
    
            // Redirect to game page if login successful

            localStorage.setItem('loggedInUser', JSON.stringify({ email: email }));

            window.location.href = '/game';
        } catch (err) {
            console.error(err); 
            console.error(err.response.data);
    
            if (err.response && err.response.status === 404) {
                // User not found
                setEmailError('User not found');
            } else if (err.response && err.response.status === 401) {
                // Invalid password
                setPasswordError('Invalid password');
            } else {
                // Other error
                setEmailError('An error occurred');
            }
        } finally {
            // setIsLoggingIn(false); // Hide login progress dialog
        }
    };
    
    

    return (
        <CenteredBox>
            <StyledPaper elevation={6}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <StyledForm onSubmit={handleLoginSubmit}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={handleEmailChange}
                    />
                    {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
                    <Button
                        component={RouterLink}
                        to="/forgot-password"
                        fullWidth
                        variant="text"
                    >
                        Forgot password?
                    </Button>
                    <SubmitButton type="submit" fullWidth variant="contained" color="primary">
                        Sign In
                    </SubmitButton>
                    <Typography variant="body2">
                        Don't have an account?{' '}
                        <Link component={RouterLink} to="/register" variant="body2">
                            Sign Up
                        </Link>
                    </Typography>
                </StyledForm>
            </StyledPaper>
            {isLoggingIn && (
                <Dialog open={isLoggingIn}>
                    <DialogTitle>Logging In...</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">Please wait while we log you in...</Typography>
                        <CircularProgress />
                    </DialogContent>
                </Dialog>
            )}
        </CenteredBox>
    );
};

export default LoginPage;
