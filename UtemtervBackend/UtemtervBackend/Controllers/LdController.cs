﻿using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UtemtervBackend.Models;

namespace UtemtervBackend.Controllers
{
    [EnableCors]
    [Route("api/ld")]
    [ApiController]
    public class LdController : ControllerBase
    {

        UtemtervContext _context;

        public LdController(UtemtervContext context)
        {
            _context = context;
        }

        [EnableCors]
        [HttpGet("list")]

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

        [EnableCors]
        [HttpPost("new")]
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

        [EnableCors]
        [HttpDelete("delete")]

        public IActionResult deleteLd([FromBody] Ld ld)
        {
            try
            {
                var newRows = _context.Database.ExecuteSqlInterpolated($"deleteLd {ld.LdPart}, {ld.LdExpire}");
                return Ok(newRows);
            }catch(Exception e)
            {
                return StatusCode(404, e);
            }
        }

        [EnableCors]
        [HttpPut("update")]

        public IActionResult updateLd([FromBody] NewOrUpdateLd ld)
        {
            try
            {
                var newRows = _context.Database.ExecuteSqlInterpolated($"newLd {ld.LdPart}, {ld.LdExpire}, {ld.LdQtyOh}");
                return Ok(newRows);
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

        }
    }



}
