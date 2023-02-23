using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UtemtervBackend.Models;

namespace UtemtervBackend.Controllers
{
    [EnableCors]
    [Route("api/lad")]
    [ApiController]
    [Authorize]

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
        [HttpPatch("used")]
        public IActionResult PatchWodEndResult([FromBody] LadUsedDto beadat)
        {
            Console.WriteLine(beadat.LadId);
            Console.WriteLine(beadat.LadUsed);

            try
            {
                var res = _context.Database.ExecuteSqlInterpolated($"updateLad {beadat.LadId}, {beadat.LadUsed}");
                return Ok(res); 
            }
            catch (Exception)
            {

                return StatusCode(500, "NOT_VALID_VALUE");
            }
        }

        [HttpPost("reserve")]
        public IActionResult ReserveToWo([FromBody] ReserveToWoDto lad)
        {
            try
            {
            var res = _context.Database.ExecuteSqlInterpolated($"newLad {lad.LadPart}, {lad.LadPar},{lad.LadLot}, {lad.LadComp},{lad.LadExpire}, {lad.LadAmount}");
                return Ok(res);
            }
            catch (Exception e)
            {
                 
                return StatusCode(500, e);
            }
        
        }

    }
}
public class LadUsedDto
{
    public int LadId { get; set;}
    public decimal LadUsed { get; set;}
}

public class ReserveToWoDto
{
    public int LadPart { get; set;}
    public int LadPar { get; set;}
      public int LadLot { get; set;}
       public int LadComp { get; set;}
       public DateTime LadExpire { get; set;}
       public decimal LadAmount { get; set;}
}