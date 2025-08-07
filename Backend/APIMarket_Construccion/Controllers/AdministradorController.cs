using BCMarket_Construccion;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Xml.Linq;

namespace APIMarket_Construccion.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class AdministradorController : Controller
    {
        [Route("ObtenerAdministrador")]
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<Administrador>>> ObtenerTodosLosAdministradores()
        {
            var admin = new Administrador { Transaccion = "CONSULTAR_ADMINISTRADOR"};

            var cadenaConexion = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build()
                .GetSection("ConnectionStrings")["Conexion"];

            XDocument xmlParam = API.Shared.DBXmlMethods.GetXml(admin);

            DataSet dsResultado = await API.Shared.DBXmlMethods.EjecutaBase("getAdministrador", cadenaConexion, admin.Transaccion, xmlParam.ToString());

            List<Administrador> lista = new();

            if (dsResultado.Tables.Count > 0)
            {
                foreach (DataRow row in dsResultado.Tables[0].Rows)
                {
                    lista.Add(new Administrador
                    {
                        ID_Administrador = Convert.ToInt32(row["ID_ADMINISTRADOR"]),
                        Id_Rol = Convert.ToInt32(row["ID_ROL"]),
                        Correo = row["CORREO"]?.ToString(),
                        Transaccion = ""
                    });
                }

                return Ok(lista);
            }

            return NotFound("No se encontraron administradores.");
        }
    }
}
