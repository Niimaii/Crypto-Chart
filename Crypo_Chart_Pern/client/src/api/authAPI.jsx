import axios from 'axios';

export async function onRegistration(registrationData) {
  return await axios.post(
    'http://localhost:8005/api/auth/register',
    registrationData
  );
}

export async function onLogin(loginData) {
  return await axios.post('http://localhost:8005/api/auth/login', loginData, {
    withCredentials: true,
  });
}

export async function onLogout() {
  return await axios.get('http://localhost:8005/api/auth/logout');
}

export async function fetchProtectedInfo() {
  return await axios.get('http://localhost:8005/api/auth/protected', {
    withCredentials: true,
  });
}
