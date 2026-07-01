import axios from "axios";

const api = axios.create({
  baseURL: "https://coworkflex-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getSpaces = (city, capacity) => {
  const params = {};
  if (city) params.city = city;
  if (capacity) params.capacity = capacity;
  return api.get("/spaces", { params });
};

export const getDesks = (spaceId) => api.get(`/spaces/${spaceId}/desks`);

export const createReservation = (data) => api.post("/reservations", data);

export const getUserReservations = (userId) => api.get(`/reservations/user/${userId}`);

export const cancelReservation = (id) => api.delete(`/reservations/${id}`);

export default api;
