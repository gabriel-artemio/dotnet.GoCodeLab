using gocodelab.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using MySql.Data.MySqlClient;
using System.Linq;

namespace gocodelab.DAL
{
    public class PacienteDAL
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["conexao"].ConnectionString;

        public Paciente ObterPorId(int id)
        {
            return ListarTodosRegistros(id, string.Empty).FirstOrDefault();
        }
        public List<Paciente> ListarTudo()
        {
            return ListarTodosRegistros(0, string.Empty);
        }
        public List<Paciente> BuscarPorNome(string nome)
        {
            return ListarTodosRegistros(0, nome);
        }
        public List<Paciente> ListarTodosRegistros(int id, string nome)
        {
            string sql = "";
            List<Paciente> lista = new List<Paciente>();

            using (MySqlConnection con = new MySqlConnection(connectionString))
            {
                sql = "SELECT cd_paciente, nm_paciente, data_nascimento, sexo, cpf, endereco, telefone FROM paciente";

                if (id > 0)
                {
                    sql += " WHERE cd_paciente = @id ";
                }

                if (!String.IsNullOrEmpty(nome))
                {
                    sql += " WHERE nm_paciente LIKE @nome ";
                }

                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@nome", "%" + nome + "%");

                con.Open();
                MySqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    lista.Add(new Paciente
                    {
                        cd_paciente = Convert.ToInt32(dr["cd_paciente"]),
                        nm_paciente = dr["nm_paciente"].ToString(),
                        data_nascimento = Convert.ToDateTime(dr["data_nascimento"]),
                        sexo = dr["sexo"].ToString(),
                        cpf = dr["cpf"].ToString(),
                        endereco = dr["endereco"].ToString(),
                        telefone = dr["telefone"].ToString()
                    });
                }
            }

            return lista;
        }
        public void Inserir(Paciente paciente)
        {
            using (MySqlConnection con = new MySqlConnection(connectionString))
            {
                string sql = "INSERT INTO paciente (nm_paciente, cpf) VALUES (@nm_paciente, @cpf)";
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.Parameters.AddWithValue("@nm_paciente", paciente.nm_paciente);
                cmd.Parameters.AddWithValue("@cpf", paciente.cpf);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void Atualizar(Paciente paciente)
        {
            using (MySqlConnection con = new MySqlConnection(connectionString))
            {
                string sql = "UPDATE paciente SET nm_paciente=@nm_paciente, cpf=@cpf WHERE cd_paciente=@cd_paciente";
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.Parameters.AddWithValue("@nm_paciente", paciente.nm_paciente);
                cmd.Parameters.AddWithValue("@cpf", paciente.cpf);
                cmd.Parameters.AddWithValue("@cd_paciente", paciente.cd_paciente);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void Excluir(int id)
        {
            using (MySqlConnection con = new MySqlConnection(connectionString))
            {
                string sql = "DELETE FROM paciente WHERE cd_paciente=@cd_paciente";
                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.Parameters.AddWithValue("@cd_paciente", id);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }
    }
}