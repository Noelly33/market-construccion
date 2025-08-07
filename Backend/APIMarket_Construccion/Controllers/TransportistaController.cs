using BCMarket_Construccion;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Xml.Linq;

namespace APIMarket_Construccion.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class TransportistaController : Controller
    {
        [Route("InsertarTransportista")]
        [HttpPost]
        public async Task<ActionResult<Resultado>> InsertarTransportista([FromBody] Transportista transportista)
        {

            var cadenaConexion = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("ConnectionStrings")["Conexion"];
            XDocument xmlParam = API.Shared.DBXmlMethods.GetXml(transportista);
            DataSet dsResultado = await API.Shared.DBXmlMethods.EjecutaBase("setTransportista", cadenaConexion, transportista.Transaccion, xmlParam.ToString());

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

                }
            }
            return Ok(listResultados);
        }


        [Route("ActualizarTransportista")]
        [HttpPut]
        public async Task<ActionResult<List<Resultado>>> ActualizarTransportista([FromBody] Transportista transportista)
        {
            transportista.Transaccion = "ACTUALIZAR_TRANSPORTISTA";

            var cadenaConexion = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("ConnectionStrings")["Conexion"];
            XDocument xmlParam = API.Shared.DBXmlMethods.GetXml(transportista);
            DataSet dsResultado = await API.Shared.DBXmlMethods.EjecutaBase("setTransportista", cadenaConexion, transportista.Transaccion, xmlParam.ToString());

            List<Resultado> resultados = new();

            if (dsResultado.Tables.Count > 0)
            {
                foreach (DataRow row in dsResultado.Tables[0].Rows)
                {
                    resultados.Add(new Resultado
                    {
                        Respuesta = row["Respuesta"].ToString(),
                        Leyenda = row["Leyenda"].ToString()
                    });
                }
            }

            return Ok(resultados);
        }

        [Route("ObtenerTodosLosTransportistas")]
        [HttpGet]
        public async Task<ActionResult<List<Transportista>>> ObtenerTodosLosTransportistas()
        {
            Transportista transportista = new()
            {
                Transaccion = "CONSULTAR_TODOS_TRANSPORTISTAS"
            };

            var cadenaConexion = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("ConnectionStrings")["Conexion"];
            XDocument xmlParam = API.Shared.DBXmlMethods.GetXml(transportista);
            DataSet dsResultado = await API.Shared.DBXmlMethods.EjecutaBase("getTransportista", cadenaConexion, transportista.Transaccion, xmlParam.ToString());

            List<Transportista> lista = new();

            if (dsResultado.Tables.Count > 0)
            {
                foreach (DataRow row in dsResultado.Tables[0].Rows)
                {
                    lista.Add(new Transportista
                    {
                        Id_Transportista = Convert.ToInt32(row["ID_TRANSPORTISTA"]),
                        Nombre_Completo = row["NOMBRE_COMPLETO"]?.ToString(),
                        Cedula = row["CEDULA"]?.ToString(),
                        Correo_Electronico = row["CORREO_ELECTRONICO"]?.ToString(),
                        Empresa = row["EMPRESA"]?.ToString(),
                        Telefono = row["TELEFONO"]?.ToString(),
                        Estado = Convert.ToBoolean(row["ESTADO"]),
                        Transaccion = ""
                    });
                }
                return Ok(lista);
            }

            return NotFound("No se encontraron transportistas.");
        }

        [Route("[action]")]
        [HttpPost]
        public async Task<ActionResult<List<Transportista>>> GetTransportista([FromBody] Transportista transportista)
        {

            var cadenaConexion = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("ConnectionStrings")["Conexion"];
            XDocument xmlParam = API.Shared.DBXmlMethods.GetXml(transportista);
            DataSet dsResultado = await API.Shared.DBXmlMethods.EjecutaBase(APIMarket_Construccion.Shared.NameStoreProcedure.SP_GetName2, cadenaConexion, transportista.Transaccion, xmlParam.ToString());

            List<Transportista> listTransportista = new List<Transportista>();

            if (dsResultado.Tables.Count > 0)
            {
                try
                {

                    foreach (DataRow row in dsResultado.Tables[0].Rows)
                    {
                        Transportista objResponse = new Transportista
                        {
                            Id_Transportista = Convert.ToInt32(row["ID_TRANSPORTISTA"]),
                            Nombre_Completo = row["NOMBRE_COMPLETO"]?.ToString(),
                            Cedula = row["CEDULA"]?.ToString(),
                            Correo_Electronico = row["CORREO_ELECTRONICO"]?.ToString(),
                            Empresa = row["EMPRESA"]?.ToString(),
                            Telefono = row["TELEFONO"]?.ToString(),
                            Estado = Convert.ToBoolean(row["ESTADO"]),
                            Transaccion = ""
                        };
                        listTransportista.Add(objResponse);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }
                return Ok(listTransportista);
            }

            return NotFound("No se encontraron transportistas con ese nombre.");
        }

        [Route("ObtenerTransportistaPorCedula")]
        [HttpGet]
        public async Task<ActionResult<List<Transportista>>> ObtenerTransportistaPorCedula(string cedula, string transaccion)
        {
            Transportista transportista = new Transportista();
            transportista.Cedula = cedula;
            transportista.Transaccion = transaccion;

            var cadenaConexion = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("ConnectionStrings")["Conexion"];
            XDocument xmlParam = API.Shared.DBXmlMethods.GetXml(transportista);
            DataSet dsResultado = await API.Shared.DBXmlMethods.EjecutaBase("getTransportista", cadenaConexion, transportista.Transaccion, xmlParam.ToString());

            List<Transportista> listaTransportistas = new List<Transportista>();

            if (dsResultado.Tables.Count > 0)
            {
                try
                {
                    foreach (DataRow row in dsResultado.Tables[0].Rows)
                    {
                        Transportista obj = new Transportista
                        {
                            Id_Transportista = Convert.ToInt32(row["ID_TRANSPORTISTA"]),
                            Nombre_Completo = row["NOMBRE_COMPLETO"]?.ToString(),
                            Cedula = row["CEDULA"]?.ToString(),
                            Correo_Electronico = row["CORREO_ELECTRONICO"]?.ToString(),
                            Empresa = row["EMPRESA"]?.ToString(),
                            Telefono = row["TELEFONO"]?.ToString(),
                            Estado = Convert.ToBoolean(row["ESTADO"]),
                            Transaccion = ""
                        };
                        listaTransportistas.Add(obj);
                    }

                    return Ok(listaTransportistas);
                }
                catch (Exception ex)
                {
                    return BadRequest("Error al procesar los datos: " + ex.Message);
                }
            }

            return NotFound("No se encontraron transportistas con esa cédula.");
        }

        [Route("EliminarTransportista")]
        [HttpDelete]
        public async Task<ActionResult<List<Resultado>>> EliminarTransportista([FromQuery] int idTransportista)
        {
            Transportista transportista = new()
            {
                Id_Transportista = idTransportista,
                Transaccion = "ELIMINAR_TRANSPORTISTA"
            };

            var cadenaConexion = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("ConnectionStrings")["Conexion"];
            XDocument xmlParam = API.Shared.DBXmlMethods.GetXml(transportista);
            DataSet dsResultado = await API.Shared.DBXmlMethods.EjecutaBase("setTransportista", cadenaConexion, transportista.Transaccion, xmlParam.ToString());

            List<Resultado> resultados = new();

            if (dsResultado.Tables.Count > 0)
            {
                foreach (DataRow row in dsResultado.Tables[0].Rows)
                {
                    resultados.Add(new Resultado
                    {
                        Respuesta = row["Respuesta"].ToString(),
                        Leyenda = row["Leyenda"].ToString()
                    });
                }
            }

            return Ok(resultados);
        }

    }
}
