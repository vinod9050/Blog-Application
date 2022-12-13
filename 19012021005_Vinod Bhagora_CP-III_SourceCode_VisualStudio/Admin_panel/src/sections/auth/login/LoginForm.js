import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  const handleClick = () => {
    fetch(`http://localhost:8000/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg) {
          alert(data.msg);
        } else if (data?.role !== 'admin') {
          alert('Unauthorized access! You are not admin!');
        } else {
          sessionStorage.setItem('accessToken', `Bearer ${data.accessToken}`);
          sessionStorage.setItem('refreshToken', `Bearer ${data.refreshToken}`);
          sessionStorage.setItem('username', data.username);
          sessionStorage.setItem('name', data.name);
          sessionStorage.setItem('role', data.role);
          // sessionStorage.setItem('')
          navigate('/dashboard', { replace: true });
        }
      });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="username"
          label="Username"
          onChange={(e) => setLogin({ ...login, username: e.target.value })}
        />

        <TextField
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <br />

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
