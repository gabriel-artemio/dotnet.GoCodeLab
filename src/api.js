import axios from "axios";

const apiUsuario = axios.create({
  baseURL: "https://localhost:44398/api",
});

export const apiInteligenciaArtificial = axios.create({
  baseURL: "http://localhost:5000",
});

apiUsuario.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiUsuario;
