using gocodelab.DAL;
using gocodelab.Models;
using System.Collections.Generic;

namespace gocodelab.BLL
{
    public class VacinaBLL
    {
        VacinaDAL dal = new VacinaDAL();
        public List<Vacina> Listar() => dal.ListarTudo();
        public List<Vacina> BuscarPorNome(string nome) => dal.BuscarPorNome(nome);
        public Vacina ObterPorId(int id) => dal.ObterPorId(id);
        public void Inserir(Vacina vacina) => dal.Inserir(vacina);
        public void Atualizar(Vacina vacina) => dal.Atualizar(vacina);
        public void Excluir(int id) => dal.Excluir(id);
    }
}