using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BE_V2.DataDB;
using BE_V2.DTOs;

namespace BE_V2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderLogsController : ControllerBase
    {
        private readonly DiamondShopV4Context _context;

        public OrderLogsController(DiamondShopV4Context context)
        {
            _context = context;
        }

        // GET: api/OrderLogs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderLogDTO>>> GetOrderLogs()
        {
            var orderLogs = await _context.OrderLogs.ToListAsync();
            var orderLogDTOs = orderLogs.Select(ol => new OrderLogDTO
            {
                OrderID = ol.OrderID,
                Phase1 = ol.Phase1,
                Phase2 = ol.Phase2,
                Phase3 = ol.Phase3,
                Phase4 = ol.Phase4,
                PhaseTime = ol.PhaseTime
            }).ToList();

            return Ok(orderLogDTOs);
        }

        // GET: api/OrderLogs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderLogDTO>> GetOrderLog(int id)
        {
            var orderLog = await _context.OrderLogs.FindAsync(id);

            if (orderLog == null)
            {
                return NotFound();
            }

            var orderLogDTO = new OrderLogDTO
            {
                OrderID = orderLog.OrderID,
                Phase1 = orderLog.Phase1,
                Phase2 = orderLog.Phase2,
                Phase3 = orderLog.Phase3,
                Phase4 = orderLog.Phase4,
                PhaseTime = orderLog.PhaseTime
            };

            return Ok(orderLogDTO);
        }

        // PUT: api/OrderLogs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrderLog(int id, OrderLogDTO orderLogDTO)
        {
            var orderLog = await _context.OrderLogs.FindAsync(id);
            if (orderLog == null)
            {
                return NotFound();
            }

            orderLog.Phase1 = orderLogDTO.Phase1;
            orderLog.Phase2 = orderLogDTO.Phase2;
            orderLog.Phase3 = orderLogDTO.Phase3;
            orderLog.Phase4 = orderLogDTO.Phase4;
            orderLog.PhaseTime = orderLogDTO.PhaseTime;

            _context.Entry(orderLog).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderLogExists(id))
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

        // POST: api/OrderLogs
        [HttpPost]
        public async Task<ActionResult<OrderLogDTO>> CreateOrderLog(OrderLogDTO orderLogDTO)
        {
            // Check if the OrderID exists in the Orders table
            var orderExists = await _context.Orders.AnyAsync(o => o.OrderId == orderLogDTO.OrderID);
            if (!orderExists)
            {
                return BadRequest("OrderID does not exist.");
            }

            var orderLog = new OrderLog
            {
                OrderID = orderLogDTO.OrderID,
                Phase1 = orderLogDTO.Phase1,
                Phase2 = orderLogDTO.Phase2,
                Phase3 = orderLogDTO.Phase3,
                Phase4 = orderLogDTO.Phase4,
                PhaseTime = DateTime.Now
            };

            _context.OrderLogs.Add(orderLog);
            await _context.SaveChangesAsync();

            orderLogDTO.PhaseTime = orderLog.PhaseTime;

            return CreatedAtAction(nameof(GetOrderLog), new { id = orderLog.LogID }, orderLogDTO);
        }

        // DELETE: api/OrderLogs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderLog(int id)
        {
            var orderLog = await _context.OrderLogs.FindAsync(id);
            if (orderLog == null)
            {
                return NotFound();
            }

            _context.OrderLogs.Remove(orderLog);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderLogExists(int id)
        {
            return _context.OrderLogs.Any(e => e.LogID == id);
        }
    }
}
