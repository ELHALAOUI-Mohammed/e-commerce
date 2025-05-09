import axios from 'axios';

// Helper to read cookie value by name
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return decodeURIComponent(match[2]);
  return null;
}

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
     'Content-Type': 'application/json',
  },
});

let csrfFetched = false; // flag to avoid multiple calls

// Request interceptor
axiosClient.interceptors.request.use(async (config) => {
  const csrfToken = getCookie('XSRF-TOKEN');

  // If no token and not yet fetched, get it
  if (!csrfToken && !csrfFetched) {
    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      });
      csrfFetched = true;
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
    }
  }

  // Set token if found
  const token = getCookie('XSRF-TOKEN');
  if (token) {
    config.headers['X-XSRF-TOKEN'] = token;
  }

  return config;
});

export default axiosClient;
