using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

    }
}

