import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../constant/white_logo_no_bg.png';

const ChatPopup = ({ setIsOpenPopup }) => {
    const maxChars = 999;
    const [charCount, setCharCount] = useState(0);

    const handleClose = () => {
        console.log("Close button clicked");
        setIsOpenPopup(false);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            message: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            phone: Yup.string()
                .required('Phone number is required')
                .matches(/^[0-9]{10}$/, 'Phone number is invalid, must be 10 digits'),
            email: Yup.string().email('Invalid email format').required('Email is required'),
            message: Yup.string()
                .required('Message is required')
                .test('maxChars', `Message must be less than ${maxChars} characters`, (value) => {
                    return value ? value.length <= maxChars : true;
                })
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await fetch('https://localhost:7251/api/email/send-customer-support', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        CustomerName: values.name,
                        CustomerEmail: values.email,
                        PhoneNumber: values.phone,
                        Message: values.message
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to send message');
                }

                const result = await response.json();
                console.log(result);

                alert('Message sent successfully');
                resetForm();
                setIsOpenPopup(false);
            } catch (error) {
                console.error('Error sending message:', error);
                alert('Failed to send message. Please try again later.');
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        setCharCount(formik.values.message.length);
    }, [formik.values.message]);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 1000
            }}
        >
            <Paper elevation={3} style={{ maxWidth: '450px', width: '100%', height: '650px', position: 'relative', marginBottom: '17%', borderRadius: '20px' }}>
                <IconButton
                    onClick={handleClose}
                    style={{ position: 'absolute', top: '10px', right: '10px', color: 'white' }}
                >
                    <CloseIcon />
                </IconButton>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <div style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', backgroundColor: '#212121', borderRadius: '20px', height: '250px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '3%' }}>
                            <img src={logo} alt="Tierra Logo" style={{ width: '50px', marginBottom: '10px' }} />
                        </div>
                        <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>Luxe Jewel House</Typography>
                        <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>
                            Welcome to Luxe Jewel House. Please enter your information before starting the chat
                        </Typography>
                    </div>
                    <form noValidate autoComplete="off" style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', height: '430px', borderRadius: '10px', marginTop: '-45px', backgroundColor: 'white' }} onSubmit={formik.handleSubmit}>
                        <TextField
                            style={{ width: '90%', margin: 'auto' }}
                            required
                            label="Your Name"
                            variant="outlined"
                            margin="normal"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            style={{ width: '90%', margin: 'auto' }}
                            required
                            label="Your Phone Number"
                            variant="outlined"
                            margin="normal"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                        />
                        <TextField
                            style={{ width: '90%', margin: 'auto' }}
                            label="Your Email"
                            variant="outlined"
                            margin="normal"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            style={{ width: '90%', margin: 'auto' }}
                            required
                            label="Message"
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={4}
                            name="message"
                            value={formik.values.message}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.message && Boolean(formik.errors.message)}
                            helperText={`${charCount}/${maxChars} characters`}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: '20px', width: '80%', margin: 'auto' }}
                            type="submit"
                            disabled={formik.isSubmitting}
                        >
                            Send Message
                        </Button>
                    </form>
                </Box>
            </Paper>
        </Box>
    );
};

export default ChatPopup;
