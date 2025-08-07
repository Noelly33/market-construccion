using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCMarket_Construccion
{
    public class Pago
    {
        public int? Id_Pago { get; set; }
        public int? Id_Compra { get; set; }
        public string? Nombre_Titular { get; set; }
        public string? Numero_Tarjeta { get; set; }
        public string? Fecha_Expiracion { get; set; }
        public string? CVV { get; set; }
        public string? Transaccion { get; set; }

    }
}
