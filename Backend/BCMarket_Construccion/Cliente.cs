using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BCMarket_Construccion
{
    public class Cliente
    {
        public int? Id_Cliente { get; set; }
        public int? Id_Rol {  get; set; }
        public string? NombreCompleto { get; set; }
        public string? Direccion { get; set; }
        public string? Telefono { get; set; }
        public bool? Estado { get; set; }
        public string? Transaccion { get; set; }

    }
}
