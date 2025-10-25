using gocodelab.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace gocodelab.DAL
{
    public class AplicacaoDAL
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["conexao"].ConnectionString;

        public Aplicacao ObterPorId(int id)
        {
            return ListarTodosRegistros(id, string.Empty).FirstOrDefault();
        }
        public List<Aplicacao> ListarTudo()
        {
            return ListarTodosRegistros(0, string.Empty);
        }
        public List<Aplicacao> BuscarPorNome(string nome)
        {
            return ListarTodosRegistros(0, nome);
        }
        public List<Aplicacao> ListarTodosRegistros(int id, string nome)
        {
            string sql = "";
            List<Aplicacao> lista = new List<Aplicacao>();

            using (MySqlConnection con = new MySqlConnection(connectionString))
            {
                sql = "SELECT a.cd_aplicacao, a.data_aplicacao, a.dose_numero, u.nm_unidade, v.nm_vacina, p.nm_paciente, p2.nm_profissional FROM aplicacao a " +
                    "INNER JOIN paciente p ON a.cd_paciente = p.cd_paciente " +
                    "INNER JOIN vacina v ON a.cd_vacina  = v.cd_vacina " +
                    "INNER JOIN profissional p2 ON a.cd_profissional = p2.cd_profissional " +
                    "INNER JOIN unidade u ON a.cd_unidade = u.cd_unidade ";

                if (id > 0)
                {
                    sql += " WHERE a.cd_aplicacao = @id ";
                }

                if (!String.IsNullOrEmpty(nome))
                {
                    sql += " WHERE v.nm_vacina LIKE @nome ";
                }

                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@nome", "%" + nome + "%");

                con.Open();
                MySqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    lista.Add(new Aplicacao
                    {
                        cd_aplicacao = Convert.ToInt32(dr["cd_aplicacao"]),
                        data_aplicacao = Convert.ToDateTime(dr["data_aplicacao"].ToString()),
                        dose_numero = Convert.ToInt32(dr["dose_numero"].ToString()),
                        nm_unidade = dr["nm_unidade"].ToString(),
                        nm_vacina = dr["nm_vacina"].ToString(),
                        nm_paciente = dr["nm_paciente"].ToString(),
                        nm_profissional = dr["nm_profissional"].ToString()
                    });
                }
            }

            return lista;
        }
        public void Inserir(Aplicacao aplicacao)
        {
            using (MySqlConnection con = new MySqlConnection(connectionString))
            {
                string sql = "INSERT INTO aplicacao (data_aplicacao, dose_numero, nm_unidade, nm_vacina, nm_paciente, nm_profissional) VALUES (@data_aplicacao, @dose_numero, @nm_unidade, @nm_vacina, @nm_paciente, @nm_profissional)";
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.Parameters.AddWithValue("@data_aplicacao", aplicacao.data_aplicacao);
                cmd.Parameters.AddWithValue("@dose_numero", aplicacao.dose_numero);
                cmd.Parameters.AddWithValue("@nm_unidade", aplicacao.nm_unidade);
                cmd.Parameters.AddWithValue("@nm_vacina", aplicacao.nm_vacina);
                cmd.Parameters.AddWithValue("@nm_paciente", aplicacao.nm_paciente);
                cmd.Parameters.AddWithValue("@nm_profissional", aplicacao.nm_profissional);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void Atualizar(Aplicacao aplicacao)
        {
            using (MySqlConnection con = new MySqlConnection(connectionString))
            {
                string sql = "UPDATE aplicacao SET data_aplicacao=@data_aplicacao, dose_numero=@dose_numero, nm_unidade=@nm_unidade, nm_vacina=@nm_vacina, nm_paciente=@nm_paciente, nm_profissional=@nm_profissional WHERE cd_aplicacao=@cd_aplicacao";
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.Parameters.AddWithValue("@data_aplicacao", aplicacao.data_aplicacao);
                cmd.Parameters.AddWithValue("@dose_numero", aplicacao.dose_numero);
                cmd.Parameters.AddWithValue("@nm_unidade", aplicacao.nm_unidade);
                cmd.Parameters.AddWithValue("@nm_vacina", aplicacao.nm_vacina);
                cmd.Parameters.AddWithValue("@nm_paciente", aplicacao.nm_paciente);
                cmd.Parameters.AddWithValue("@nm_profissional", aplicacao.nm_profissional);
                cmd.Parameters.AddWithValue("@cd_aplicacao", aplicacao.cd_aplicacao);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void Excluir(int id)
        {
            using (MySqlConnection con = new MySqlConnection(connectionString))
            {
                string sql = "DELETE FROM aplicacao WHERE cd_aplicacao=@cd_aplicacao";
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.Parameters.AddWithValue("@cd_vacina", id);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }
    }
}