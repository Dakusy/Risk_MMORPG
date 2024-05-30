// ForgotPasswordPage.js
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Paper, Typography, TextField, Button, Link } from '@mui/material';
import { styled } from '@mui/system';

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

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();
        // Ajoutez ici la logique de récupération de mot de passe
    };

    return (
        <CenteredBox>
            <StyledPaper elevation={6}>
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                <StyledForm onSubmit={handleForgotPasswordSubmit}>
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
                    <SubmitButton type="submit" fullWidth variant="contained" color="primary">
                        Send Reset Link
                    </SubmitButton>
                    <Typography variant="body2">
                        Remembered your password?{' '}
                        <Link component={RouterLink} to="/login" variant="body2">
                            Sign In
                        </Link>
                    </Typography>
                </StyledForm>
            </StyledPaper>
        </CenteredBox>
    );
};

export default ForgotPasswordPage;
