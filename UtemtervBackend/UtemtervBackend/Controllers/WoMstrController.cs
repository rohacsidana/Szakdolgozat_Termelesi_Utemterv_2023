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

        [HttpPost("teszt/new")]
        public IActionResult newWo([FromBody] NewWo wo)
        {
            try
           {
                var vlmi =  _context.Database.ExecuteSqlInterpolated($"newWo1 {wo.WoNbr}, {wo.WoPart}, {wo.WoQtyOrd}, {wo.WoDueDate}");
                return Ok(vlmi);
            }
            catch (Exception e)
            {

                return StatusCode(404, e);
            }
        }

    }

}

public class NewWo
{
    public string WoNbr { get; set; }
    public int WoPart { get; set; }
    public int WoQtyOrd { get; set; }
    public DateTime WoDueDate { get; set; }


}