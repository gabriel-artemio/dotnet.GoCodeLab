using gocodelab.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;

namespace gocodelab.DAL
{
    public class VacinaDAL
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["conexao"].ConnectionString;

        public Vacina ObterPorId(int id)
        {
            return ListarTodosRegistros(id, string.Empty).FirstOrDefault();
        }
        public List<Vacina> ListarTudo()
        {
            return ListarTodosRegistros(0, string.Empty);
        }
        public List<Vacina> BuscarPorNome(string nome)
        {
            return ListarTodosRegistros(0, nome);
        }
        public List<Vacina> ListarTodosRegistros(int id, string nome)
        {
            string sql = "";
            List<Vacina> lista = new List<Vacina>();

            using (MySqlConnection con = new MySqlConnection(connectionString))
            {
                sql = "SELECT cd_vacina, nm_vacina, fabricante, doses_recomendadas, intervalo_dias, lote FROM vacina";

                if (id > 0)
                {
                    sql += " WHERE cd_vacina = @id ";
                }

                if (!String.IsNullOrEmpty(nome))
                {
                    sql += " WHERE nm_vacina LIKE @nome ";
                }

                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@nome", "%" + nome + "%");

                con.Open();
                MySqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    lista.Add(new Vacina
                    {
                        cd_vacina = Convert.ToInt32(dr["cd_vacina"]),
                        nm_vacina = dr["nm_vacina"].ToString(),
                        fabricante = dr["fabricante"].ToString(),
                        doses_recomendadas = Convert.ToInt32(dr["doses_recomendadas"].ToString()),
                        intervalo_dias = Convert.ToInt32(dr["intervalo_dias"].ToString()),
                        lote = dr["lote"].ToString()
                    });
                }
            }

            return lista;
        }
        public void Inserir(Vacina vacina)
        {
            using (MySqlConnection con = new MySqlConnection(connectionString))
            {
                string sql = "INSERT INTO vacina (nm_vacina, fabricante, doses_recomendadas, intervalo_dias, lote) VALUES (@nm_vacina, @fabricante, @doses_recomendadas, @intervalo_dias, @lote)";
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.Parameters.AddWithValue("@nm_vacina", vacina.nm_vacina);
                cmd.Parameters.AddWithValue("@fabricante", vacina.fabricante);
                cmd.Parameters.AddWithValue("@doses_recomendadas", vacina.doses_recomendadas);
                cmd.Parameters.AddWithValue("@intervalo_dias", vacina.intervalo_dias);
                cmd.Parameters.AddWithValue("@lote", vacina.lote);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void Atualizar(Vacina vacina)
        {
            using (MySqlConnection con = new MySqlConnection(connectionString))
            {
                string sql = "UPDATE vacina SET nm_vacina=@nm_vacina, fabricante=@fabricante, doses_recomendadas=@doses_recomendadas, intervalo_dias=@intervalo_dias, lote=@lote WHERE cd_vacina=@cd_vacina";
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.Parameters.AddWithValue("@nm_vacina", vacina.nm_vacina);
                cmd.Parameters.AddWithValue("@fabricante", vacina.fabricante);
                cmd.Parameters.AddWithValue("@doses_recomendadas", vacina.doses_recomendadas);
                cmd.Parameters.AddWithValue("@intervalo_dias", vacina.intervalo_dias);
                cmd.Parameters.AddWithValue("@lote", vacina.lote);
                cmd.Parameters.AddWithValue("@cd_vacina", vacina.cd_vacina);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void Excluir(int id)
        {
            using (MySqlConnection con = new MySqlConnection(connectionString))
            {
                string sql = "DELETE FROM vacina WHERE cd_vacina=@cd_vacina";
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.Parameters.AddWithValue("@cd_vacina", id);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }
    }
}