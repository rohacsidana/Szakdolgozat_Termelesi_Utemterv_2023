using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;
using System.Globalization;
using System.Security.Claims;
using System.Security.Cryptography;
using UtemtervBackend.Models;

namespace UtemtervBackend.Controllers
{
    [EnableCors]
    [Route("api/user")]
    [ApiController]
    [Authorize]

    public class UserController : ControllerBase
    {
        private UtemtervContext _context;

        public UserController(UtemtervContext context)
        {
            _context = context;
        }
        [HttpGet("list")]
        public IActionResult UserList()
        {
            try
            {
                var userList = _context.Users.ToList();

                if (userList.Count() == 0)
                {
                    return NotFound("User not found.");

                }
                return Ok(userList);
            }
            catch (Exception e)
            {
                return StatusCode(404,e);
            }
        }
        [HttpPost("new")]
        public IActionResult NewUser([FromBody] CNewUser user)
        {
            try
            {
                var newU = _context.Users.FromSqlInterpolated($"newUser {user.Name}, {user.BirthDate}, {user.Email}, {CreateMD5(user.Password)}, {user.Post}").ToList();
                return Ok(newU);
            }
            catch (Exception e)
            {
                return StatusCode(404, e);
            }
        }

        [HttpPut("update")]
        public IActionResult UpdateUser([FromBody] CUpdateUser user)
        {
            try
            {
                var updateUser = _context.Database.ExecuteSqlInterpolated($"updateUser {user.UserID}, {user.Name}, {user.BirthDate}, {user.Email}, {CreateMD5(user.Password)}, {user.Post}");
                return Ok(updateUser);
            }
            catch (Exception e)
            {
                return StatusCode(404, e);
            }
        }


        [HttpDelete("delete/{id}")]
        public IActionResult deleteUser(int id)
        {
            try
            {
                var numberOfDeleted = _context.Database.ExecuteSqlRaw($"deleteUser {id}");
                return Ok(numberOfDeleted);
            }
            catch(Exception e)
            {
                return StatusCode(404, e);
            }
        }

        [HttpPost("change/password")]
        public IActionResult ChangeMyPassword([FromBody] PwDto password )
        {
            var letezik = _context.Users.Where(u => u.Email == User.FindFirstValue(ClaimTypes.Email)).ToArray();

            if (letezik.Count() != 1)
            {
                return StatusCode(401, "EMAIL_NOT_FOUND");
            }
            var user = User.FindFirstValue(ClaimTypes.Name);
            var hashPW = UserController.CreateMD5(password.Password);
            var validUser = _context.Users.FromSqlInterpolated($"validateUser {User.FindFirstValue(ClaimTypes.Email)},{hashPW}").ToArray();
            if (validUser.Count() == 1)
            {
                return StatusCode(401, "SAME_PASSWORD");    
            }
            var eredmeny = _context.Database.ExecuteSqlInterpolated($"changePwByNormalUser {user}, {hashPW}");

            return Ok();
        }



        public class CNewUser
        {
            public string Name { get; set; }
            public string BirthDate { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public int Post { get; set; }

        }
        public class CUpdateUser:CNewUser
        {
            public int UserID { get; set; }    

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
    public class PwDto
    {
        public string Password { get; set; }
    }

}
