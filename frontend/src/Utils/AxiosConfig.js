// // src/utils/axiosConfig.js
// import axios from 'axios';

// // Create axios instance with base URL for REMOTE backend
// const api = axios.create({
//   baseURL: 'https://cic-opening-day-backend.onrender.com/api/', // REMOTE backend
//   timeout: 10000, // 10 seconds timeout
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor - add token to every request
// api.interceptors.request.use(
//   (config) => {
//     console.log('🌐 Making request to:', config.url);
//     console.log('🔑 Has token?', !!localStorage.getItem('access_token'));
//     const token = localStorage.getItem('access_token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor - handle token refresh
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
    
//     // If error is 401 and we haven't tried refreshing yet
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       try {
//         const refreshToken = localStorage.getItem('refresh_token');
        
//         if (!refreshToken) {
//           throw new Error('No refresh token');
//         }
        
//         // Try to refresh the token - USE REMOTE URL
//         const response = await axios.post('https://cic-opening-day-backend.onrender.com/api/token/refresh/', {
//           refresh: refreshToken
//         });
        
//         const { access } = response.data;
        
//         // Update the access token
//         localStorage.setItem('access_token', access);
        
//         // Retry the original request with new token
//         originalRequest.headers.Authorization = `Bearer ${access}`;
//         return api(originalRequest);
        
//       } catch (refreshError) {
//         console.error('Token refresh failed:', refreshError);
        
//         // Clear all auth data and redirect to login
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('refresh_token');
//         localStorage.removeItem('team_id');
        
//         // Only redirect if we're not already on login page
//         if (!window.location.pathname.includes('/login')) {
//           window.location.href = '/login';
//         }
        
//         return Promise.reject(refreshError);
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );

// export default api;

// src/utils/axiosConfig.js
import axios from 'axios';

// Use environment variable if available, otherwise default
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://cic-opening-day-backend.onrender.com/api/';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If unauthorized and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        
        // Use the same axios instance for consistency
        const refreshResponse = await api.post('/token/refresh/', {
          refresh: refreshToken
        });
        
        const { access } = refreshResponse.data;
        
        // Save new token
        localStorage.setItem('access_token', access);
        
        // Update header and retry
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
        
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        
        // Clear auth and redirect
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('team_id');
        
        // Redirect to login if not already there
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }
    
    // For 500 errors, add more context
    if (error.response?.status === 500) {
      console.error('Server Error (500) on:', originalRequest.url);
      console.error('Server says:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);


export default api;