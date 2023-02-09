using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UtemtervBackend.Models;

namespace UtemtervBackend.Controllers
{
    [EnableCors]
    [Route("gys")]
    [ApiController]
    public class LnController : ControllerBase
    {
        private UtemtervContext _context;

        public LnController(UtemtervContext context)
        {
            _context = context;
        }
        [EnableCors]
        [HttpGet("list")]

        public IActionResult GysList()
        {
            try
            {
                var gysList =
            _context.LnLists.ToList();

                if (gysList.Count() == 0)
                {
                    return NotFound("Line master not found.");
                }
                return Ok(gysList);

            }
            catch (Exception e)
            {
                /*return StatusCode(500, "An Error has occured.");*/
                return StatusCode(404, e);
            }
        }
        /*
        [EnableCors]
        [HttpPost("new")]

        public IActionResult newGys([FromBody])*/


    }
    /*
    public class NewLn:Ln
    {
        public string PtUm { get; set; }
    }*/
}
