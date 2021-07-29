/* eslint-disable linebreak-style */
export const IMAGES_URL = (process.env.NODE_ENV === 'production') ? '/uploads' : 'http://localhost:8000/uploads';
export const API_URL = (process.env.NODE_ENV === 'production') ? '/api' : 'http://localhost:8000/api';

export const AUTH_URL =
  process.env.NODE_ENV === 'production'
    ? '/auth'
    : 'http://localhost:8000/auth';

