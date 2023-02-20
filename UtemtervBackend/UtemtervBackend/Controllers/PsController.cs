using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UtemtervBackend.Models;

namespace UtemtervBackend.Controllers
{
    [EnableCors]
    [Route("api/ps")]
    [ApiController]
    [Authorize]

    public class PsController : ControllerBase
    {
        UtemtervContext _context;

        public PsController(UtemtervContext context)
        {
            _context = context;
        }


        [HttpGet("list")]
        public IActionResult PsList()
        {
            try
            {
                var psList = _context.PsMstrs.ToList();
                
                if (psList.Count() == 0)
                {
                    return NotFound("Ps not found.");
                }
                return Ok(psList);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("new")]
        public IActionResult newPs([FromBody] NewOrUpdatePs ps)
        {
            try
            {
                var newPs = _context.PsMstrs.FromSqlInterpolated($"newPs {ps.PsPar}, {ps.PsComp}, {ps.PsQtyPer}").ToList();
                return Ok(newPs);
            }
            catch (Exception e)
            {
                return StatusCode(404, e);
            }
        }


        [HttpPut("update")]
        public IActionResult updatePs([FromBody] NewOrUpdatePs ps)
        {
            try
            {
                var updatePs = _context.Database.ExecuteSqlInterpolated($"updatePs {ps.PsPar}, {ps.PsComp}, {ps.PsQtyPer}");
                return Ok(updatePs);
            }
            catch (Exception e)
            {
                return StatusCode(404, e);
            }
        }


        [HttpDelete("delete/{par}/{comp}")]
        public IActionResult deleteUser(int par, int comp)
        {
            try
            {
                var numberOfDeleted = _context.Database.ExecuteSqlRaw($"deletePs {par}, {comp}");
                return Ok(numberOfDeleted);
            }
            catch (Exception e)
            {
                return StatusCode(404, e);
            }
        }
    }


    public class DeletePs
    {
        public int PsPar { get; set; }
        public int PsComp { get; set; }
    }

    public class NewOrUpdatePs: DeletePs
    {
        public double PsQtyPer { get; set; }
    }
}
