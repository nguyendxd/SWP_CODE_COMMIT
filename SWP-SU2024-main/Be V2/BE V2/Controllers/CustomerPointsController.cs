using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BE_V2.DataDB;
using System.Threading.Tasks;

namespace BE_V2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerPointsController : ControllerBase
    {
        private readonly DiamondShopV4Context _context;

        public CustomerPointsController(DiamondShopV4Context context)
        {
            _context = context;
        }

        // GET: api/CustomerPoints/{customerId}
        [HttpGet("{customerId}")]
        public async Task<IActionResult> GetCustomerPoints(int customerId)
        {
            try
            {
                var customerPoints = await _context.CustomerPoints.FirstOrDefaultAsync(cp => cp.CustomerID == customerId);
                if (customerPoints == null)
                {
                    return NotFound(new { message = "Customer not found" });
                }

                return Ok(customerPoints);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // PUT: api/CustomerPoints/{customerId}
        [HttpPut("{customerId}")]
        public async Task<IActionResult> UpdatePoints(int customerId, [FromBody] ManualPointsRequest request)
        {
            try
            {
                var customerPoints = await _context.CustomerPoints.FirstOrDefaultAsync(cp => cp.CustomerID == customerId);
                if (customerPoints == null)
                {
                    return NotFound(new { message = "Customer points record not found" });
                }

                customerPoints.Points = request.Points;
                customerPoints.LastUpdated = DateTime.Now;

                _context.CustomerPoints.Update(customerPoints);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Points updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // POST: api/CustomerPoints
        [HttpPost]
        public async Task<IActionResult> AddPoints([FromBody] ManualPointsRequest request)
        {
            try
            {
                var customerPoints = await _context.CustomerPoints.FirstOrDefaultAsync(cp => cp.CustomerID == request.CustomerId);
                if (customerPoints == null)
                {
                    customerPoints = new CustomerPoints
                    {
                        CustomerID = request.CustomerId,
                        Points = request.Points,
                        LastUpdated = DateTime.Now
                    };
                    _context.CustomerPoints.Add(customerPoints);
                }
                else
                {
                    customerPoints.Points += request.Points;
                    customerPoints.LastUpdated = DateTime.Now;
                    _context.CustomerPoints.Update(customerPoints);
                }

                await _context.SaveChangesAsync();

                return Ok(new { message = "Points added/updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // DELETE: api/CustomerPoints/{customerId}
        [HttpDelete("{customerId}")]
        public async Task<IActionResult> DeletePoints(int customerId)
        {
            try
            {
                var customerPoints = await _context.CustomerPoints.FirstOrDefaultAsync(cp => cp.CustomerID == customerId);
                if (customerPoints == null)
                {
                    return NotFound(new { message = "Customer points record not found" });
                }

                _context.CustomerPoints.Remove(customerPoints);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Points deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }

    public class ManualPointsRequest
    {
        public int CustomerId { get; set; }
        public int Points { get; set; }
    }
}
