import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import logo from '../../constant/logo.png';
import { routes } from '../../routes';

const validationSchema = yup.object({
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const NewPassword = () => {
    const [resetSuccessful, setResetSuccessful] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();
    const email = location.state?.email;

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch('https://localhost:7251/api/users/forgot-password/reset', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        newPassword: values.password,
                    }),
                });
                if (response.ok) {
                    setResetSuccessful(true);
                } else {
                    const contentType = response.headers.get('content-type');
                    const errorResponse = contentType && contentType.includes('application/json')
                        ? await response.json()
                        : await response.text();
                    alert(errorResponse.message || errorResponse || 'Failed to reset password Please try again.');
                }
            } catch (error) {
                setErrorMessage('Failed to reset password. Please try again.');
            }
        },
    });

    if (resetSuccessful) {
        return <Navigate to="/login" />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    padding: 3,
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    boxShadow: 3
                }}
            >
                <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
                    <img src={logo} alt="Logo" style={{ maxWidth: '100px', width: '60px', height: '60px' }} />
                </Box>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="New Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="confirmPassword"
                        label="Confirm New Password"
                        name="confirmPassword"
                        type="password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />
                    {errorMessage && (
                        <Typography color="error" variant="body2" align="center">
                            {errorMessage}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Save new password
                    </Button>
                    <div style={{ textAlign: 'center' }}>
                        <Link to={routes.login}>Back to login.</Link>
                    </div>
                </Box>
            </Box>
        </Container>
    );
};

export default NewPassword;
