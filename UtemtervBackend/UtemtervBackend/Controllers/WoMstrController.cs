using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UtemtervBackend.Models;

namespace UtemtervBackend.Controllers
{
    [EnableCors]
    [Route("workoder")]
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
                    return NotFound("Workoder not found.");
                }
                return Ok(woList);
            }
            catch (Exception)
            {

                return StatusCode(500, "An Error has occured.");
            }
        }
        
        
    }
}
