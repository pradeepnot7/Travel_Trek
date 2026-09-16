import apiClient from './api';

const travelPackageService = {
  getAll: async (params) => {
    const res = await apiClient.get('/packages', { params });
    return res.data;
  },
  create: async (payload) => {
    const res = await apiClient.post('/packages', payload);
    return res.data;
  },
  update: async (id, payload) => {
    const res = await apiClient.put(`/packages/${id}`, payload);
    return res.data;
  },
  remove: async (id) => {
    await apiClient.delete(`/packages/${id}`);
    return id;
  },
};

export default travelPackageService;