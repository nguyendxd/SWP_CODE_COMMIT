using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using BE_V2.DataDB;

namespace BE_V2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PriceDetailController : ControllerBase
    {
        private readonly DiamondShopV4Context _context;

        public PriceDetailController(DiamondShopV4Context context)
        {
            _context = context;
        }

        // POST: api/PriceDetail
        [HttpPost]
        public async Task<ActionResult<PriceDetail>> CreatePriceDetail([FromBody] PriceDetail priceDetail)
        {
        
            _context.PriceDetails.Add(priceDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPriceDetail), new { id = priceDetail.PriceDetailID }, priceDetail);
        }

        // GET: api/PriceDetail/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PriceDetail>> GetPriceDetail(int id)
        {
            var priceDetail = await _context.PriceDetails.FindAsync(id);

            if (priceDetail == null)
            {
                return NotFound();
            }

            return priceDetail;
        }
    }
}
