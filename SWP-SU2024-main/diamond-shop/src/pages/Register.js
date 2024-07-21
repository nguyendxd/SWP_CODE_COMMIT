import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from '../components/navBar';
import logo from '../constant/logo.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes';
import { Radio, FormControlLabel, FormControl, FormLabel, RadioGroup } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Luxe Jewel House
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [otpTimer, setOtpTimer] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 3) {
      const timer = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

  const formikStep1 = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required').min(6, 'Must be at least 6 characters'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: async (values) => {
      try {
        // Check if the username is already taken
        const response = await fetch('https://localhost:7251/api/Users/check-username', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: values.username }),
        });

        const result = await response.json();

        if (response.ok) {
          if (result.isUsernameTaken) {
            // Username is taken, show an error message
            alert('Username is already taken. Please choose another one.');
          } else {
            // Username is not taken, proceed to the next step
            setUsername(values.username);
            setPassword(values.password);
            setStep(2);
          }
        } else {
          alert(`Error: ${result.error || 'An error occurred while checking the username'}`);
        }
      } catch (error) {
        console.error('Error checking username:', error);
        alert('Error checking username. Please try again later.');
      }
    },
  });

  const formikStep2 = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Required').email('Invalid email'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('https://localhost:7251/api/Users/send-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: values.email }),
        });

        if (response.ok) {
          setEmail(values.email);
          setStep(3);
        } else {
          const errorData = await response.json();
          console.error('Error sending OTP:', errorData);
          alert(`Error: ${errorData.error || 'An error occurred while sending OTP'}`);
        }
      } catch (error) {
        console.error('Error sending OTP:', error);
        alert('Error sending OTP. Please try again later.');
      }
    },
  });

  const formikStep3 = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: Yup.object({
      otp: Yup.string().required('Required').length(6, 'OTP must be 6 digits'),
    }),
    onSubmit: async (values) => {
      try {
        const otpResponse = await fetch('https://localhost:7251/api/Users/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, otp: values.otp }),
        });

        if (otpResponse.ok) {
          setStep(4);
        } else {
          const errorData = await otpResponse.json();
          console.error('Error verifying OTP:', errorData);
          alert(`Error verifying OTP: ${errorData.error || 'An error occurred while verifying OTP'}`);
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
        alert('Error verifying OTP. Please try again later.');
      }
    },
  });

  const formikStep4 = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      sex: '',
      dateOfBirth: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      phoneNumber: Yup.string().required('Required').matches(/^\d{10}$/, 'Must be a valid phone number'),
      address: Yup.string().required('Required'),
      sex: Yup.string().required('Required'),
      dateOfBirth: Yup.date().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const userData = {
          username,
          password,
          email,
          name: `${values.firstName} ${values.lastName}`,
          phoneNumber: values.phoneNumber,
          address: values.address,
          sex: values.sex,
          dateOfBirth: values.dateOfBirth,
        };

        const registerResponse = await fetch('https://localhost:7251/api/Users/complete-registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (registerResponse.ok) {
          const result = await registerResponse.json();
          console.log('User registered successfully:', result);
          alert('User registered successfully');
          navigate(routes.login);
        } else {
          const errorData = await registerResponse.json();
          console.error('Error completing registration:', errorData);
          alert(`Error completing registration: ${errorData.error || 'An error occurred while completing registration'}`);
        }
      } catch (error) {
        console.error('Error completing registration:', error);
        alert('Error completing registration. Please try again later.');
      }
    },
  });

  return (
    <div>
      <NavBar />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'transparent' }} src={logo} />
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            {step === 1 && (
              <Box component="form" noValidate onSubmit={formikStep1.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      value={formikStep1.values.username}
                      onChange={formikStep1.handleChange}
                    />
                    {formikStep1.errors.username && (
                      <Typography variant="caption" color="red">
                        {formikStep1.errors.username}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={formikStep1.values.password}
                      onChange={formikStep1.handleChange}
                    />
                    {formikStep1.errors.password && (
                      <Typography variant="caption" color="red">
                        {formikStep1.errors.password}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      value={formikStep1.values.confirmPassword}
                      onChange={formikStep1.handleChange}
                    />
                    {formikStep1.errors.confirmPassword && (
                      <Typography variant="caption" color="red">
                        {formikStep1.errors.confirmPassword}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Next
                </Button>
              </Box>
            )}
            {step === 2 && (
              <Box component="form" noValidate onSubmit={formikStep2.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={formikStep2.values.email}
                      onChange={formikStep2.handleChange}
                    />
                    {formikStep2.errors.email && (
                      <Typography variant="caption" color="red">
                        {formikStep2.errors.email}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Send OTP
                </Button>
              </Box>
            )}
            {step === 3 && (
              <Box component="form" noValidate onSubmit={formikStep3.handleSubmit} sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary" align="center">
                  {`OTP expires in ${otpTimer} seconds`}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="otp"
                      label="OTP"
                      name="otp"
                      autoComplete="otp"
                      value={formikStep3.values.otp}
                      onChange={formikStep3.handleChange}
                    />
                    {formikStep3.errors.otp && (
                      <Typography variant="caption" color="red">
                        {formikStep3.errors.otp}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Verify OTP
                </Button>
              </Box>
            )}
            {step === 4 && (
              <Box component="form" noValidate onSubmit={formikStep4.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      autoComplete="given-name"
                      value={formikStep4.values.firstName}
                      onChange={formikStep4.handleChange}
                    />
                    {formikStep4.errors.firstName && (
                      <Typography variant="caption" color="red">
                        {formikStep4.errors.firstName}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      value={formikStep4.values.lastName}
                      onChange={formikStep4.handleChange}
                    />
                    {formikStep4.errors.lastName && (
                      <Typography variant="caption" color="red">
                        {formikStep4.errors.lastName}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="phoneNumber"
                      label="Phone Number"
                      name="phoneNumber"
                      autoComplete="phone-number"
                      value={formikStep4.values.phoneNumber}
                      onChange={formikStep4.handleChange}
                    />
                    {formikStep4.errors.phoneNumber && (
                      <Typography variant="caption" color="red">
                        {formikStep4.errors.phoneNumber}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                      autoComplete="address"
                      value={formikStep4.values.address}
                      onChange={formikStep4.handleChange}
                    />
                    {formikStep4.errors.address && (
                      <Typography variant="caption" color="red">
                        {formikStep4.errors.address}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl component="fieldset" error={Boolean(formikStep4.errors.sex)}>
                      <FormLabel component="legend">Sex</FormLabel>
                      <RadioGroup
                        aria-label="sex"
                        name="sex"
                        value={formikStep4.values.sex}
                        onChange={formikStep4.handleChange}
                      >
                        <FormControlLabel value="man" control={<Radio />} label="Male" />
                        <FormControlLabel value="woman" control={<Radio />} label="Female" />
                      </RadioGroup>
                      {formikStep4.errors.sex && (
                        <Typography variant="caption" color="error">
                          {formikStep4.errors.sex}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="dateOfBirth"
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={formikStep4.values.dateOfBirth}
                      onChange={formikStep4.handleChange}
                    />
                    {formikStep4.errors.dateOfBirth && (
                      <Typography variant="caption" color="red">
                        {formikStep4.errors.dateOfBirth}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Complete Registration
                </Button>
              </Box>
            )}
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
