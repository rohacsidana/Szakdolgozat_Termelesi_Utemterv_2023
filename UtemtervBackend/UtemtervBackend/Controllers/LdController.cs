using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
                if (ldList.Count() == 0 )
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





        public class Ld
        {
            public int LdPart { get; set; }
            public DateTime LdExpire { get; set; }

        }
        public class NewLd : Ld
        {
            public float LdQtyOh { get; set; }

        }
        public class UpdateLd : NewLd
        {
            public float LdQtyRsrv { get; set; }
            public float LdQtyScrp { get; set; }
        }
    }
    

    
}
