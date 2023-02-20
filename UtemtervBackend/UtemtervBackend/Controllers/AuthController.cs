using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NuGet.Protocol;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using UtemtervBackend.Models;
using UtemtervBackend.Views;

namespace UtemtervBackend.Controllers   
{
    [EnableCors]
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        UtemtervContext _context;
        IConfiguration _configuration;
        public AuthController(UtemtervContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginUser user)
        {
            var letezik = _context.Users.Where(u => u.Email == user.UserEmail).ToArray();
           
           
            if (letezik.Count() != 1)
            {
                return StatusCode(401, "NOT_VALID_USERNAME");
            }
            var hashPW = UserController.CreateMD5(user.Password);
            var validUser = _context.Users.FromSqlInterpolated($"validateUser {user.UserEmail},{hashPW}").ToArray();
            if (validUser.Count() != 1)
            {
                return StatusCode(401, "WRONG_PASSWORD");
            }
            string token = CreateToken(letezik[0]);
                return Ok(token);
        }

        private string CreateToken(User user) {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, "" + user.UserId),
                new Claim(ClaimTypes.Role, ""+user.Post)

            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(0.0416),
                signingCredentials: cred
                ); ;
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
       
}

public class LoginUser
{
    public string UserEmail { get; set; }
    public string Password { get; set; }
}
