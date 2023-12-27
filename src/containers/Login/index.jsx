import React, {useState, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../../redux/user/userSlice';

import { getDatabase, ref, child, get } from "firebase/database";
import { addDoc, collection } from "@firebase/firestore"
import {  signInWithEmailAndPassword  } from 'firebase/auth';
import {database, auth} from '../../firebase-config';



const defaultTheme = createTheme();

// function getInforUser (user) {
//   const userRef = ref(database, `users/${user.uid}`);
//   get(userRef)
//   .then((snapshot) => {
//     if (snapshot.exists()) {
//       const userData = snapshot.val();
//       console.log('User data:', userData);
//       return userData;
//     } else {
//       console.log('User data not found');
//     }
//   })
//   .catch((error) => {
//     console.error('Error getting user data:', error);
//   });
// }

const fetchDataUser = async (user) => {
  const databaseRef = ref(database, 'users/' + user.uid);
  
  try {
    const snapshot = await get(databaseRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      console.log('User data not found');
      return null;
    }
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector(state => state.user);
  console.log("user in login", user);
  console.log("user in loginnnn", user.currentUser.role);
  console.log("user in loginnnn compart", JSON.stringify(user.currentUser) === '{}');

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("userCredential",userCredential);
  
      const userInfor = await fetchDataUser(userCredential.user);
  
      if (userInfor !== null) {
        dispatch(signInSuccess(userInfor));
  
        navigate("/home");
  
        console.log('current user', userInfor);
        console.log('userrrr', user)
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error));
    }
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   dispatch(signInStart());
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       console.log(userCredential);

  //       const userInfor = await fetchDataUser(userCredential.user);

  //       if (userInfor !== null) {
  //         dispatch(signInSuccess(userInfor));

  //         navigate("/home");

  //         console.log('current user', user.currentUser.role);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       dispatch(signInFailure(error));
  //     });
  // };


  return (
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
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
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
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
              <Link 
                to="/login" 
                variant="body2" 
                onClick={(e) => { e.preventDefault();
                                            navigate("/register");}}
                style={{ cursor: 'pointer' }}>
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}