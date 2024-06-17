using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SWP_SU4.DataDB;

namespace SWP_SU4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiamondsController : ControllerBase
    {
        private readonly DiamondShopContext _context;

        public DiamondsController(DiamondShopContext context)
        {
            _context = context;
        }

        // GET: api/Diamonds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Diamond>>> GetDiamonds()
        {
            return await _context.Diamonds.ToListAsync();
        }

        // GET: api/Diamonds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Diamond>> GetDiamond(int id)
        {
            var diamond = await _context.Diamonds.FindAsync(id);

            if (diamond == null)
            {
                return NotFound();
            }

            return diamond;
        }

        // PUT: api/Diamonds/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDiamond(int id, Diamond diamond)
        {
            if (id != diamond.DiamondId)
            {
                return BadRequest();
            }

            _context.Entry(diamond).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DiamondExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Diamonds
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Diamond>> PostDiamond(Diamond diamond)
        {
            if (diamond == null)
            {
                return BadRequest("Diamond can't be blank");
            }
            if (diamond.DiamondId != null && diamond.DiamondId.ToString().Contains(" "))
            {
                return BadRequest("Diamond ID cannot contains space character");
            }
            
            _context.Diamonds.Add(diamond);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetDiamond", new { id = diamond.DiamondId }, diamond);
        }

        // DELETE: api/Diamonds/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDiamond(int id)
        {
            var diamond = await _context.Diamonds.FindAsync(id);
            if (diamond == null)
            {
                return NotFound();
            }

            _context.Diamonds.Remove(diamond);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // SEARCH:
        [HttpGet("SearchByID/{id}")]
        public async Task<ActionResult> SearchID(int? id)
        {
            if (id == null)
            {
                return BadRequest("ID mustn't blank");
            }
            var diamond = await _context.Diamonds
                .Include(a => a.Products).FirstOrDefaultAsync(a => a.DiamondId == id.Value);
            if (diamond == null)
            {
                return NotFound();
            }
            return Ok(diamond);
        }
        [HttpGet("SearchByName/{name}")]
        public async Task<ActionResult<IEnumerable<Diamond>>> SearchName(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest("Name mustn't blank");
            }
            var product = await _context.Products
                .Where(p => p.ProductName.Contains(name))
                .ToListAsync();
            if (product == null || product.Count == 0)
            {
                return NotFound();
            }
            return Ok(product);
        }
        private bool DiamondExists(int id)
        {
            return _context.Diamonds.Any(e => e.DiamondId == id);
        }
    }
}
