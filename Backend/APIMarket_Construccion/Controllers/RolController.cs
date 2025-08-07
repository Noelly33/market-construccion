using BCMarket_Construccion;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Xml.Linq;

namespace APIMarket_Construccion.Controllers
{
    public class RolController : Controller
    {
        [Route("ObtenerTodosLosRoles")]
        [HttpGet]
        public async Task<ActionResult<List<Rol>>> ObtenerTodosLosRoles()
        {
            var rol = new Rol { Transaccion = "CONSULTAR_TODOS_ROLES" };
            var cadenaConexion = new ConfigurationBuilder() 
                .AddJsonFile("appsettings.json")
                .Build()
                .GetSection("ConnectionStrings")["Conexion"];
            XDocument xmlParam = API.Shared.DBXmlMethods.GetXml(rol);
            DataSet dsResultado = await API.Shared.DBXmlMethods.EjecutaBase("getRol",cadenaConexion, rol.Transaccion,xmlParam.ToString());

            List<Rol> lista = new();

            if (dsResultado.Tables.Count > 0)
            {
                foreach (DataRow row in dsResultado.Tables[0].Rows)
                {
                    lista.Add(new Rol
                    {
                        Id_Rol = Convert.ToInt32(row["ID_ROL"]),
                        Nombre_Rol = row["NOMBRE_ROL"]?.ToString(),
                        Estado = Convert.ToBoolean(row["ESTADO"]),
                        Transaccion = ""
                    });
                }

                return Ok(lista);
            }

            return NotFound("No se encontraron roles.");
        }

    }
}
