import apiClient from './api';

const bookingReservationService = {
  getAll: async (params) => {
    const res = await apiClient.get('/bookings', { params });
    return res.data;
  },
  create: async (payload) => {
    const res = await apiClient.post('/bookings', payload);
    return res.data;
  },
  update: async (id, payload) => {
    const res = await apiClient.put(`/bookings/${id}`, payload);
    return res.data;
  },
  remove: async (id) => {
    await apiClient.delete(`/bookings/${id}`);
    return id;
  },
};

export default bookingReservationService;