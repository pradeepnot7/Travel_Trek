import apiClient from './api';

const plannedActivityService = {
  getAll: async (params) => {
    const res = await apiClient.get('/activities', { params });
    return res.data;
  },
  create: async (payload) => {
    const res = await apiClient.post('/activities', payload);
    return res.data;
  },
  update: async (id, payload) => {
    const res = await apiClient.put(`/activities/${id}`, payload);
    return res.data;
  },
  remove: async (id) => {
    await apiClient.delete(`/activities/${id}`);
    return id;
  },
};

export default plannedActivityService;