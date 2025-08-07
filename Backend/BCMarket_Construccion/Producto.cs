using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCMarket_Construccion
{
    public class Producto
    {
        public int? Id_Producto { get; set; }
        public string? NombreProducto { get; set; }
        public decimal? PrecioVenta { get; set; }
        public string? Descripcion { get; set; }
        public int? Stock { get; set; }
        public byte[]? Imagen { get; set; }
        public string? ImagenBase64 { get; set; }
        public bool? Estado { get; set; }
        public string? Transaccion { get; set; }

    }
}
