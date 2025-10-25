using gocodelab.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace gocodelab.DAL
{
    public class ProfissionalDAL
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["conexao"].ConnectionString;

        public Profissional ObterPorId(int id)
        {
            return ListarTodosRegistros(id, string.Empty).FirstOrDefault();
        }
        public List<Profissional> ListarTudo()
        {
            return ListarTodosRegistros(0, string.Empty);
        }
        public List<Profissional> BuscarPorNome(string nome)
        {
            return ListarTodosRegistros(0, nome);
        }
        public List<Profissional> ListarTodosRegistros(int id, string nome)
        {
            string sql = "";
            List<Profissional> lista = new List<Profissional>();

            using (MySqlConnection con = new MySqlConnection(connectionString))
            {
                sql = "SELECT cd_profissional, nm_profissional, registro, cargo FROM profissional";

                if (id > 0)
                {
                    sql += " WHERE cd_profissional = @id ";
                }

                if (!String.IsNullOrEmpty(nome))
                {
                    sql += " WHERE nm_profissional LIKE @nome ";
                }

                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@nome", "%" + nome + "%");

                con.Open();
                MySqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    lista.Add(new Profissional
                    {
                        cd_profissional = Convert.ToInt32(dr["cd_profissional"]),
                        nm_profissional = dr["nm_profissional"].ToString(),
                        registro = dr["registro"].ToString(),
                        cargo = dr["cargo"].ToString()
                    });
                }
            }

            return lista;
        }
        public void Inserir(Profissional profissional)
        {
            using (MySqlConnection con = new MySqlConnection(connectionString))
            {
                string sql = "INSERT INTO profissional (nm_profissional, registro, cargo) VALUES (@nm_profissional, @registro, @cargo)";
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.Parameters.AddWithValue("@nm_profissional", profissional.nm_profissional);
                cmd.Parameters.AddWithValue("@registro", profissional.registro);
                cmd.Parameters.AddWithValue("@cargo", profissional.cargo);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void Atualizar(Profissional profissional)
        {
            using (MySqlConnection con = new MySqlConnection(connectionString))
            {
                string sql = "UPDATE profissional SET nm_profissional=@nm_profissional, registro=@registro, cargo=@cargo WHERE cd_profissional=@cd_profissional";
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.Parameters.AddWithValue("@nm_profissional", profissional.nm_profissional);
                cmd.Parameters.AddWithValue("@registro", profissional.registro);
                cmd.Parameters.AddWithValue("@cargo", profissional.cargo);
                cmd.Parameters.AddWithValue("@cd_profissional", profissional.cd_profissional);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void Excluir(int id)
        {
            using (MySqlConnection con = new MySqlConnection(connectionString))
            {
                string sql = "DELETE FROM profissional WHERE cd_profissional=@cd_profissional";
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.Parameters.AddWithValue("@cd_profissional", id);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }
    }
}