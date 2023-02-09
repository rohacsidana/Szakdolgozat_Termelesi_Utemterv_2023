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
    public class WodController : ControllerBase
    {
        UtemtervContext _context;
        public WodController(UtemtervContext context)
        {
            _context = context;
        }

        [HttpGet("{lot}")]
        public IActionResult allWodSP(int lot)
        {
            try
            {
                var wods = _context.WodDets.FromSqlRaw($"wodAll {lot}").AsEnumerable();

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
    }
}
