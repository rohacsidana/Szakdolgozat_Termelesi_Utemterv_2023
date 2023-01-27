using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UtemtervBackend.Controllers
{
    [EnableCors]
    [Route("wod")]
    [ApiController]
    public class WodController : ControllerBase
    {

        [HttpGet("{lot}")]
        public IActionResult allWodSP(int lot)
        {
            return Ok();
        }
    }
}
