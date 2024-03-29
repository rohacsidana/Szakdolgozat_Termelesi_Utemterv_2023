﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Policy;
using UtemtervBackend.Models;

namespace UtemtervBackend.Controllers
{
    [EnableCors]
    [Route("api/pt")]
    [ApiController]
    [Authorize]

    public class PtController : ControllerBase
    {
        UtemtervContext _context;
        public PtController(UtemtervContext context)
        {
            _context = context;
        }
        [HttpGet("list")]
        [Authorize(Roles = "1,3")]
        public IActionResult PtList()
        {
            try
            {
                var ptList = _context.PtMstrs.ToList();

                if (ptList.Count() == 0)
                {
                    return NotFound("Pt not found.");
                }
                return Ok(ptList);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


        [HttpPost("new")]
        [Authorize(Roles = "1,3")]

        public IActionResult newPt([FromBody] NewPt pt)
        {
            try
            {
                var newPt = _context.PtMstrs.FromSqlInterpolated($"newPt {pt.PtDesc}, {pt.PtUm}").ToList();
                return Ok(newPt);
            }
            catch (Exception e)
            {
                return StatusCode(404, e);
            }
        }

        [HttpPut("update")]
        [Authorize(Roles = "1,3")]

        public IActionResult updatePt([FromBody] UpdatePt pt)
        {
            try
            {
                var updatePt = _context.Database.ExecuteSqlInterpolated($"updatePt {pt.PtPart}, {pt.PtDesc}");
                return Ok(updatePt);
            }
            catch (Exception e)
            {
                return StatusCode(404, e);
            }
        }

        [HttpDelete("delete/{part}")]
        [Authorize(Roles = "1,3")]

        public IActionResult deletePt(int part)
        {
            try
            {
                var numberOfDeleted = _context.Database.ExecuteSqlRaw($"deletePt {part}");
                return Ok(numberOfDeleted);

            }
            catch(Exception e)
            {
                return StatusCode(404, e);
            }
        }


        public class Pt
        {
            public string PtDesc { get; set; }
        }
        public class NewPt:Pt
        {
            public string PtUm{ get; set; }
        }

        public class UpdatePt : Pt
        {
            public int PtPart { get; set; } 
        }
        public class GetPt : UpdatePt
        {
            public int PtQtyOh { get; set; }
        }
    }
}
