using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text.Json.Serialization;
using System.Xml.Linq;
using UtemtervBackend.Models;

namespace UtemtervBackend.Controllers
{
    [EnableCors]
    [Route("api/workorder")]
    [ApiController]
    [Authorize]
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
                    return NotFound("WO_NOT_FOUND");
                }
                return Ok(woList);
            }
            catch (Exception)
            {

                return StatusCode(500, "UNKNOWN_ERROR");
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
                    return NotFound("WO_NOT_FOUND");
                }
                return Ok(wo);
            }
            catch (Exception)
            {

                return StatusCode(404, "UNKNOWN_ERROR");
            }
            return Ok();
        }

        [HttpPost("new")]
        public IActionResult newWo([FromBody] NewWo wo)
        {
            
            try
           {
                //var vlmi =  _context.Database.ExecuteSqlInterpolated($"newWo {wo.WoNbr}, {wo.WoPart}, {wo.WoQtyOrd}, {wo.WoDueDate}");
                var vlmi =  _context.WoMstrs.FromSqlInterpolated($"newWo {wo.WoNbr}, {wo.WoPart}, {wo.WoQtyOrd}, {wo.WoDueDate}, {User.FindFirstValue(ClaimTypes.Name)}").ToList();
                if (vlmi.IsNullOrEmpty()) {
                    return StatusCode(500, "UNKNOWN_ERROR");
                }
                else { 
                    return Ok(vlmi);
                }
            }
            catch (Exception)
            {

                return StatusCode(404, "UNKNOWN_ERROR");
            }
        }

        [HttpPut("update")]
        public IActionResult UpdateWo([FromBody] UpdateWo wo)
        {
            try
            {
                var vlmi = _context.WoMstrs
                        .FromSqlInterpolated($"updateWo {wo.WoNbr}, {wo.WoPart}, {wo.WoQtyOrd}, {wo.WoDueDate}, {wo.WoLot}, {wo.WoStartDate}, {wo.WoRelDate},{wo.WOLine},{wo.WoStatus}, {wo.WoActivated}");
                    return Ok(vlmi);

                    
            }
            catch (Exception)
            {
                return StatusCode(404, "UNKNOWN_ERROR");
            }
        }


        [HttpDelete("delete/{lot}")]
        public IActionResult DeleteWo(int lot)
        {
            try
            {
                var rowsAffected = _context.Database.ExecuteSqlRaw($"woDelete {lot}");
                if(rowsAffected > 0)
                {
                    return Ok(rowsAffected);
                }
                return StatusCode(500, "STATUS_ERROR");
            }
            catch (Exception)
            {

                return StatusCode(404, "UNKNOWN_ERROR");
            }
        }


        [HttpGet("prodsch/{line}/{week}")]
        public IActionResult GetUtemezhetoWo(string line, int week)
        {
            try
            {
                var wos = _context.HetiUtemtervs.FromSqlRaw($"getHetiUtemterv {week}, {line}").ToList();
                if (wos.Count() > 0)
                {
                    return Ok(wos);

                }
                return NotFound("NO_WO_FOUND");
            }
            catch (Exception)
            {

                return StatusCode(500, "UNKNOWN_ERROR");
            }
        }

        [HttpPatch("prodsch/{lot}/{seq}")]
        public IActionResult SetWoSeq(int lot, int seq)
        {
            try
            {
            var res = _context.Database.ExecuteSqlRaw($"updateWoSeq {lot}, {seq}");
            return Ok(res);

            }
            catch (Exception)
            {

                return StatusCode(500, "SEQ_ERROR");
            }
        }

        [HttpPatch("prodsch")]
        public IActionResult ScheduleWo([FromBody] ProdSch prod)
        {
            try
            {
                var res = _context.HetiUtemtervs.FromSqlInterpolated($"scheduleWo {prod.Week}, {prod.WoLine}, {prod.StartTime}");
                 
                return Ok(res);

            }
            catch (Exception)
            {

                return StatusCode(500, "SEQ_ERROR");
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

public class ProdSch
{
    public int Week { get; set; }
    public string WoLine { get; set; }
    public string StartTime { get; set; }
}