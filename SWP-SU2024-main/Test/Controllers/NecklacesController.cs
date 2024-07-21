using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Test.DataDB;

[Route("api/[controller]")]
[ApiController]
public class NecklacesController : ControllerBase
{
    private readonly DiamondShopV1Context _context;

    public NecklacesController(DiamondShopV1Context context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Necklace>>> GetNecklaces()
    {
        return await _context.Necklaces.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Necklace>> GetNecklace(int id)
    {
        var necklace = await _context.Necklaces.FindAsync(id);

        if (necklace == null)
        {
            return NotFound();
        }
        return necklace;
    }

    [HttpPost]
    public async Task<ActionResult<Necklace>> PostNecklace(Necklace necklace)
    {
        _context.Necklaces.Add(necklace);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            if (NecklaceExists(necklace.NecklacesId))
            {
                return Conflict();
            }
            else
            {
                throw;
            }
        }

        return CreatedAtAction("GetNecklace", new { id = necklace.NecklacesId }, necklace);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutNecklace(int id, Necklace necklace)
    {
        if (id != necklace.NecklacesId)
        {
            return BadRequest();
        }

        _context.Entry(necklace).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!NecklaceExists(id))
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
    public async Task<IActionResult> DeleteNecklace(int id)
    {
        var necklace = await _context.Necklaces.FindAsync(id);
        if (necklace == null)
        {
            return NotFound();
        }

        _context.Necklaces.Remove(necklace);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool NecklaceExists(int id)
    {
        return _context.Necklaces.Any(e => e.NecklacesId == id);
    }
}
