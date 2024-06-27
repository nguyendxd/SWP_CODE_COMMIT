using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BE_V2.DataDB;

namespace BE_V2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly DiamondShopV4Context _context;

        public EventsController(DiamondShopV4Context context)
        {
            _context = context;
        }

        // GET: api/Events
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            return await _context.Events.ToListAsync();
        }

        // GET: api/Events/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
            var @event = await _context.Events.Include(e => e.EventItems)//bao gom cac muc lien quan
                                              .ThenInclude(ei => ei.Product)
                                              .FirstOrDefaultAsync(e => e.EventID == id);//tim kiem su kie theo id

            if (@event == null)
            {
                return NotFound();
            }

            return @event;
        }

        // PUT: api/Events/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(int id, [FromBody] Event @event)
        {
            if (id != @event.EventID)
            {
                return BadRequest();
            }

            _context.Entry(@event).State = EntityState.Modified;//đánh dấu sự kiện đã chỉnh sửa

            try
            {
                await _context.SaveChangesAsync();//luu thay doi
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(id))
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

        // POST: api/Events
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent(Event @event)
        {
            _context.Events.Add(@event);// them su kien vao db context
            await _context.SaveChangesAsync();// luu thay doi

            return CreatedAtAction("GetEvent", new { id = @event.EventID }, @event);//tra ve su kien moi duoc tao
        }

        // DELETE: api/Events/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var @event = await _context.Events
                                       .Include(e => e.EventItems)
                                       .FirstOrDefaultAsync(e => e.EventID == id);

            if (@event == null)
            {
                return NotFound();
            }
            foreach (var eventItem in @event.EventItems)
            {
                var product = await _context.Products.FindAsync(eventItem.ProductID);
                if (product != null)
                {
                    //tinh toan lai gia san pham 
                    product.Price = product.Price / (1 - (eventItem.Discount / 100));
                }
            }
            _context.Events.Remove(@event);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventExists(int id)
        {
            return _context.Events.Any(e => e.EventID == id);
        }
    }
}
