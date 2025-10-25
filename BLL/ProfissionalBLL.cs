using gocodelab.DAL;
using gocodelab.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace gocodelab.BLL
{
    public class ProfissionalBLL
    {
        ProfissionalDAL dal = new ProfissionalDAL();
        public List<Profissional> Listar() => dal.ListarTudo();
        public List<Profissional> BuscarPorNome(string nome) => dal.BuscarPorNome(nome);
        public Profissional ObterPorId(int id) => dal.ObterPorId(id);
        public void Inserir(Profissional profissional) => dal.Inserir(profissional);
        public void Atualizar(Profissional profissional) => dal.Atualizar(profissional);
        public void Excluir(int id) => dal.Excluir(id);
    }
}