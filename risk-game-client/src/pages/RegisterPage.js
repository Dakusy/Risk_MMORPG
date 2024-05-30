import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Paper, Typography, TextField, Button, Link } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

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

const RegisterPage = () => {
    const [registerFormData, setRegisterFormData] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [registerMessage, setRegisterMessage] = useState('');

    const handleRegisterChange = (e) => {
        setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (registerFormData.username.length < 4) {
            newErrors.username = 'Username must be at least 4 characters long';
        }
        if (!/^\S+@\S+\.\S+$/.test(registerFormData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (registerFormData.password.length < 4) {
            newErrors.password = 'Password must be at least 4 characters long';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const res = await axios.post('http://localhost:5000/api/auth/register', {
                    username: registerFormData.username,
                    email: registerFormData.email,
                    password: registerFormData.password
                });
                setRegisterMessage(res.data.message);
                // Clear form data
                setRegisterFormData({ username: '', email: '', password: '' });
            } catch (error) {
                console.error(error);
                if (error.response && error.response.data) {
                    setRegisterMessage(error.response.data.error);
                } else {
                    setRegisterMessage('An error occurred while registering');
                }
            }
        }
    };

    return (
        <CenteredBox>
            <StyledPaper elevation={6}>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <StyledForm onSubmit={handleRegisterSubmit}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={registerFormData.username}
                        onChange={handleRegisterChange}
                        error={!!errors.username}
                        helperText={errors.username}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={registerFormData.email}
                        onChange={handleRegisterChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={registerFormData.password}
                        onChange={handleRegisterChange}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <SubmitButton type="submit" fullWidth variant="contained" color="primary">
                        Sign Up
                    </SubmitButton>
                    {registerMessage && <ErrorMessage>{registerMessage}</ErrorMessage>}
                    <Typography variant="body2">
                        Already have an account?{' '}
                        <Link component={RouterLink} to="/login" variant="body2">
                            Sign In
                        </Link>
                    </Typography>
                </StyledForm>
            </StyledPaper>
        </CenteredBox>
    );
};

export default RegisterPage;
