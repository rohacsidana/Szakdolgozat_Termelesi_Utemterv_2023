using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UtemtervBackend.Models;
using static UtemtervBackend.Controllers.ChgController;

namespace UtemtervBackend.Controllers
{
    [EnableCors]
    [Route("api/chg")]
    [ApiController]
    [Authorize]

    public class ChgController : ControllerBase
    {

        UtemtervContext _context;
        public ChgController(UtemtervContext context)
        {
            _context = context;
        }

        
        [HttpGet("list")]

        public IActionResult ChgList()
        {
            try
            {
                var chgList = _context.ChgMstrs.ToList();

                if (chgList.Count() == 0)
                {
                    return NotFound("Chg master not found.");
                }

                return Ok(chgList);

            }
            catch (Exception e)
            {
                return StatusCode(404, e);
            }

        }

        [HttpPost("new")]

        public IActionResult newChg([FromBody]
        Chg chg)
        {
            try
            {
                var newChg = _context.ChgMstrs.FromSqlInterpolated($"newChg {chg.ChgLine}, {chg.ChgFrom}, {chg.ChgTo}, {chg.ChgTime}").ToList();

                return Ok(newChg);

            }
            catch (Exception e)
            {
                return StatusCode(404, e);
            }
        }

        
        [HttpPut("update")]

        public IActionResult UpdateChg([FromBody] Chg chg)
        {
            try
            {
                var updateChg = _context.Database.ExecuteSqlInterpolated($"updateChg {chg.ChgLine}, {chg.ChgFrom}, {chg.ChgTo}, {chg.ChgTime}");

                return Ok(updateChg);

            }
            catch (Exception e)
            {
                return StatusCode(404, e);
            }
        }

        
        [HttpDelete("delete/{line}/{from}/{to}")]

        public IActionResult deleteChg(string line, int from, int to)
        {
            try
            {
                var deletedChgs = _context.Database.ExecuteSqlRaw($"deleteChg {line}, {from}, {to}");
                return Ok(deletedChgs);
            }
            catch (Exception e)
            {
                return StatusCode(404, e);
            }
        }

        public class Chg
        {
            public string ChgLine { get; set; }

            public int ChgFrom { get; set; }

            public int ChgTo { get ; set; }

            public string ChgTime { get; set; }


        }
    }
}
