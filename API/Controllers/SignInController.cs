using ContactAPI.BO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Contact_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignInController : ControllerBase
    {

        private readonly DBContext _context;
        private IConfiguration _config;
        private readonly ILogger<SignInController> _logger;
        public SignInController(DBContext context, IConfiguration config, ILogger<SignInController> logger)
        {
            _context = context;
            _config = config;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpPost("signIn")]
        public IActionResult SignIn(SignIn user)
        {
            _logger.LogInformation("SignIn user action start");
            IActionResult res = Unauthorized();
            if (user != null)
            {
                bool exists = _context.Contacts.Any(u => u.Email == user.Email && u.Password == user.Password);
                if (exists)
                {
                    var validUser = _context.Contacts.SingleOrDefault(u => u.Email == user.Email && u.Password == user.Password);
                    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                    var Sectoken = new JwtSecurityToken(_config["Jwt:Issuer"],
                      _config["Jwt:Issuer"],
                      null,
                      expires: DateTime.Now.AddMinutes(120),
                      signingCredentials: credentials);

                    var token = new JwtSecurityTokenHandler().WriteToken(Sectoken);
                    var data = new SignInUser();
                    data.Firstname = validUser.FirstName;
                    data.Lastname = validUser.LastName;
                    data.Email = validUser.Email;
                    data.Token = token;
                    _logger.LogInformation("SignIn action success");
                    return Ok(data);
                }
            }
            _logger.LogInformation("SignIn action failed");
            return res;
        }

    }
}
