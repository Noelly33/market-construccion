using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCMarket_Construccion
{
    public class Compra
    {
        public int? Id_Compra { get; set; }
        public DateTime? Fecha { get; set; }
        public decimal? Total { get; set; }
        public string? Metodo_Entrega { get; set; }
        public int? Id_Transportista { get; set; }
        public string? Estado { get; set; }
        public List<DetalleCompra>? Detalles { get; set; }
        public Pago? Pago { get; set; }
        public string? Transaccion { get; set; }


    }
}
