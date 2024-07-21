using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Test.DataDB;

[Route("api/[controller]")]
[ApiController]
public class JewelryController : ControllerBase
{
    private readonly DiamondShopV1Context _context;

    public JewelryController(DiamondShopV1Context context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Jewelry>>> GetJewelry()
    {
        return await _context.Jewelries.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Jewelry>> GetJewelry(int id)
    {
        var jewelry = await _context.Jewelries.FindAsync(id);

        if (jewelry == null)
        {
            return NotFound();
        }

        return jewelry;
    }

    [HttpPost]
    public async Task<ActionResult<Jewelry>> PostJewelry(Jewelry jewelry)
    {
        _context.Jewelries.Add(jewelry);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetJewelry", new { id = jewelry.JewelryId }, jewelry);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutJewelry(int id, Jewelry jewelry)
    {
        if (id != jewelry.JewelryId)
        {
            return BadRequest();
        }

        _context.Entry(jewelry).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!JewelryExists(id))
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
    public async Task<IActionResult> DeleteJewelry(int id)
    {
        var jewelry = await _context.Jewelries.FindAsync(id);
        if (jewelry == null)
        {
            return NotFound();
        }

        _context.Jewelries.Remove(jewelry);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool JewelryExists(int id)
    {
        return _context.Jewelries.Any(e => e.JewelryId == id);
    }
}
