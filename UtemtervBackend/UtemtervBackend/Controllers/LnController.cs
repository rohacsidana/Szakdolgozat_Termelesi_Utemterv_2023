using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UtemtervBackend.Models;

namespace UtemtervBackend.Controllers
{
    [EnableCors]
    [Route("api/ln")]
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
        
        [HttpPost("new")]

        public IActionResult newLn([FromBody]
        NewLn ln)
        {
            try
            {
                var newLn = _context.LnMstrs.FromSqlInterpolated($"newLn {ln.LnLine}, {ln.LnDesc}").ToList();

                return Ok(newLn);

            } catch (Exception e)
            {
                return StatusCode(404, e);
            }
        }

        [EnableCors]
        [HttpPut("update")]

        public IActionResult UpdateLn([FromBody] UpdateLn ln)
        {
            try
            {
                var updateLn = _context.Database.ExecuteSqlInterpolated($"updateLn {ln.Line}, {ln.NewDesc}");

                return Ok(updateLn);

            }
            catch (Exception e)
            {
                return StatusCode(404, e);
            }
        }

    }
    
    public class NewLn
    {
        public string LnLine { get; set; }
        public string LnDesc { get; set; }  
    }

    public class UpdateLn
    {
        public string Line { get; set; }
        public string NewDesc { get; set; }
    }
}
