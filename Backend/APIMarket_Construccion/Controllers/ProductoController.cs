using BCMarket_Construccion;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Xml.Linq;

namespace APIMarket_Construccion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : Controller
    {
        [Route("InsertarProducto")]
        [HttpPost]
        public async Task<ActionResult<Resultado>> InsertarProducto([FromBody] Producto producto)
        {
            producto.Transaccion = "INSERTAR_PRODUCTO";

            if (!string.IsNullOrEmpty(producto.ImagenBase64))
            {
                producto.Imagen = Convert.FromBase64String(producto.ImagenBase64);
            }

            var cadenaConexion = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("ConnectionStrings")["Conexion"];

            XDocument xmlParam = API.Shared.DBXmlMethods.GetXml(producto);
            DataSet dsResultado = await API.Shared.DBXmlMethods.EjecutaBase("SetProducto", cadenaConexion, producto.Transaccion, xmlParam.ToString());

            List<Resultado> listResultados = new();

            if (dsResultado.Tables.Count > 0)
            {
                foreach (DataRow row in dsResultado.Tables[0].Rows)
                {
                    listResultados.Add(new Resultado
                    {
                        Respuesta = row["Respuesta"].ToString(),
                        Leyenda = row["Leyenda"].ToString()
                    });
                }
            }

            return Ok(listResultados);
        }

        [Route("ActualizarProducto")]
        [HttpPut]
        public async Task<ActionResult<Resultado>> ActualizarProducto([FromBody] Producto producto)
        {
            producto.Transaccion = "ACTUALIZAR_PRODUCTO";

            if (!string.IsNullOrEmpty(producto.ImagenBase64))
            {
                producto.Imagen = Convert.FromBase64String(producto.ImagenBase64);
            }

            var cadenaConexion = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("ConnectionStrings")["Conexion"];
            XDocument xmlParam = API.Shared.DBXmlMethods.GetXml(producto);
            DataSet dsResultado = await API.Shared.DBXmlMethods.EjecutaBase("SetProducto", cadenaConexion, producto.Transaccion, xmlParam.ToString());

            List<Resultado> listResultados = new();

            if (dsResultado.Tables.Count > 0)
            {
                foreach (DataRow row in dsResultado.Tables[0].Rows)
                {
                    listResultados.Add(new Resultado
                    {
                        Respuesta = row["Respuesta"].ToString(),
                        Leyenda = row["Leyenda"].ToString()
                    });
                }
            }

            return Ok(listResultados);
        }

        [Route("EliminarProducto")]
        [HttpDelete]
        public async Task<ActionResult<Resultado>> EliminarProducto([FromQuery] int idProducto)
        {
            Producto producto = new Producto
            {
                Id_Producto = idProducto,
                Transaccion = "ELIMINAR_PRODUCTO"
            };

            var cadenaConexion = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json").Build()
                .GetSection("ConnectionStrings")["Conexion"];

            XDocument xmlParam = API.Shared.DBXmlMethods.GetXml(producto);
            DataSet dsResultado = await API.Shared.DBXmlMethods.EjecutaBase("SetProducto", cadenaConexion, producto.Transaccion, xmlParam.ToString());

            List<Resultado> listResultados = new();

            if (dsResultado.Tables.Count > 0)
            {
                foreach (DataRow row in dsResultado.Tables[0].Rows)
                {
                    listResultados.Add(new Resultado
                    {
                        Respuesta = row["Respuesta"].ToString(),
                        Leyenda = row["Leyenda"].ToString()
                    });
                }
            }

            return Ok(listResultados);
        }

        [Route("ObtenerTodosLosProductos")]
        [HttpGet]
        public async Task<ActionResult<List<Producto>>> ObtenerTodosLosProductos()
        {
            Producto producto = new Producto { Transaccion = "CONSULTAR_TODOS_PRODUCTOS" };

            var cadenaConexion = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json").Build()
                .GetSection("ConnectionStrings")["Conexion"];

            XDocument xmlParam = API.Shared.DBXmlMethods.GetXml(producto);
            DataSet dsResultado = await API.Shared.DBXmlMethods.EjecutaBase("getProducto", cadenaConexion, producto.Transaccion, xmlParam.ToString());

            List<Producto> lista = new();

            if (dsResultado.Tables.Count > 0)
            {

                foreach (DataRow row in dsResultado.Tables[0].Rows)
                {
                    lista.Add(new Producto
                    {
                        Id_Producto = Convert.ToInt32(row["ID_PRODUCTO"]),
                        NombreProducto = row["NOMBRE_PRODUCTO"]?.ToString(),
                        PrecioVenta = Convert.ToDecimal(row["PRECIO_VENTA"]),
                        Descripcion = row["DESCRIPCION"]?.ToString(),
                        Stock = Convert.ToInt32(row["STOCK"]),
                        Imagen = row["IMAGEN"] == DBNull.Value ? null : (byte[])row["IMAGEN"],
                        Estado = Convert.ToBoolean(row["ESTADO"]),
                        Transaccion = ""
                    });
                }

                return Ok(lista);
            }

            return NotFound("No se encontraron productos.");
        }

        [Route("ObtenerProductoPorNombre")]
        [HttpGet]
        public async Task<ActionResult<List<Producto>>> ObtenerProductoPorNombre(string nombreProducto)
        {
            Producto producto = new Producto
            {
                NombreProducto = nombreProducto,
                Transaccion = "CONSULTAR_POR_NOMBRE"
            };

            var cadenaConexion = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json").Build()
                .GetSection("ConnectionStrings")["Conexion"];

            XDocument xmlParam = API.Shared.DBXmlMethods.GetXml(producto);
            DataSet dsResultado = await API.Shared.DBXmlMethods.EjecutaBase("getProducto", cadenaConexion, producto.Transaccion, xmlParam.ToString());

            List<Producto> lista = new();

            if (dsResultado.Tables.Count > 0)
            {
                foreach (DataRow row in dsResultado.Tables[0].Rows)
                {
                    lista.Add(new Producto
                    {
                        Id_Producto = Convert.ToInt32(row["ID_PRODUCTO"]),
                        NombreProducto = row["NOMBRE_PRODUCTO"]?.ToString(),
                        PrecioVenta = Convert.ToDecimal(row["PRECIO_VENTA"]),
                        Descripcion = row["DESCRIPCION"]?.ToString(),
                        Stock = Convert.ToInt32(row["STOCK"]),
                        Imagen = row["IMAGEN"] == DBNull.Value ? null : (byte[])row["IMAGEN"],
                        Estado = Convert.ToBoolean(row["ESTADO"]),
                        Transaccion = ""
                    });
                }

                return Ok(lista);
            }

            return NotFound("No se encontraron productos con ese nombre.");
        }
    }

}
