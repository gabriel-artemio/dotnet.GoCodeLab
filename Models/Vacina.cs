namespace gocodelab.Models
{
    public class Vacina
    {
        public int cd_vacina { get; set; }
        public string nm_vacina { get; set; }
        public string fabricante { get; set; }
        public int doses_recomendadas { get; set; }
        public int intervalo_dias { get; set; }
        public string lote { get; set; }
    }
}