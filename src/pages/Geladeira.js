import { useEffect, useState } from "react";
import NavbarTop from "../components/NavbarTop";
import { apiInteligenciaArtificial } from "../api";
import Plot from "react-plotly.js";

export default function Geladeira() {
  const [temperaturaMax, setTemperaturaMax] = useState(null);
  const [temperaturaMin, setTemperaturaMin] = useState(null);
  const [totalAnomalias, setTotalAnomalia] = useState(null);

  const [graficoAbertura, setGraficoAbertura] = useState(null);
  const [graficoEfeito, setGraficoEfeito] = useState(null);
  const [graficoCalor, setGraficoCalor] = useState(null);
  const [graficoOperacoes, setGraficoOperacoes] = useState(null);

  const [alertasRaw, setAlertasRaw] = useState([]);
  const [alertasFiltrados, setAlertasFiltrados] = useState([]);

  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 10;

  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const [filtroAnomalia, setFiltroAnomalia] = useState("Todas");

  const listaAnomalias = [
    "Todas",
    "Resfriamento lento",
    "Porta aberta fora do horário",
    "Mudança brusca de temperatura",
    "Porta aberta muito tempo",
    "Diferença entre sensores",
    "Temperatura fora da faixa",
    "Estabilização lenta",
  ];

  const [status, setStatus] = useState("Operando normalmente");

  const fetchData = async (endpoint) => {
    const res = await apiInteligenciaArtificial.get(endpoint);
    return res.data;
  };

  useEffect(() => {
    const loadInicial = async () => {
      const abertura = await fetchData("/grafico/aberturas");
      setGraficoAbertura(abertura);

      const efeito = await fetchData("/grafico/efeito");
      setGraficoEfeito(efeito);

      const calor = await fetchData("/grafico/calor");
      setGraficoCalor(calor);

      const alertas = await fetchData("/alertas");

      const ordenados = [...alertas].sort(
        (a, b) =>
          new Date(b.timestamp.replace(" ", "T")) -
          new Date(a.timestamp.replace(" ", "T"))
      );

      setAlertasRaw(ordenados);
      aplicarFiltros(ordenados);

      const tempMax = Math.max(
        ...alertas.map((item) => Math.max(item.temp1, item.temp2))
      );
      const tempMin = Math.min(
        ...alertas.map((item) => Math.min(item.temp1, item.temp2))
      );
      const anomalias = alertas.reduce(
        (acc, atual) => acc + atual.anomalias.length,
        0
      );

      setTemperaturaMax(tempMax);
      setTemperaturaMin(tempMin);
      setTotalAnomalia(anomalias);

      const operacoes = await fetchData("/grafico/operacoes");
      setGraficoOperacoes(operacoes.data);
    };

    loadInicial();

    const interval = setInterval(async () => {
      const abertura = await fetchData("/grafico/aberturas");
      setGraficoAbertura(abertura);

      const efeito = await fetchData("/grafico/efeito");
      setGraficoEfeito(efeito);

      const calor = await fetchData("/grafico/calor");
      setGraficoCalor(calor);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    aplicarFiltros(alertasRaw);
  }, [dataInicio, dataFim, filtroAnomalia]);

  const aplicarFiltros = (lista) => {
    let filtrado = [...lista];

    if (filtroAnomalia !== "Todas") {
      filtrado = filtrado.filter((item) =>
        item.anomalias.includes(filtroAnomalia)
      );
    }

    if (dataInicio) {
      filtrado = filtrado.filter(
        (item) =>
          new Date(item.timestamp.replace(" ", "T")) >= new Date(dataInicio)
      );
    }

    if (dataFim) {
      filtrado = filtrado.filter(
        (item) =>
          new Date(item.timestamp.replace(" ", "T")) <=
          new Date(`${dataFim}T23:59:59`)
      );
    }

    setAlertasFiltrados(filtrado);
    setPagina(1);
  };

  const inicio = (pagina - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;

  const alertasPaginados = alertasFiltrados.slice(inicio, fim);

  const totalPaginas = Math.ceil(alertasFiltrados.length / itensPorPagina);

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

        {/* GRAFICOS */}
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

        <div className="card shadow-sm mt-4 mb-5">
          <div className="card-body">
            {graficoOperacoes && (
              <>
                <h5 className="mb-3">Gráfico de Operações</h5>
                <div className="w-100 bg-dark h-100">
                  <Plot
                    data={graficoOperacoes}
                    className="w-100"
                    layout={{
                      title: "Temperatura (°C)",
                      xaxis: { title: "Hora" },
                      yaxis: { title: "°C" },
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="card shadow-sm mt-5 mb-5">
          <div className="card-body">
            <h4 className="mb-3">Alertas</h4>

            <div className="row mb-4">
              <div className="col-md-3">
                <label className="form-label">Data inicial</label>
                <input
                  type="date"
                  className="form-control"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Data final</label>
                <input
                  type="date"
                  className="form-control"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Tipo de anomalia</label>
                <select
                  className="form-select"
                  value={filtroAnomalia}
                  onChange={(e) => setFiltroAnomalia(e.target.value)}
                >
                  {listaAnomalias.map((an) => (
                    <option key={an}>{an}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Data/Hora</th>
                    <th>Temp1</th>
                    <th>Temp2</th>
                    <th>Porta</th>
                    <th>Anomalias</th>
                  </tr>
                </thead>
                <tbody>
                  {alertasPaginados.map((a, idx) => (
                    <tr key={idx}>
                      <td>{a.timestamp}</td>
                      <td>{a.temp1}°C</td>
                      <td>{a.temp2}°C</td>
                      <td>{a.porta}</td>
                      <td>
                        {a.anomalias.map((x, i) => (
                          <span key={i} className="badge bg-danger me-1">
                            {x}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}

                  {alertasFiltrados.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        Nenhum alerta encontrado nos filtros selecionados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <nav className="mt-3">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${pagina === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => setPagina(pagina - 1)}
                    >
                      Anterior
                    </button>
                  </li>

                  <li
                    className={`page-item ${
                      pagina === totalPaginas ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setPagina(pagina + 1)}
                    >
                      Próxima
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
