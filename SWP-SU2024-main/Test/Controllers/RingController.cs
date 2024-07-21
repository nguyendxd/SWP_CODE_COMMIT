using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Test.DataDB;

[Route("api/[controller]")]
[ApiController]
public class RingsController : ControllerBase
{
    private readonly DiamondShopV1Context _context;

    public RingsController(DiamondShopV1Context context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Ring>>> GetRings()
    {
        return await _context.Rings.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Ring>> GetRing(int id)
    {
        var ring = await _context.Rings.FindAsync(id);

        if (ring == null)
        {
            return NotFound();
        }

        return ring;
    }

    [HttpPost]
    public async Task<ActionResult<Ring>> PostRing(Ring ring)
    {
        _context.Rings.Add(ring);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            if (RingExists(ring.RingId))
            {
                return Conflict();
            }
            else
            {
                throw;
            }
        }

        return CreatedAtAction("GetRing", new { id = ring.RingId }, ring);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutRing(int id, Ring ring)
    {
        if (id != ring.RingId)
        {
            return BadRequest();
        }

        _context.Entry(ring).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!RingExists(id))
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

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRing(int id)
    {
        var ring = await _context.Rings.FindAsync(id);
        if (ring == null)
        {
            return NotFound();
        }

        _context.Rings.Remove(ring);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool RingExists(int id)
    {
        return _context.Rings.Any(e => e.RingId == id);
    }
}
