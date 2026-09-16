import apiClient from './api';

const tripItineraryService = {
  getAll: async (params) => {
    const res = await apiClient.get('/itineraries', { params });
    return res.data;
  },
  create: async (payload) => {
    const res = await apiClient.post('/itineraries', payload);
    return res.data;
  },
  update: async (id, payload) => {
    const res = await apiClient.put(`/itineraries/${id}`, payload);
    return res.data;
  },
  confirm: async (id) => {
    const res = await apiClient.put(`/itineraries/${id}/confirm`);
    return res.data;
  },
  remove: async (id) => {
    await apiClient.delete(`/itineraries/${id}`);
    return id;
  },
  generateWithAi: async (prompt) => {
    const res = await apiClient.post('/itineraries/ai-generate', { prompt });
    return res.data;
  },
};

export default tripItineraryService;