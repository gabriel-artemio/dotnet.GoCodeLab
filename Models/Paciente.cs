using System;

namespace gocodelab.Models
{
    public class Paciente
    {
        public int cd_paciente { get; set; }
        public string nm_paciente { get; set; }
        public DateTime data_nascimento { get; set; }
        public string sexo { get; set; }
        public string cpf { get; set; }
        public string endereco { get; set; }
        public string telefone { get; set; }
    }
}