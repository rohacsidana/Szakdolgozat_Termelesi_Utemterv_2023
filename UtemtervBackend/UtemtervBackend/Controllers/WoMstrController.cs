using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using UtemtervBackend.Models;

namespace UtemtervBackend.Controllers
{
    [EnableCors]
    [Route("workorder")]
    [ApiController]
    public class WoMstrController : ControllerBase
    {
        private UtemtervContext _context;
        public WoMstrController(UtemtervContext context)
        {
            _context = context;
        }
        [EnableCors]
        [HttpGet("list")]
        public IActionResult WoList()
        {
            try
            {
                var woList = _context.WoMstrs.FromSqlRaw("woList").AsEnumerable();
               

                if (woList.Count() == 0)
                {
                    return NotFound("Workorder not found.");
                }
                return Ok(woList);
            }
            catch (Exception)
            {

                return StatusCode(500, "An Error has occured.");
            }
        }

        [HttpGet("{lot}")]
        public IActionResult getWo(int lot)
        {
            try
            {
                var wo = _context.WoMstrs.FromSqlRaw($"getWo {lot}").AsEnumerable();

                if (wo.Count() == 0)
                {
                    return NotFound("Workorder not found.");
                }
                return Ok(wo);
            }
            catch (Exception)
            {

                return StatusCode(404, "An erros has occured.");
            }
            return Ok();
        }

    }

}

