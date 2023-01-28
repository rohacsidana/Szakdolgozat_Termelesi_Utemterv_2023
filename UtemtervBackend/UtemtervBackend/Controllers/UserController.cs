using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
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
        //[HttpPost("new")]

        //public IActionResult NewUser(User user)
        //{
        //    _context.Users.FromSqlRaw("newUser").AsEnumerable();
            
        //}
    
    }
    

}
