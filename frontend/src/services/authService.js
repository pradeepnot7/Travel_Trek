import apiClient from './api';

const authService = {
  login: async (email, password) => {
    const res = await apiClient.post('/auth/login', { email, password });
    const { token, account } = res.data || {};
    if (token) localStorage.setItem('tt_token', token);
    return { token, account };
  },
  register: async (payload) => {
    const res = await apiClient.post('/auth/register', payload);
    return res.data;
  },
  logout: () => {
    localStorage.removeItem('tt_token');
  },
};

export default authService;