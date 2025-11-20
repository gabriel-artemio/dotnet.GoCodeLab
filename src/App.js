import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Pacientes from "./pages/Pacientes";
import Geladeira from "./pages/Geladeira";

function Private({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Private><Home /></Private>} />
        <Route path="/pacientes" element={<Private><Pacientes /></Private>} />
        <Route path="/geladeira" element={<Private><Geladeira /></Private>} />
      </Routes>
    </BrowserRouter>
  );
}