using gocodelab.DAL;
using gocodelab.Models;
using System.Collections.Generic;

namespace gocodelab.BLL
{
    public class AplicacaoBLL
    {
        AplicacaoDAL dal = new AplicacaoDAL();
        public List<Aplicacao> Listar() => dal.ListarTudo();
        public List<Aplicacao> BuscarPorNome(string nome) => dal.BuscarPorNome(nome);
        public Aplicacao ObterPorId(int id) => dal.ObterPorId(id);
        public void Inserir(Aplicacao aplicacao) => dal.Inserir(aplicacao);
        public void Atualizar(Aplicacao aplicacao) => dal.Atualizar(aplicacao);
        public void Excluir(int id) => dal.Excluir(id);
    }
}