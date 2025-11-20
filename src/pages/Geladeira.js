import NavbarTop from "../components/NavbarTop";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, } from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function Geladeira() {
  const temperaturaMax = 7.5;
  const temperaturaMin = 3.2;
  const totalAnomalias = 4;
  const status = "Operando normalmente";

  const tempData = {
    labels: ["08h", "10h", "12h", "14h", "16h", "18h"],
    datasets: [
      {
        label: "Temperatura (°C)",
        data: [4.2, 5.1, 6.8, 7.5, 6.9, 5.4],
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const anomaliaData = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
    datasets: [
      {
        label: "Anomalias",
        data: [0, 1, 0, 2, 0, 1, 0],
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <NavbarTop />

      <div className="container mt-4">
        <h3 className="mb-3">Dashboard - Geladeira</h3>

        {/* ---------- CARDS ---------- */}
        <div className="row">
          <div className="col-md-3 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="text-muted">Temp. Máxima</h6>
                <h3>{temperaturaMax}°C</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="text-muted">Temp. Mínima</h6>
                <h3>{temperaturaMin}°C</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="text-muted">Anomalias</h6>
                <h3>{totalAnomalias}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="text-muted">Status</h6>
                <h5 className="text-success">{status}</h5>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- GRÁFICO DE LINHA ---------- */}
        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h5 className="mb-3">Temperatura nas Últimas Horas</h5>
            <Line data={tempData} />
          </div>
        </div>

        {/* ---------- GRÁFICO DE BARRAS ---------- */}
        <div className="card shadow-sm mt-4 mb-5">
          <div className="card-body">
            <h5 className="mb-3">Anomalias por Dia</h5>
            <Bar data={anomaliaData} />
          </div>
        </div>
      </div>
    </>
  );
}
