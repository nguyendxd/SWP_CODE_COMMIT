using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SWP_SU4.DataDB;

namespace SWP_SU4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly DiamondShopContext _context;

        public ProductsController(DiamondShopContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.ProductId)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            if (product == null)
            {
                return BadRequest("Product data can't be blank");
            }

            if (product.ProductName!=null && product.ProductId.ToString().Contains(" "))
            {
                return BadRequest("Product cannot contain space characters");
            }

            if (product.ProductName != null && !CheckValid.ProductNameIsValid(product.ProductName))
            {
                return BadRequest("Product name must not contain special character");
            }
            if (NameExists(product.ProductName))
            {
                return BadRequest($"Product {product.ProductName} are ready exist");
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // SEARCH: api/Products/SearchByID/5
        [HttpGet("SearchByID/{id}")]
        public async Task<ActionResult> SearchID(int? id)
        {
            if (id == null)
            {
                return BadRequest("ID must not be blank");
            }
            var product = await _context.Products
                .FirstOrDefaultAsync(a => a.ProductId == id.Value);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        // SEARCH: api/Products/SearchByName/productName
        [HttpGet("SearchByName/{name}")]
        public async Task<ActionResult<IEnumerable<Product>>> SearchName(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest("Name must not be blank");
            }
            var products = await _context.Products
                .Where(p => p.ProductName.Contains(name))
                .ToListAsync();
            if (products == null || products.Count == 0)
            {
                return NotFound();
            }
            return Ok(products);
        }

        // FILTER: api/Products/FilterByPrice/min/max
        [HttpGet("FilterByPrice/{min}/{max}")]
        public async Task<ActionResult<IEnumerable<Product>>> FilterByPrice(decimal? min, decimal? max)
        {
            if (min == null || max == null)
            {
                return BadRequest("Min and Max price can't be blank");
            }

            var products = _context.Products.AsQueryable();

            if (min.HasValue && max.HasValue)
            {
                products = products.Where(p => p.Price >= min.Value && p.Price <= max.Value);
            }

            var filteredProducts = await products.ToListAsync();
            if (filteredProducts == null || filteredProducts.Count == 0)
            {
                return NotFound("Can't find products in the specified price range");
            }

            return Ok(filteredProducts);
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
        private bool NameExists (string productName)
        {
            return _context.Products.Any(p =>p.ProductName== productName);
        }

        public static class CheckValid
        {
            private static readonly Regex ValidProductName = new Regex("^[a-zA-Z0-9]*$", RegexOptions.Compiled); // Chứa chữ thường, chữ hoa và chữ số

            public static bool ProductNameIsValid(string productName)
            {
                return ValidProductName.IsMatch(productName);
            }
        }
    }
}
