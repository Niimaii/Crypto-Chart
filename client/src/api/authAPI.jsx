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
  return await axios.get('http://localhost:8005/api/auth/logout', {
    withCredentials: true,
  });
}

export async function fetchProtectedInfo() {
  return await axios.get('http://localhost:8005/api/auth/protected', {
    withCredentials: true,
  });
}

export async function confirmPassword(password) {
  return await axios.post(
    'http://localhost:8005/api/auth/check-pass',
    { password },
    {
      withCredentials: true,
    }
  );
}

export async function changeEmail(email) {
  return await axios.patch(
    'http://localhost:8005/api/auth/change-email',
    { email },
    {
      withCredentials: true,
    }
  );
}

export async function changePassword(passwordInfo) {
  return await axios.patch(
    'http://localhost:8005/api/auth/change-password',
    passwordInfo,
    {
      withCredentials: true,
    }
  );
}
