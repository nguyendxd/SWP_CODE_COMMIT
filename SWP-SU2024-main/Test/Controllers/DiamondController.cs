using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Test.DataDB;
using Newtonsoft.Json; // Add this line

[Route("api/[controller]")]
[ApiController]
public class DiamondsController : ControllerBase
{
    private readonly DiamondShopV1Context _context;

    public DiamondsController(DiamondShopV1Context context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Diamond>>> GetDiamonds()
    {
        return await _context.Diamonds.ToListAsync();
    }

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

    [HttpPost]
    public async Task<ActionResult<Diamond>> PostDiamond(Diamond diamond)
    {
        _context.Diamonds.Add(diamond);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            if (DiamondExists(diamond.DiamondId))
            {
                return Conflict();
            }
            else
            {
                throw;
            }
        }

        return CreatedAtAction("GetDiamond", new { id = diamond.DiamondId }, diamond);
    }

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

    private bool DiamondExists(int id)
    {
        return _context.Diamonds.Any(e => e.DiamondId == id);
    }
}
