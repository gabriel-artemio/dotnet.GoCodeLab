import { BrowserRouter, Routes, Route } from "react-router-dom";
import Geladeira from "./pages/Geladeira";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Geladeira />} />
      </Routes>
    </BrowserRouter>
  );
}
