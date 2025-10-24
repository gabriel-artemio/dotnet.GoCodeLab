using gocodelab.DAL;
using gocodelab.Models;
using System;
using System.Collections.Generic;

namespace gocodelab.BLL
{
    public class PacienteBLL
    {
        PacienteDAL dal = new PacienteDAL();

        public List<Paciente> Listar() => dal.ListarTudo();
        public List<Paciente> BuscarPorNome(string nome) => dal.BuscarPorNome(nome);
        public Paciente ObterPorId(int id) => dal.ObterPorId(id);
        public void Inserir(Paciente paciente) => dal.Inserir(paciente);
        public void Atualizar(Paciente paciente) => dal.Atualizar(paciente);
        public void Excluir(int id) => dal.Excluir(id);
    }
}