using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            var userList = _context.Users.FromSqlRaw("userList").AsEnumerable();
            return Ok(userList);
            try
            {
                var userList2 = _context.Users.FromSqlRaw("userList").AsEnumerable();

                if(userList2.Count() == 0)
                {
                    return NotFound("User not found.");
                    
                }
                return Ok(userList2);
            }
            catch (Exception)
            {
                return StatusCode(500, "An Error has occured.");
            }
        }
    
    }
    

}
