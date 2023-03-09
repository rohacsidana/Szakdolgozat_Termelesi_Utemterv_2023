using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UtemtervBackend.Models;

namespace UtemtervBackend.Controllers
{
    [EnableCors]
    [Route("api/wod")]
    [ApiController]
    [Authorize(Roles ="1, 2")]

    public class WodController : ControllerBase
    {
        UtemtervContext _context;
        public WodController(UtemtervContext context)
        {
            _context = context;
        }

        [HttpGet("{lot}")]
        public IActionResult AllWodSP(int lot)
        {
            try
            {
                var wods = _context.VwWods.Where(w => w.Lot == lot).ToList();

                if(wods.Count() > 0)
                {
                    return Ok(wods);
                }
                    return StatusCode(500, "No wod found.");
            }
            catch (Exception)
            {
                return StatusCode(500, "An error has occured.");
            }
        }

        [HttpPatch("result")]
        public IActionResult PatchWodEndResult([FromBody] WodResultDto wodData)
        {
            try
            {
                var res = _context.Database.ExecuteSqlInterpolated($"updateWod {wodData.WodLot}, {wodData.WodPart}, {wodData.WodPar}, {wodData.WodCompl}, {wodData.WodRjct}");
                return Ok(res);
            }
            catch (Exception)
            {

                return StatusCode(500, "NOT_VALID_VALUE");
            }
        }
    }
}

public class WodResultDto
{
    public int WodLot { get; set; }
    public int WodPart {get; set;}
    public int WodPar { get; set; }
    public int WodCompl { get;set; }
    public int WodRjct { get; set; }

}