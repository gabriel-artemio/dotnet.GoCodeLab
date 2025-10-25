using System;

namespace gocodelab.Models
{
    public class Aplicacao
    {
        public int cd_aplicacao { get; set; }
        public DateTime data_aplicacao { get; set; }
        public int dose_numero { get; set; }
        public string nm_unidade { get; set; }
        public string nm_vacina { get; set; }
        public string nm_paciente { get; set; }
        public string nm_profissional { get; set; }
    }
}