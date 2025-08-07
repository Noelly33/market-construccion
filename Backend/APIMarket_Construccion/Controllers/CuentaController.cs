using APIMarket_Construccion.DTOs;
using APIMarket_Construccion.Utilies;
using BCMarket_Construccion;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Xml.Linq;



namespace APIMarket_Construccion.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CuentaController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CuentaController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("Login")]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] DTOs.LoginRequest request)
        {
            var cuenta = new Cuenta
            {
                Username = request.Username,
                Clave = request.Clave,
                Transaccion = "CONSULTAR_CUENTAS"
            };

            string cadenaConexion = _configuration.GetConnectionString("Conexion");
            XDocument xmlParam = API.Shared.DBXmlMethods.GetXml(cuenta);

            DataSet ds = await API.Shared.DBXmlMethods.EjecutaBase(
                APIMarket_Construccion.Shared.NameStoreProcedure.SP_GetName3,
                cadenaConexion,
                cuenta.Transaccion,
                xmlParam.ToString()
            );

            if (ds.Tables.Count == 0 || ds.Tables[0].Rows.Count == 0)
                return Unauthorized("Credenciales inválidas");

            var row = ds.Tables[0].Rows[0];

            string clave = row["CLAVE"].ToString();
            string username = row["USERNAME"].ToString();
            string rol = row["ROL"].ToString();

            Console.WriteLine($"request.Clave: {request.Clave}");
            Console.WriteLine($"clave de BD: {clave}");

            if (!BCrypt.Net.BCrypt.Verify(request.Clave, clave))
                return Unauthorized("Credenciales inválidas");
            
            var tokenHelper = new Token(_configuration);
            string tokenGenerado = tokenHelper.GenerarToken(username, rol);
            return Ok(new LoginResponse
            {
                Token = tokenGenerado,
                Username = username,
                Rol = rol
            });
        }




        // GET: api/Auth/ValidarToken
        /*[HttpGet("ValidarToken")]
        [Authorize]
        public IActionResult ValidarToken()
        {
            return Ok("Token válido y activo");
        }*/
    }
}
