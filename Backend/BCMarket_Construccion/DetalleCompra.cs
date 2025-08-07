using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BCMarket_Construccion
{
    public class DetalleCompra
    {
        public int? Id_Detalle_Compra { get; set; }
        public int? Id_Compra { get; set; }
        public int? Id_Producto { get; set; }
        public decimal? Precio_Compra { get; set; }
        public int? Cantidad { get; set; }
        public decimal? Subtotal { get; set; }
        public string? Transaccion { get; set; }

    }
}
