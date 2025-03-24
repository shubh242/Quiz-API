import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import { FormLabel, Box, Button, TextField, Typography } from '@mui/material';
import NavBar from '../utils/navbar';

const Register = () => {
  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateData = () => {
    let isValid = true;

    if (!user.password || user.password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateData()) return; 

    try {
      await axios.post('http://127.0.0.1:8000/api/users/register/', user);
      alert('Registration successful');
      navigate('/login');
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <div>
      <NavBar />
      <Box component="form" onSubmit={handleRegister} sx={{ display: 'flex', mx: 'auto', width: 500, my: '10%', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          Register
        </Typography>

        <FormControl>
          <FormLabel htmlFor="username">Username *</FormLabel>
          <TextField
            type="text"
            required
            fullWidth
            placeholder="Username"
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            type="email"
            fullWidth
            placeholder="Email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">Password *</FormLabel>
          <TextField
            type="password"
            required
            fullWidth
            placeholder="••••••"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            error={passwordError} 
            helperText={passwordErrorMessage} 
          />
        </FormControl>

        <Button type="submit" fullWidth variant="contained">
          Register
        </Button>
      </Box>
    </div>
  );
};

export default Register;