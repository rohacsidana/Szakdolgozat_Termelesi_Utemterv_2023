using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UtemtervBackend.Models;

namespace UtemtervBackend.Controllers
{
    [Route("api/chg")]
    [ApiController]
    public class ChgController : ControllerBase
    {

        UtemtervContext _context;
        public ChgController(UtemtervContext context)
        {
            _context = context;
        }

        [EnableCors]
        [HttpGet("list")]

        public IActionResult ChgList()
        {
            try
            {
                var chgList = _context.ChgMstrs.ToList();

                if (chgList.Count() == 0)
                {
                    return NotFound("Chg master not found.");
                }

                return Ok(chgList);

            }
            catch (Exception e)
            {
                return StatusCode(404, e);
            }

        }
    }
}
