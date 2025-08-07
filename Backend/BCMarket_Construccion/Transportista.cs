using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCMarket_Construccion
{
    public class Transportista
    {
        public int? Id_Transportista { get; set; }
        public string? Nombre_Completo { get; set; }
        public string? Cedula { get; set; }
        public string? Correo_Electronico { get; set; }
        public string? Empresa { get; set; }
        public string? Telefono { get; set; }
        public bool? Estado { get; set; }
        public string? Transaccion { get; set; }

    }
}
