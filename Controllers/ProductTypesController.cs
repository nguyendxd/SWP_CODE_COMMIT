using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore;
using SWP_SU4.DataDB;

namespace SWP_SU4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductTypesController : ControllerBase
    {
        private readonly DiamondShopContext _context;

        public ProductTypesController(DiamondShopContext context)
        {
            _context = context;
        }

        // GET: api/ProductTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductType>>> GetProductTypes()
        {
            return await _context.ProductTypes.ToListAsync();
        }

        // GET: api/ProductTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductType>> GetProductType(int id)
        {
            var productType = await _context.ProductTypes.FindAsync(id);

            if (productType == null)
            {
                return NotFound();
            }

            return productType;
        }
        [HttpGet("{name}")]
        public async Task<ActionResult<IEnumerable<ProductType>>> GetProductTypeName (string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest("Product type mustn't be blank");
            }
            var ptype = await _context.ProductTypes
                .Where (t => t.ProductTypeName.Contains(name))
                .ToListAsync();
            if (ptype == null || ptype.Count == 0)
            {
                return NotFound("There's no product type");
            }
            return Ok(ptype);
        }
        // PUT: api/ProductTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductType(int id, ProductType productType)
        {
            if (id != productType.ProductTypeId)
            {
                return BadRequest();
            }

            _context.Entry(productType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductTypeExists(id))
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

        // POST: api/ProductTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductType>> PostProductType(ProductType productType)
        {
            if (productType == null)
            {
                return BadRequest("Product type musn't blank");
            }
            if (productType.ProductTypeId != null && !CheckValidType.ProductTypeIsValid(productType.ProductTypeName))
            {
                return BadRequest("Product type name must not contain special characters");
            }

            _context.ProductTypes.Add(productType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductType", new { id = productType.ProductTypeId }, productType);
        }

        // DELETE: api/ProductTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductType(int id)
        {
            var productType = await _context.ProductTypes.FindAsync(id);
            if (productType == null)
            {
                return NotFound();
            }

            _context.ProductTypes.Remove(productType);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool ProductTypeNameExist (string productTypeName)
        {
            return _context.ProductTypes.Any(x => x.ProductTypeName == productTypeName);
        }
        private bool ProductTypeExists(int id)
        {
            return _context.ProductTypes.Any(e => e.ProductTypeId == id);
        }
        public static class CheckValidType
        {
            private static readonly Regex ValidationProductTypeName = new Regex("^[a-z A-Z 0-9]*$", RegexOptions.Compiled);
            public static bool ProductTypeIsValid(string productTypeName)
            {
                return ValidationProductTypeName.IsMatch(productTypeName);
            }
        }

    }
}
