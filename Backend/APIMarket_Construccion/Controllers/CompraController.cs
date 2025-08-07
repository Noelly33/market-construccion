using BCMarket_Construccion;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Xml.Linq;

namespace APIMarket_Construccion.Controllers
{
    public class CompraController : Controller
    {

        [Route("InsertarCompra")]
        [HttpPost]
        public async Task<ActionResult<Resultado>> InsertarCompra([FromBody] Compra compra)
        {
            var cadenaConexion = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("ConnectionStrings")["Conexion"];
            XDocument xmlParam = new XDocument(new XElement("Compra", new XElement("Total", compra.Total), new XElement("MetodoEntrega", compra.Metodo_Entrega), new XElement("IdTransportista", compra.Id_Transportista ?? 0),
                    new XElement("Detalle",
                        from d in compra.Detalles
                        select new XElement("Producto",
                            new XElement("IdProducto", d.Id_Producto),
                            new XElement("PrecioCompra", d.Precio_Compra),
                            new XElement("Cantidad", d.Cantidad),
                            new XElement("Subtotal", d.Subtotal)
                        )
                    ),

                    new XElement("Pago",
                        new XElement("NombreTitular", compra.Pago?.Nombre_Titular),
                        new XElement("NumeroTarjeta", compra.Pago?.Numero_Tarjeta),
                        new XElement("FechaExpiracion", compra.Pago?.Fecha_Expiracion),
                        new XElement("CVV", compra.Pago?.CVV)
                    )
                )
            );

            DataSet dsResultado = await API.Shared.DBXmlMethods.EjecutaBase("SetCompra", cadenaConexion, compra.Transaccion, xmlParam.ToString());
            List<Resultado> listResultados = new List<Resultado>();
            if (dsResultado.Tables.Count > 0)
            {
                try
                {
                    foreach (DataRow row in dsResultado.Tables[0].Rows)
                    {
                        Resultado objResponse = new Resultado
                        {
                            Respuesta = row["respuesta"].ToString(),
                            Leyenda = row["leyenda"].ToString()
                        };
                        listResultados.Add(objResponse);
                    }
                }
                catch (IOException ex)
                {
                    Console.WriteLine(ex.ToString());
                }
            }

            return Ok(listResultados);
        }

    }
}
    
