using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UtemtervBackend.Models;

namespace UtemtervBackend.Controllers
{
    [EnableCors]
    [Route("api/lnd")]
    [ApiController]
    public class LndController : ControllerBase
    {

        UtemtervContext _context;
        public LndController(UtemtervContext context)
        {
            _context = context;
        }

        [EnableCors]
        [HttpGet("list")]

        public IActionResult LndList()
        {
            try
            {
                var lndList = _context.LndDets.ToList();

                if (lndList.Count() == 0)
                {
                    return NotFound("Lnd det not found.");
                }

                return Ok(lndList);

            } catch (Exception e)
            {
                return StatusCode(404, e);
            }

        }

        [HttpPost("new")]

        public IActionResult newLn([FromBody]
        NewLnd lnd)
        {
            try
            {
                var newLnd = _context.LndDets.FromSqlInterpolated($"newLnd {lnd.LndLine}, {lnd.LndPart}, { lnd.LndRate}").ToList();

                return Ok(newLnd);

            }
            catch (Exception e)
            {
                return StatusCode(404, e);
            }
        }
        
        public class NewLnd
        {
            public string LndLine { get; set; }
            public int LndPart { get; set; }
            public decimal LndRate { get; set; }
        }

    }
}

