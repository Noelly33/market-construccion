using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCMarket_Construccion
{
    public class Cuenta
    {
        public int? ID { get; set; }
        public int? ID_Administrador { get; set; }
        public int? ID_Cliente { get; set; }
        public string? Username { get; set; }
        public string? Clave { get; set; }
        public string? Transaccion { get; set; }

    }
}
