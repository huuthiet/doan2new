import React, {useState, useEffect} from 'react';
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
import { NavLink, useNavigate } from 'react-router-dom';

import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { getDatabase, ref, set, get } from "firebase/database";

import { auth, database } from  '../../firebase-config';


const defaultTheme = createTheme();

export default function SignUp() {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idRoom, setIdRoom] = useState('');
  const [error, setError] = useState(null);


  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);

        const user = userCredential.user;

        // Thêm thông tin quyền vào Realtime Database
        const userRef = ref(database, `users/${user.uid}`);
        set(userRef, {
          id: user.uid,
          fullname:firstName + " " + lastName ,
          phonenumber: phoneNumber,
          email: user.email,
          role: "user", 
          idroom: idRoom,
        });

        const roomRef = ref(database, `rooms/${idRoom}`);
        set(roomRef, {
          id: idRoom, 
          power: 0,
          energy: 0,
          electric: 0,
          volt: 0
        });

        navigate("/login");

        console.log("User registered successfully!");
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(error.message);
      });
  };

  // const isValidEmail = (email) => {
  //   // Bạn có thể thay đổi biểu thức chính quy này theo cần thiết
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  // const isValidPassword = (password) => {
  //   // Bạn có thể thay đổi các điều kiện của mật khẩu theo cần thiết
  //   return password.length >= 8;
  // };

  // const signUp = async (e) => {
  //   e.preventDefault();
  
  //   if (!isValidEmail(email) || !isValidPassword(password)) {
  //     console.log("Email or password is not valid");
  //     return;
  //   }
  
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     console.log(userCredential);
  
  //     const user = userCredential.user;
  
  //     const userRef = ref(database, `users/${user.uid}`);
  //     const snapshot = await get(userRef);
  
  //     if (!snapshot.exists()) {
  //       set(userRef, {
  //         id: user.uid,
  //         fullname: firstName + " " + lastName,
  //         phonenumber: phoneNumber,
  //         email: user.email,
  //         role: "user"
  //       });
  
  //       const roomRef = ref(database, `rooms/${user.uid}`);
  //       set(roomRef, {
  //         power: 0,
  //         energy: 0,
  //         electric: 0,
  //         volt: 0
  //       });
  
  //       navigate("/login");
  
  //       console.log("User registered successfully!");
  //     } else {
  //       console.log("User already exists in the database");
  //       // Xử lý khi người dùng đã tồn tại
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log(errorCode, errorMessage);
  //   }
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={signUp} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phone"
                  type="tel"  
                  inputProps={{ pattern: "[0-9]*" }}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="id-room"
                  label="Id Room"
                  type="number"
                  id="id-room"
                  autoComplete="id-room"
                  onChange={(e) => setIdRoom(e.target.value)}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            {error && (
              <Typography variant="body2" color="error" gutterBottom>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link 
                  to="/login" 
                  variant="body2" 
                  onClick={(e) => { e.preventDefault();
                                              navigate("/login");}}
                  style={{ cursor: 'pointer' }}>
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


// import React, {useState} from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import {  createUserWithEmailAndPassword  } from 'firebase/auth';
// import { getDatabase, ref, set } from "firebase/database";

// import { auth, database } from  '../../firebase-config';
 
// const Signup = () => {
//     const navigate = useNavigate();

 
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('');
 
    // const onSubmit = async (e) => {
    //   e.preventDefault()
     
    //   await createUserWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //         // Signed in
    //         const user = userCredential.user;
    //         console.log(user);
    //         navigate("/login")
    //         // ...
    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         console.log(errorCode, errorMessage);
    //         // ..
    //     });
    // }

    // const signUp = (e) => {
    //   e.preventDefault();
    //   createUserWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //       console.log(userCredential);

    //       const user = userCredential.user;

    //       // Thêm thông tin quyền vào Realtime Database
    //       const userRef = ref(database, `users/${user.uid}`);
    //       set(userRef, {
    //         fullname:"",
    //         phone: null,
    //         email: user.email,
    //         role: "user" 
    //       });

    //       console.log("User registered successfully!");
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // };
 
//   return (
//     <main >        
//         <section>
//             <div>
//                 <div>                  
//                     <h1> FocusApp </h1>                                                                            
//                     <form>                                                                                            
//                         <div>
//                             <label htmlFor="email-address">
//                                 Email address
//                             </label>
//                             <input
//                                 type="email"
//                                 label="Email address"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}  
//                                 required                                    
//                                 placeholder="Email address"                                
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="password">
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 label="Create password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)} 
//                                 required                                 
//                                 placeholder="Password"              
//                             />
//                         </div>                                             
                        
//                         <button
//                             type="submit" 
//                             onClick={signUp}                        
//                         >  
//                             Sign up                                
//                         </button>
                                                                     
//                     </form>
                   
//                     <p>
//                         Already have an account?{' '}
//                         <NavLink to="/login" >
//                             Sign in
//                         </NavLink>
//                     </p>                   
//                 </div>
//             </div>
//         </section>
//     </main>
//   )
// }
 
// export default Signup;