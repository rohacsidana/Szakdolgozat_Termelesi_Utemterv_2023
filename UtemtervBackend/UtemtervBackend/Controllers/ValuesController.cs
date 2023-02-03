using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UtemtervBackend.Models;

namespace UtemtervBackend.Controllers
{
    [EnableCors]
    [Route("pt")]
    [ApiController]
    public class PtController : ControllerBase
    {
        UtemtervContext _context;

        public PtController(UtemtervContext context)
        {
            _context = context;
        }

        [EnableCors]
        [HttpGet("list")]

        public IActionResult PtList()
        {
            try
            {
                var ptList = _context.PtMstrs.ToList();

                if(ptList.Count() == 0)
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

        [EnableCors]
        [HttpPost("new")]
    }
}
