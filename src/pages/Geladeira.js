import { useEffect, useState } from "react";
import NavbarTop from "../components/NavbarTop";
import { apiInteligenciaArtificial } from "../api";

export default function Geladeira() {
  const [temperaturaMax, setTemperaturaMax] = useState(null);
  const [temperaturaMin, setTemperaturaMin] = useState(null);
  const totalAnomalias = 4;

  const [graficoAbertura, setGraficoAbertura] = useState(null);
  const [graficoEfeito, setGraficoEfeito] = useState(null);
  const [graficoCalor, setGraficoCalor] = useState(null);

  const [status, setStatus] = useState("Operando normalmente");

  const fetchData = async (endpoint) => {
    const res = await apiInteligenciaArtificial.get(endpoint);
    return res.data;
  };

  useEffect(() => {
    const load = async () => {
      const abertura = await fetchData("/grafico/aberturas");
      setGraficoAbertura(abertura);

      const efeito = await fetchData("/grafico/efeito");
      setGraficoEfeito(efeito);

      const calor = await fetchData("/grafico/calor");
      setGraficoCalor(calor);

      console.log(abertura, efeito, calor);

      const alertas = await fetchData("/alertas");
      const tempMax = Math.max(
        ...alertas.map((item) => Math.max(item.temp1, item.temp2))
      );
      const tempMin = Math.min(
        ...alertas.map((item) => Math.min(item.temp1, item.temp2))
      );
      setTemperaturaMax(tempMax);
      setTemperaturaMin(tempMin);
    };

    load();
  }, []);

  return (
    <>
      <NavbarTop />

      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mb-3">Dashboard - Geladeira</h3>
        </div>

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

        <div className="card shadow-sm mt-4">
          <div className="card-body">
            {graficoAbertura && (
              <>
                <h5 className="mb-3">{graficoAbertura.titulo}</h5>
                <div className="w-100">
                  <img
                    src={`data:image/png;base64,${graficoAbertura.imagem_base64}`}
                    alt="Gráfico 1"
                    className="w-100"
                    width={100}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="card shadow-sm mt-4">
          <div className="card-body">
            {graficoEfeito && (
              <>
                <h5 className="mb-3">{graficoEfeito.titulo}</h5>
                <div className="w-100">
                  <img
                    src={`data:image/png;base64,${graficoEfeito.imagem_base64}`}
                    alt="Gráfico 2"
                    className="w-100"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="card shadow-sm mt-4 mb-5">
          <div className="card-body">
            {graficoCalor && (
              <>
                <h5 className="mb-3">{graficoCalor.titulo}</h5>
                <div className="w-100">
                  <img
                    src={`data:image/png;base64,${graficoCalor.imagem_base64}`}
                    alt="Gráfico 3"
                    className="w-100"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
