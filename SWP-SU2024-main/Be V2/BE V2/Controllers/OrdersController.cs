using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BE_V2.DataDB;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace BE_V2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly DiamondShopV4Context _context;

        public OrdersController(DiamondShopV4Context context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(OrderDTO orderDTO)
        {
            Console.WriteLine($"Received order request for UserID: {orderDTO.UserID} with TotalPrice: {orderDTO.TotalPrice}");

            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.UserId == orderDTO.UserID);
            if (customer == null)
            {
                Console.WriteLine("Customer not found.");
                return NotFound("Customer not found.");
            }

            var customerPoints = await _context.CustomerPoints.FirstOrDefaultAsync(cp => cp.CustomerID == customer.CustomerId);
            decimal discount = 0;
            bool pointsUsed = false;

            // Check if points are being used and if the customer has enough points
            if (orderDTO.UsePoints && customerPoints != null && customerPoints.Points >= orderDTO.PointsToUse)
            {
                discount = orderDTO.PointsToUse * 0.0005m; // 0.05% per point
                customerPoints.Points -= orderDTO.PointsToUse; // Deduct points
                _context.CustomerPoints.Update(customerPoints);
                pointsUsed = true;
                Console.WriteLine($"Points used: {orderDTO.PointsToUse}, Discount applied: {discount}");
            }

            var discountedTotalPrice = orderDTO.TotalPrice * (1 - discount);

            var order = new Order
            {
                CustomerId = customer.CustomerId,
                TotalPrice = discountedTotalPrice,
                OrderDate = DateOnly.FromDateTime(orderDTO.OrderDate)
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            Console.WriteLine($"Order created with ID: {order.OrderId}, TotalPrice after discount: {order.TotalPrice}");

            var orderDetails = orderDTO.OrderDetails.Select(detail => new OrderDetail
            {
                OrderId = order.OrderId,
                ProductId = detail.ProductId,
                ProductName = detail.ProductName,
                ProductPrice = detail.ProductPrice,
                Quantity = detail.Quantity
            }).ToList();

            _context.OrderDetails.AddRange(orderDetails);
            await _context.SaveChangesAsync();

            Console.WriteLine("Order details saved.");

            // Create an OrderLog entry
            var orderLog = new OrderLog
            {
                OrderID = order.OrderId,
                Phase1 = false,
                TimePhase1 = DateTime.UtcNow
            };
            _context.OrderLogs.Add(orderLog);
            await _context.SaveChangesAsync();

            Console.WriteLine("Order log created.");

            // Allocate points based on the purchase amount, only if points were not used for discount
            if (!pointsUsed)
            {
                var pointsEarned = (int)(orderDTO.TotalPrice / 10_000_000); // 1 point per 10 million VND
                if (customerPoints == null)
                {
                    customerPoints = new CustomerPoints
                    {
                        CustomerID = customer.CustomerId,
                        Points = pointsEarned,
                        LastUpdated = DateTime.Now
                    };
                    _context.CustomerPoints.Add(customerPoints);
                }
                else
                {
                    customerPoints.Points += pointsEarned;
                    customerPoints.LastUpdated = DateTime.Now;
                    _context.CustomerPoints.Update(customerPoints);
                }
                Console.WriteLine($"Points earned: {pointsEarned}, Total points: {customerPoints.Points}");
            }

            await _context.SaveChangesAsync();

            // Clear the cart after successful order creation
            var cart = await _context.Carts.Include(c => c.CartItems).FirstOrDefaultAsync(c => c.UserID == orderDTO.UserID);
            if (cart != null)
            {
                _context.CartItems.RemoveRange(cart.CartItems);
                _context.Carts.Remove(cart);
                await _context.SaveChangesAsync();
            }

            Console.WriteLine("Cart cleared after order creation.");

            return CreatedAtAction(nameof(GetOrder), new { id = order.OrderId }, new
            {
                order.OrderId,
                order.CustomerId,
                order.TotalPrice,
                order.OrderDate,
                OrderDetails = orderDetails
            });
        }





        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderDetails)
                .FirstOrDefaultAsync(o => o.OrderId == id);

            if (order == null)
            {
                return NotFound();
            }

            var totalOrderDetailPrice = order.OrderDetails.Sum(od => od.ProductPrice * od.Quantity);
            var discountPercentage = 0m;
            if (totalOrderDetailPrice > order.TotalPrice)
            {
                discountPercentage = (1m - (decimal)(order.TotalPrice / totalOrderDetailPrice)) * 100m;
            }

            var result = new
            {
                order.OrderId,
                order.CustomerId,
                order.TotalPrice,
                order.OrderDate,
                DiscountPercentage = discountPercentage,
                OrderDetails = order.OrderDetails.Select(od => new
                {
                    od.OrderDetailId,
                    od.ProductId,
                    od.ProductName,
                    od.ProductPrice,
                    od.Quantity
                })
            };

            return Ok(result);
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.OrderDetails)
                .Include(o => o.OrderLogs)
                .ToListAsync();

            var orderResults = orders.Select(order =>
            {
                var totalOrderDetailPrice = order.OrderDetails.Sum(od => od.ProductPrice * od.Quantity);
                var discountPercentage = 0m;
                if (totalOrderDetailPrice > order.TotalPrice)
                {
                    discountPercentage = (1m - (decimal)(order.TotalPrice / totalOrderDetailPrice)) * 100m;
                }

                return new
                {
                    order.OrderId,
                    order.CustomerId,
                    order.TotalPrice,
                    order.OrderDate,
                    DiscountPercentage = discountPercentage,
                    OrderDetails = order.OrderDetails.Select(od => new
                    {
                        od.OrderDetailId,
                        od.ProductId,
                        od.ProductName,
                        od.ProductPrice,
                        od.Quantity
                    }),
                    OrderLogs = order.OrderLogs.Select(log => new
                    {
                        log.LogID,
                        log.OrderID,
                        log.Phase1,
                        log.Phase2,
                        log.Phase3,
                        log.Phase4,
                        log.TimePhase1,
                        log.TimePhase2,
                        log.TimePhase3,
                        log.TimePhase4
                    })
                };
            });

            return Ok(orderResults);
        }
    }

    public class OrderDTO
    {
        public int UserID { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime OrderDate { get; set; }
        public bool UsePoints { get; set; }
        public int PointsToUse { get; set; }
        public List<OrderDetailDTO> OrderDetails { get; set; }
    }

    public class OrderDetailDTO
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal ProductPrice { get; set; }
        public int Quantity { get; set; }
    }
}
