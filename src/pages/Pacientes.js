import { useEffect, useState } from "react";
import apiUsuario from "../api";
import NavbarTop from "../components/NavbarTop";

export default function Pacientes() {
  const [lista, setLista] = useState([]);
  const [search, setSearch] = useState("");
  const [pagina, setPagina] = useState(1);
  const [pacienteSel, setPacienteSel] = useState(null);

  const pageSize = 10;

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const r = await apiUsuario.get("/Usuario");
    setLista(r.data);
  }

  // filtro instantâneo
  const filtrados = lista.filter(
    (p) =>
      p.nm_usuario.toLowerCase().includes(search.toLowerCase()) ||
      p.cpf.toLowerCase().includes(search.toLowerCase())
  );

  // paginação
  const start = (pagina - 1) * pageSize;
  const paginados = filtrados.slice(start, start + pageSize);
  const totalPaginas = Math.ceil(filtrados.length / pageSize);

  // abre modal e carrega detalhes do backend
  async function abrirModal(id) {
    //const r = await api.get(`/Usuario/${id}`); // detalhe do paciente
    //setPacienteSel(r.data);

    const modal = new window.bootstrap.Modal(
      document.getElementById("modalDetalhes")
    );
    modal.show();
  }

  return (
    <>
      <NavbarTop />
      <div className="container mt-3">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar paciente"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Cód</th>
              <th>Nome Completo</th>
              <th>Data Nasc.</th>
              <th>CPF</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Gabriel Henrique</td>
              <td>27-08-1999</td>
              <td>111.222.333-44</td>
              <td>
                <button
                  onClick={() => abrirModal(1)}
                  className="btn btn-warning btn-sm"
                >
                  Detalhes
                </button>
              </td>
            </tr>
          </tbody>
          {/* <tbody>
            {paginados.map(p => (
              <tr key={p.cd_usuario}>
                <td>{p.cd_usuario}</td>
                <td>{p.nm_usuario}</td>
                <td>{p.dt_nasc}</td>
                <td>{p.cpf}</td>
                <td>
                  <button onClick={()=>abrirModal(p.cd_usuario)} className="btn btn-warning btn-sm">
                    Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>

        <div className="d-flex gap-2">
          <button
            className="btn btn-secondary btn-sm"
            disabled={pagina <= 1}
            onClick={() => setPagina((p) => p - 1)}
          >
            Anterior
          </button>

          <span className="align-self-center">
            Página {pagina} de {totalPaginas}
          </span>

          <button
            className="btn btn-secondary btn-sm"
            disabled={pagina >= totalPaginas}
            onClick={() => setPagina((p) => p + 1)}
          >
            Próxima
          </button>
        </div>
      </div>

      {/* MODAL */}
      <div className="modal fade" id="modalDetalhes" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Detalhes do paciente</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <p>
                <b>ID:</b>1
              </p>
              <p>
                <b>Nome:</b> Gabriel Henrique
              </p>
              <p>
                <b>Nascimento:</b> 27/08/1999
              </p>
              <p>
                <b>CPF:</b> 111.222.333-44
              </p>
              <p>
                <b>Endereço:</b> (11) 91234-56789
              </p>
              <p>
                <b>Telefone:</b> 241528213680001
              </p>

              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Accordion Item #1
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <strong>This is the first item’s accordion body.</strong>{" "}
                      It is shown by default, until the collapse plugin adds the
                      appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It’s also worth noting that just about any HTML
                      can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Accordion Item #2
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <strong>This is the second item’s accordion body.</strong>{" "}
                      It is hidden by default, until the collapse plugin adds
                      the appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It’s also worth noting that just about any HTML
                      can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Accordion Item #3
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <strong>This is the third item’s accordion body.</strong>{" "}
                      It is hidden by default, until the collapse plugin adds
                      the appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It’s also worth noting that just about any HTML
                      can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
                    </div>
                  </div>
                </div>
              </div>
              {/* {!pacienteSel && <p>Carregando...</p>}

              {pacienteSel && (
                <>
                  <p><b>ID:</b> {pacienteSel.cd_usuario}</p>
                  <p><b>Nome:</b> {pacienteSel.nm_usuario}</p>
                  <p><b>Nascimento:</b> {pacienteSel.dt_nasc}</p>
                  <p><b>CPF:</b> {pacienteSel.cpf}</p>
                  <p><b>Endereço:</b> {pacienteSel.telefone}</p>
                  <p><b>Telefone:</b> {pacienteSel.cns}</p>
                </>
              )} */}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
