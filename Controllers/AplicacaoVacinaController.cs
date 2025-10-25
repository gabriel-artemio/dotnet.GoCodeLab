using gocodelab.BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace gocodelab.Controllers
{
    public class AplicacaoVacinaController : Controller
    {
        private readonly AplicacaoBLL bll = new AplicacaoBLL();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult HistoricoVacinacao(string busca, int pagina = 1, int tamanhoPagina = 5)
        {
            // Obtenho a lista completa (com ou sem busca)
            var lista = string.IsNullOrEmpty(busca)
                ? bll.Listar()
                : bll.BuscarPorNome(busca);

            // Paginação
            int totalRegistros = lista.Count();
            int totalPaginas = (int)Math.Ceiling((double)totalRegistros / tamanhoPagina);

            var pacientesPaginados = lista
                .Skip((pagina - 1) * tamanhoPagina)
                .Take(tamanhoPagina)
                .ToList();

            // Enviar dados para a View
            ViewBag.Busca = busca;
            ViewBag.PaginaAtual = pagina;
            ViewBag.TotalPaginas = totalPaginas;

            return View(pacientesPaginados);
        }
    }
}