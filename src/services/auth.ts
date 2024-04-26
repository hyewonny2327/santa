import { redirect } from 'react-router-dom';
import paths from '../utils/path';

export function getAuthToken() {
  return localStorage.getItem('access_token');
}

//user id 대신 email만 주는게 맞는지 다시 확인
export function getUserEmail() {
  return localStorage.getItem('user_email');
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    console.log('need to login.');
    return redirect(paths.LOGIN);
  }

  return null;
}
