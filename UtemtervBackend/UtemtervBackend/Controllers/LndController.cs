using Microsoft.AspNetCore.Authorization;
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
    [Authorize]

    public class LndController : ControllerBase
    {

        UtemtervContext _context;
        public LndController(UtemtervContext context)
        {
            _context = context;
        }

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
        public IActionResult NewLn([FromBody]
        NewLnd_UpdateLnd lnd)
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

        [HttpPut("update")]
        public IActionResult UpdateLnd([FromBody] NewLnd_UpdateLnd lnd)
        {
            try
            {
                var updateLnd = _context.Database.ExecuteSqlInterpolated($"updateLnd {lnd.LndLine}, {lnd.LndPart}, {lnd.LndRate}");

                return Ok(updateLnd);

            }
            catch (Exception e)
            {
                return StatusCode(404, e);
            }
        }

        [HttpDelete("delete/{line}/{part}")]
        public IActionResult deleteLnd(string line, int part)
        {
            try
            {
                var updateLn = _context.Database.ExecuteSqlInterpolated($"deleteLnd {line}, {part}");

                return Ok(updateLn);

            }
            catch (Exception e)
            {
                return StatusCode(404, e);
            }
        }

        public class NewLnd_UpdateLnd
        {
            public string LndLine { get; set; }
            public int LndPart { get; set; }
            public decimal LndRate { get; set; }
        }

    }
}

