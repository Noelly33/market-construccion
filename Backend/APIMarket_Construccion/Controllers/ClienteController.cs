using Microsoft.AspNetCore.Http;
using BCMarket_Construccion; 
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;
using System.Data;
using API.Shared;
using APIMarket_Construccion.Shared;
using Microsoft.AspNetCore.Authorization;
using APIMarket_Construccion.DTOs;

namespace APIMarket_Construccion.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
   
    public class ClienteController : Controller
    {
        [Route("InsertarCliente")]
        [HttpPost]
        public async Task<ActionResult<Resultado>> InsertarCliente([FromBody] ClienteCuentaDTO dto)
        {
            var cadenaConexion = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build()
                .GetSection("ConnectionStrings")["Conexion"];

            var cliente = new Cliente
            {
                NombreCompleto = dto.NombreCompleto,
                Direccion = dto.Direccion,
                Telefono = dto.Telefono,
                Estado = dto.Estado,
                Transaccion = "INSERTAR_CLIENTE"
            };

            var cuenta = new Cuenta
            {
                Username = dto.Username,
                Clave = BCrypt.Net.BCrypt.HashPassword(dto.Clave) 
            };

            // Agregar manualmente los datos a XML si usas GetXml personalizado
            XDocument xmlParam = new XDocument(
                new XElement("Cliente",
                    new XElement("NombreCompleto", cliente.NombreCompleto),
                    new XElement("Direccion", cliente.Direccion),
                    new XElement("Telefono", cliente.Telefono),
                    new XElement("Estado", cliente.Estado),
                    new XElement("Username", cuenta.Username),
                    new XElement("Clave", cuenta.Clave)
                )
            );

            DataSet dsResultado = await API.Shared.DBXmlMethods.EjecutaBase("setCliente", cadenaConexion, cliente.Transaccion, xmlParam.ToString());

            // Procesar resultado
            List<Resultado> listResultados = new List<Resultado>();
            if (dsResultado.Tables.Count > 0)
            {
                foreach (DataRow row in dsResultado.Tables[0].Rows)
                {
                    listResultados.Add(new Resultado
                    {
                        Respuesta = row["respuesta"].ToString(),
                        Leyenda = row["leyenda"].ToString()
                    });
                }
            }

            return Ok(listResultados);
        }


        [Route("ObtenerTodosLosClientes")]
         [HttpGet]
             public async Task<ActionResult<List<Cliente>>> ObtenerTodosLosClientes()
             {
                 Cliente cliente = new Cliente { Transaccion = "CONSULTAR_TODOS_CLIENTES" };

                 var cadenaConexion = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("ConnectionStrings")["Conexion"];
                 XDocument xmlParam = API.Shared.DBXmlMethods.GetXml(cliente);
                 DataSet dsResultado = await API.Shared.DBXmlMethods.EjecutaBase("getCliente", cadenaConexion, cliente.Transaccion, xmlParam.ToString());

                 List<Cliente> lista = new();

                 if (dsResultado.Tables.Count > 0)
                 {
                     foreach (DataRow row in dsResultado.Tables[0].Rows)
                     {
                         lista.Add(new Cliente
                         {
                             Id_Cliente = Convert.ToInt32(row["ID_CLIENTE"]),
                             Id_Rol = Convert.ToInt32(row["ID_ROL"]),
                             NombreCompleto = row["NOMBRE_COMPLETO"]?.ToString(),
                             Direccion = row["DIRECCION"]?.ToString(),
                             Telefono = row["TELEFONO"]?.ToString(),
                             Estado = Convert.ToBoolean(row["ESTADO"]),
                             Transaccion = ""
                         });
                     }

                     return Ok(lista);
                 }

                 return NotFound("No se encontraron clientes.");
             }

        [Route("[action]")]
        [HttpPost]
        public async Task<ActionResult<List<Cliente>>> GetCliente([FromBody] Cliente cliente)
        {
            var cadenaConexion = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("ConnectionStrings")["Conexion"];
            XDocument xmlParam = API.Shared.DBXmlMethods.GetXml(cliente);
            DataSet dsResultado = await API.Shared.DBXmlMethods.EjecutaBase(APIMarket_Construccion.Shared.NameStoreProcedure.SP_GetName1, cadenaConexion, cliente.Transaccion, xmlParam.ToString());

            List<Cliente> listCliente = new List<Cliente>();

            if (dsResultado.Tables.Count > 0)
            {
                try
                {
                    foreach (DataRow row in dsResultado.Tables[0].Rows)
                    {
                        Cliente objResponse = new Cliente
                        {
                            Id_Cliente = Convert.ToInt32(row["ID_CLIENTE"]),
                            Id_Rol = Convert.ToInt32(row["ID_ROL"]),
                            NombreCompleto = row["NOMBRE_COMPLETO"]?.ToString(),
                            Direccion = row["DIRECCION"]?.ToString(),
                            Telefono = row["TELEFONO"]?.ToString(),
                            Estado = Convert.ToBoolean(row["ESTADO"]),

                        };
                        listCliente.Add(objResponse);
                    }

                }
                catch (Exception ex)
                {
                    Console.Write(ex.ToString());
                }

                return Ok(listCliente);
            }

            return NotFound("No se encontraron clientes.");
        }

        [Route("ActualizarCliente")]
        [HttpPut]
        public async Task<ActionResult<Resultado>> ActualizarCliente([FromBody] Cliente cliente)
        {
            cliente.Transaccion = "ACTUALIZAR_CLIENTE";

            var cadenaConexion = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("ConnectionStrings")["Conexion"];
            XDocument xmlParam = API.Shared.DBXmlMethods.GetXml(cliente);
            DataSet dsResultado = await API.Shared.DBXmlMethods.EjecutaBase("setCliente", cadenaConexion, cliente.Transaccion, xmlParam.ToString());

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

    }
}


