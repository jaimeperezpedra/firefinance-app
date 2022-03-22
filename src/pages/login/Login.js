import * as React from 'react';
import { Avatar, Button, CssBaseline, Paper, Box, Grid, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setCredentials } from '../../store/credentials';

import '../../config/firebase'

const theme = createTheme();

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginCall = async () => {
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        dispatch(setCredentials({
          ...credential,
          uid: result.user.uid,
          accessToken: result.user.accessToken
        }));
        navigate('/');
      }).catch((error) => {
        console.log(error);
      });
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
            <Box sx={{ mt: 1 }}>
              <Button
                onClick={loginCall}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In with google
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}