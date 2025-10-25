using gocodelab.BLL;
using gocodelab.Models;
using System;
using System.Linq;
using System.Web.Mvc;

namespace gocodelab.Controllers
{
    public class VacinaController : Controller
    {
        private readonly VacinaBLL bll = new VacinaBLL();
        public ActionResult Index(string busca, int pagina = 1, int tamanhoPagina = 5)
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
        public ActionResult Detalhes(int id)
        {
            var paciente = bll.ObterPorId(id);
            return View(paciente);
        }
        public ActionResult Criar()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Criar(Vacina vacina)
        {
            if (ModelState.IsValid)
            {
                bll.Inserir(vacina);
                return RedirectToAction("Index");
            }
            return View(vacina);
        }

        public ActionResult Editar(int id)
        {
            var cliente = bll.ObterPorId(id);
            return View(cliente);
        }

        [HttpPost]
        public ActionResult Editar(Vacina vacina)
        {
            if (ModelState.IsValid)
            {
                bll.Atualizar(vacina);
                return RedirectToAction("Index");
            }
            return View(vacina);
        }

        public ActionResult Excluir(int id)
        {
            var cliente = bll.ObterPorId(id);
            return View(cliente);
        }

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            bll.Excluir(id);
            return RedirectToAction("Index");
        }
    }
}