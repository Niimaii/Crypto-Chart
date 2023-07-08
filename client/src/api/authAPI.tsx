import axios from 'axios';

// Change baseURL depending if we are in production or development mode
const baseURL =
  process.env.NODE_ENV === 'production'
    ? '/api/auth'
    : 'http://localhost:8005/api/auth';

export async function onRegistration(registrationData) {
  return await axios.post(`${baseURL}/register`, registrationData);
}

export async function onLogin(loginData) {
  return await axios.post(`${baseURL}/login`, loginData, {
    withCredentials: true,
  });
}

export async function onLogout() {
  return await axios.get(`${baseURL}/logout`, {
    withCredentials: true,
  });
}

export async function fetchProtectedInfo() {
  return await axios.get(`${baseURL}/protected`, {
    withCredentials: true,
  });
}

export async function confirmPassword(password) {
  return await axios.post(
    `${baseURL}/check-pass`,
    { password },
    {
      withCredentials: true,
    }
  );
}

export async function changeEmail(emailInfo) {
  return await axios.patch(`${baseURL}/change-email`, emailInfo, {
    withCredentials: true,
  });
}

export async function changePassword(passwordInfo) {
  return await axios.patch(`${baseURL}/change-password`, passwordInfo, {
    withCredentials: true,
  });
}

export async function deleteUser(passwordInfo) {
  return await axios.patch(
    `${baseURL}/delete`,
    { passwordCheck: passwordInfo },
    {
      withCredentials: true,
    }
  );
}
