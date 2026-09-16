import apiClient from './api';

const systemAccountService = {
  getAll: async (params) => {
    const res = await apiClient.get('/accounts', { params });
    return res.data;
  },
  create: async (payload) => {
    const res = await apiClient.post('/accounts', payload);
    return res.data;
  },
  update: async (id, payload) => {
    const res = await apiClient.put(`/accounts/${id}`, payload);
    return res.data;
  },
  remove: async (id) => {
    await apiClient.delete(`/accounts/${id}`);
    return id;
  },
};

export default systemAccountService;