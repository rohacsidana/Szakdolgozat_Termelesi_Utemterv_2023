using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UtemtervBackend.Models;

namespace UtemtervBackend.Controllers
{
    [EnableCors]
    [Route("api/lad")]
    [ApiController]
    public class LadController : ControllerBase
    {
        UtemtervContext _context;
        public LadController(UtemtervContext context)
        {
            _context = context;
        }

        [HttpGet("{lot}")]
        public IActionResult ListLad(int lot)
        {
            try
            {
                var lads = _context.LadDets.Where(s => s.LadLot == lot).ToList();

                if (lads.Count() == 0)
                {
                    
                    return NotFound("No lad found to the workorder.");
                }
                return Ok(lads);

            }
            catch (Exception)
            {

                return StatusCode(500, "An error has occured.");
            }
        }

    }
}
