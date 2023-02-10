using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using UtemtervBackend.Models;

namespace UtemtervBackend.Controllers
{
    [EnableCors]
    [Route("api/workorder")]
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
                var woList = _context.WoMstrs.ToList();//_context.WoMstrs.FromSqlRaw("woList").AsEnumerable();
               

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

                return StatusCode(404, "An error has occured.");
            }
            return Ok();
        }

        [HttpPost("new")]
        public IActionResult newWo([FromBody] NewWo wo)
        {
            try
           {
                //var vlmi =  _context.Database.ExecuteSqlInterpolated($"newWo {wo.WoNbr}, {wo.WoPart}, {wo.WoQtyOrd}, {wo.WoDueDate}");
                var vlmi =  _context.WoMstrs.FromSqlInterpolated($"newWo {wo.WoNbr}, {wo.WoPart}, {wo.WoQtyOrd}, {wo.WoDueDate}").ToList();
                if (vlmi.IsNullOrEmpty()) {
                    return StatusCode(500, "An error has occured.");
                }
                else { 
                    return Ok(vlmi);
                }
            }
            catch (Exception e)
            {

                return StatusCode(404, e);
            }
        }

        [HttpPut("update")]
        public IActionResult updateWo([FromBody] UpdateWo wo)
        {
            try
            {
                var vlmi = _context.WoMstrs
                        .FromSqlInterpolated($"updateWo {wo.WoNbr}, {wo.WoPart}, {wo.WoQtyOrd}, {wo.WoDueDate}, {wo.WoLot}, {wo.WoStartDate}, {wo.WoRelDate},{wo.WOLine},{wo.WoStatus}, {wo.WoActivated}")
                        ;
                return Ok(vlmi);
            }
            catch (Exception e)
            {
                return StatusCode(404, "An error has occured.");
            }
        }

    }

}

public class NewWo
{
    public string WoNbr { get; set; } = ""; 
    public int WoPart { get; set; }
    public int WoQtyOrd { get; set; }
    public DateTime WoDueDate { get; set; }


}

public class UpdateWo: NewWo
{
    public int WoLot { get; set; }
    public string ?WOLine { get; set; } = "";
    public DateTime ?WoStartDate { get; set; }
    public DateTime ?WoRelDate { get; set; }
    public bool ?WoActivated { get; set; } 
    public string ?WoStatus {get; set; } = "";
}