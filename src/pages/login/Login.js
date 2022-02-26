import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Paper, Box, Grid, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { setCredentials } from '../../store/credentials'

export const LOGIN = gql`
  mutation loginUser($input: UserCredentials!) {
    loginUser(input: $input) {
      idToken
      email
      refreshToken
      localId
      expiresIn
      registered
    }
  }
`;

const schema = yup.object().shape({
  email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters'),
}).required();

const theme = createTheme();

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser] = useMutation(LOGIN);
  const { register, handleSubmit, formState: {errors} } = useForm(
    {
      resolver: yupResolver(schema),
    }
  );

  const loginCall = async (input) => {
    const { data, errors } = await loginUser({
      variables: {
        input
      }
    });
    if (!errors && !!data.loginUser.localId) {
      await dispatch(setCredentials({
        ...data.loginUser,
      }));
      navigate('/');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(loginCall)} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                {...register('email')}
                label="Email Address"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                {...register('password')}
                label="Password"
                type="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}