import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Typography, Container, Box, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as yup from 'yup';
import logo from '../../constant/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../routes';

const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Required')
});

const otpSchema = yup.object({
    otp: yup.string().matches(/^\d{6}$/, 'Enter a valid 6-digit OTP').required('Required')
});

const PasswordReset = () => {
    const [open, setOpen] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [otp, setOtp] = useState(Array(6).fill(''));
    const otpRefs = useRef([]);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch('https://localhost:7251/api/users/forgot-password/send-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: values.email }),
                });
                if (response.ok) {
                    setOtpSent(true);
                    setOpen(true);
                    setCountdown(60);
                } else {
                    const contentType = response.headers.get('content-type');
                    const errorResponse = contentType && contentType.includes('application/json')
                        ? await response.json()
                        : await response.text();
                    alert(errorResponse.message || errorResponse || 'Failed to send OTP. Please try again.');
                }
            } catch (error) {
                alert('Failed to send OTP. Please try again.');
            }
        }
    });

    const handleOtpChange = (e, index) => {
        const { value } = e.target;
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 5) {
                otpRefs.current[index + 1].focus();
            }
        }
    };

    useEffect(() => {
        let timer;
        if (otpSent && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [otpSent, countdown]);

    const handleResendOtp = async () => {
        setCountdown(60);
        try {
            const response = await fetch('https://localhost:7251/api/users/forgot-password/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formik.values.email }),
            });
            if (!response.ok) {
                alert('Failed to resend OTP. Please try again.');
            }
        } catch (error) {
            alert('Failed to resend OTP. Please try again.');
        }
    };

    const handleConfirmOtp = async () => {
        const otpString = otp.join('');
        const isValid = otpSchema.isValidSync({ otp: otpString });

        if (isValid) {
            try {
                const response = await fetch('https://localhost:7251/api/users/forgot-password/send-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: formik.values.email, otp: otpString }),
                });
                if (response.ok) {
                    navigate('/login/enter-new-password', { state: { email: formik.values.email } });
                } else {
                    alert('Invalid OTP. Please try again.');
                }
            } catch (error) {
                alert('Invalid OTP. Please try again.');
            }
        } else {
            alert('Please enter a valid 6-digit OTP');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
                <Box sx={{ width: '100%', padding: 3, border: '1px solid #ddd', borderRadius: 2, boxShadow: 3 }}>
                    <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
                        <img src={logo} alt="Logo" style={{ maxWidth: '100px', width: '60px', height: '60px' }} />
                    </Box>
                    <Typography style={{ textAlign: 'center' }} variant="h5" component="h1" gutterBottom>
                        Forgot Your Password?
                    </Typography>
                    <Typography style={{ textAlign: 'center' }} variant="body1" gutterBottom>
                        Enter your email and we'll send you OTP code to reset your password.
                    </Typography>
                    <form style={{ width: 'auto' }} onSubmit={formik.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    width: '80%',
                                    backgroundColor: 'black',
                                    color: 'white',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        backgroundColor: 'gray',
                                        color: 'white'
                                    }
                                }}
                                type="submit"
                            >
                                Send OTP Code
                            </Button>
                        </Box>
                    </form>
                    <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                        <Box sx={{ flex: 1, height: '1px', backgroundColor: 'black' }} />
                        <Typography sx={{ mx: 2, color: 'gray' }}>OR</Typography>
                        <Box sx={{ flex: 1, height: '1px', backgroundColor: 'black' }} />
                    </Box>
                    <div style={{ textAlign: 'center' }}>
                        <Link to={routes.register}>Create new account.</Link><br />
                        <Link to={routes.login}>Back to login.</Link>
                    </div>
                </Box>
            </Box>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>
                    OTP Verification
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpen(false)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>OTP has been sent to your email: {formik.values.email}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                        {[...Array(6)].map((_, index) => (
                            <TextField
                                key={index}
                                variant="outlined"
                                margin="normal"
                                required
                                inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                                sx={{ width: '3rem', mx: 1 }}
                                inputRef={el => otpRefs.current[index] = el}
                                value={otp[index]}
                                onChange={(e) => handleOtpChange(e, index)}
                            />
                        ))}
                    </Box>
                    {countdown > 0 ? (
                        <Typography gutterBottom>Resend OTP in {countdown}s</Typography>
                    ) : (
                        <Button onClick={handleResendOtp}
                            sx={{
                                color: 'black'
                            }}
                        >Resend OTP</Button>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleConfirmOtp}
                        variant="contained"
                        sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'gray',
                                color: 'white'
                            }
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default PasswordReset;
