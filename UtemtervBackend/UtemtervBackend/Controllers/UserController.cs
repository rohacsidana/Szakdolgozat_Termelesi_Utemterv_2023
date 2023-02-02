using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using UtemtervBackend.Models;

namespace UtemtervBackend.Controllers
{
    [EnableCors]
    [Route("user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UtemtervContext _context;

        public UserController(UtemtervContext context)
        {
            _context = context;
        }
        [EnableCors]
        [HttpGet("list")]
        public IActionResult UserList()
        {
            try
            {
                var userList = _context.UserLists.ToList();

                if (userList.Count() == 0)
                {
                    return NotFound("User not found.");

                }
                return Ok(userList);
            }
            catch (Exception)
            {
                return StatusCode(500, "An Error has occured.");
            }
        }
        [EnableCors]
        [HttpPost("new")]
        public IActionResult newUser([FromBody] NewUser user)
        {
            try
            {
                string sqlFormattedDate = user.BirthDate.Date.ToString("yyyy-MM-dd HH:mm:ss");

                var newU = _context.Database.ExecuteSqlInterpolated($"newUser {user.Name}, {sqlFormattedDate}, {user.Email}, {CreateMD5(user.Password)}, {user.Post}");
                return Ok(newU);
            }
            catch (Exception e)
            {

                return StatusCode(404, e);
            }
        }

        public class NewUser
        {
            public string Name { get; set; }
            public DateTime BirthDate { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public int Post { get; set; }

        }

        public static string CreateMD5(string input)
        {
            using (System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create())
            {
                byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                return Convert.ToHexString(hashBytes);            }
        }

    }


}
