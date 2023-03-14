using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UtemtervBackend.Models;

namespace UtemtervBackend.Controllers
{
    [EnableCors]
    [Route("api/ld")]
    [ApiController]
    [Authorize]

    public class LdController : ControllerBase
    {

        UtemtervContext _context;

        public LdController(UtemtervContext context)
        {
            _context = context;
        }

        [EnableCors]
        [HttpGet("list")]
        [Authorize(Roles = "1,3")]
        public IActionResult LdList()
        {
            try
            {
                var ldList = _context.LdDets.ToList();
                if (ldList.Count() == 0)
                {
                    return NotFound("Ld not found");
                }
                return Ok(ldList);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("new")]
        [Authorize(Roles = "1,3")]
        public IActionResult newLd([FromBody] NewOrUpdateLd ld)
        {
            try
            {
                var newRows = _context.Database.ExecuteSqlInterpolated($"newLd {ld.LdPart}, {ld.LdExpire}, {ld.LdQtyOh}");
                return Ok(newRows);
            }catch(Exception e)
            {
                return StatusCode(404, e);
            }
        }

        [HttpDelete("delete/{part}/{exp}")]
        [Authorize(Roles = "1,3")]

        public IActionResult deleteLd(int part, int exp)
        {
            try
            {
                var newRows = _context.Database.ExecuteSqlInterpolated($"deleteLd {part}, {exp}");
                return Ok(newRows);
            }catch(Exception e)
            {
                return StatusCode(404, e);
            }
        }

        [HttpPut("update")]
        [Authorize(Roles = "1,3")]

        public IActionResult updateLd([FromBody] NewOrUpdateLd ld)
        {
            try
            {
                var updatedRows = _context.Database.ExecuteSqlInterpolated($"updateLd {ld.LdPart}, {ld.LdExpire}, {ld.LdQtyOh}, {ld.LdQtyScrp}");
                return Ok(updatedRows);
            }
            catch (Exception e)
            {
                return StatusCode(404, e);
            }
        }

        [HttpGet("scrap")]
        [Authorize(Roles = "1,3")]

        public IActionResult scarpLd()
        {
            try
            {
                var res = _context.Database.ExecuteSql($"scrap");
                 return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(404, e);
            }
        }


        public class Ld
        {
            public int LdPart { get; set; }
            public string LdExpire { get; set; }

        }
        public class NewOrUpdateLd : Ld
        {
            public float LdQtyOh { get; set; }

            public float LdQtyScrp { get; set; }

        }
    }



}
