using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BE_V2.DataDB;
using Newtonsoft.Json;

namespace BE_V2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly DiamondShopV4Context _context;

        public ProductsController(DiamondShopV4Context context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products
                .Include(p => p.MainDiamond)
                .Include(p => p.SecondaryDiamond)
                .Include(p => p.ProductTypeNavigation)
                .Include(p => p.RingMold)
                .Include(p => p.NecklaceMold)
                .ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(p => p.MainDiamond)
                .Include(p => p.SecondaryDiamond)
                .Include(p => p.ProductTypeNavigation)
                .Include(p => p.RingMold)
                .Include(p => p.NecklaceMold)
                .FirstOrDefaultAsync(p => p.ProductId == id);

            if (product == null)
            {
                return NotFound();
            }

            // Calculate and set the final price
            var finalPrice = CalculateFinalPrice(product);

            // Return product and final price
            return Ok(new
            {
                product = product,
                finalPrice = finalPrice
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.ProductId)
            {
                return BadRequest();
            }

            // Check if related entities exist
            if (product.ProductType != null && !_context.ProductTypes.Any(pt => pt.ProductTypeId == product.ProductType))
            {
                return BadRequest("Invalid ProductType.");
            }

            if (product.MainDiamondId != null && !_context.Diamonds.Any(d => d.DiamondId == product.MainDiamondId))
            {
                return BadRequest("Invalid MainDiamondId.");
            }

            if (product.SecondaryDiamondId != null && !_context.Diamonds.Any(d => d.DiamondId == product.SecondaryDiamondId))
            {
                return BadRequest("Invalid SecondaryDiamondId.");
            }

            if (product.ProductType == 2 && product.RingMoldId != null && !_context.RingMold.Any(rm => rm.RingMoldId == product.RingMoldId))
            {
                return BadRequest("Invalid RingMoldId.");
            }

            if (product.ProductType == 3 && product.NecklaceMoldId != null && !_context.NecklaceMold.Any(nm => nm.NecklaceMoldId == product.NecklaceMoldId))
            {
                return BadRequest("Invalid NecklaceMoldId.");
            }

            if (product.ProductType == 2)
            {
                product.NecklaceMoldId = null;
            }
            else if (product.ProductType == 3)
            {
                product.RingMoldId = null;
            }

            // Calculate and set the final price
            product.Price = CalculateFinalPrice(product);

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

        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            // Validate the ProductType
            if (product.ProductType == null || !_context.ProductTypes.Any(pt => pt.ProductTypeId == product.ProductType))
            {
                return BadRequest("Invalid ProductType.");
            }

            // Validate MainDiamondId
            if (product.MainDiamondId != null && !_context.Diamonds.Any(d => d.DiamondId == product.MainDiamondId))
            {
                return BadRequest("Invalid MainDiamondId.");
            }

            // Validate SecondaryDiamondId
            if (product.SecondaryDiamondId != null && !_context.Diamonds.Any(d => d.DiamondId == product.SecondaryDiamondId))
            {
                return BadRequest("Invalid SecondaryDiamondId.");
            }

            // Validate MoldId based on ProductType
            if (product.ProductType == 2)
            {
                if (product.RingMoldId == null || !_context.RingMold.Any(rm => rm.RingMoldId == product.RingMoldId))
                {
                    return BadRequest("Invalid RingMoldId for Ring.");
                }
                product.NecklaceMoldId = null;
            }
            else if (product.ProductType == 3)
            {
                if (product.NecklaceMoldId == null || !_context.NecklaceMold.Any(nm => nm.NecklaceMoldId == product.NecklaceMoldId))
                {
                    return BadRequest("Invalid NecklaceMoldId for Necklace.");
                }
                product.RingMoldId = null;
            }

            // Calculate and set the final price
            product.Price = CalculateFinalPrice(product);

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

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }

        public decimal CalculateFinalPrice(Product product)
        {
            // Fetch prices
            decimal moldPrice = 0;
            decimal mainDiamondPrice = 0;
            decimal secondaryDiamondPrice = 0;

            if (product.ProductType == 2 && product.RingMoldId != null)
            {
                var ringMold = _context.RingMold.Find(product.RingMoldId);
                if (ringMold != null)
                {
                    moldPrice = ringMold.BasePrice;
                    Console.WriteLine($"Ring Mold Price: {moldPrice}");
                }
            }
            else if (product.ProductType == 3 && product.NecklaceMoldId != null)
            {
                var necklaceMold = _context.NecklaceMold.Find(product.NecklaceMoldId);
                if (necklaceMold != null)
                {
                    moldPrice = necklaceMold.BasePrice;
                    Console.WriteLine($"Necklace Mold Price: {moldPrice}");
                }
            }

            if (product.MainDiamondId != null)
            {
                var mainDiamond = _context.Diamonds.Find(product.MainDiamondId);
                if (mainDiamond != null)
                {
                    var mainDiamondPriceEntry = _context.DiamondPriceTable
                        .FirstOrDefault(d => d.Carat == mainDiamond.CaratWeight && d.Color == mainDiamond.Color && d.Clarity == mainDiamond.Clarity && d.Cut == mainDiamond.Cut);
                    if (mainDiamondPriceEntry != null)
                    {
                        mainDiamondPrice = mainDiamondPriceEntry.Price;
                        Console.WriteLine($"Main Diamond Base Price: {mainDiamondPrice}");

                        switch (mainDiamond.Origin)
                        {
                            case "South Africa":
                                mainDiamondPrice *= 1.1m; // Apply 10% increase for South Africa
                                Console.WriteLine("Main Diamond Origin: South Africa, Adjusted Price: " + mainDiamondPrice);
                                break;
                            case "Russia":
                                mainDiamondPrice *= 1.2m; // Apply 20% increase for Russia
                                Console.WriteLine("Main Diamond Origin: Russia, Adjusted Price: " + mainDiamondPrice);
                                break;
                            case "Canada":
                                mainDiamondPrice *= 1.15m; // Apply 15% increase for Canada
                                Console.WriteLine("Main Diamond Origin: Canada, Adjusted Price: " + mainDiamondPrice);
                                break;
                            case "Botswana":
                                mainDiamondPrice *= 1.25m; // Apply 25% increase for Botswana
                                Console.WriteLine("Main Diamond Origin: Botswana, Adjusted Price: " + mainDiamondPrice);
                                break;
                            default:
                                break;
                        }
                    }
                }
            }

            if (product.SecondaryDiamondId != null)
            {
                var secondaryDiamond = _context.Diamonds.Find(product.SecondaryDiamondId);
                if (secondaryDiamond != null)
                {
                    var secondaryDiamondPriceEntry = _context.DiamondPriceTable
                        .FirstOrDefault(d => d.Carat == secondaryDiamond.CaratWeight && d.Color == secondaryDiamond.Color && d.Clarity == secondaryDiamond.Clarity && d.Cut == secondaryDiamond.Cut);
                    if (secondaryDiamondPriceEntry != null)
                    {
                        secondaryDiamondPrice = secondaryDiamondPriceEntry.Price;
                        Console.WriteLine($"Secondary Diamond Base Price: {secondaryDiamondPrice}");

                        switch (secondaryDiamond.Origin)
                        {
                            case "South Africa":
                                secondaryDiamondPrice *= 1.1m; // Apply 10% increase for South Africa
                                Console.WriteLine("Secondary Diamond Origin: South Africa, Adjusted Price: " + secondaryDiamondPrice);
                                break;
                            case "Russia":
                                secondaryDiamondPrice *= 1.2m; // Apply 20% increase for Russia
                                Console.WriteLine("Secondary Diamond Origin: Russia, Adjusted Price: " + secondaryDiamondPrice);
                                break;
                            case "Canada":
                                secondaryDiamondPrice *= 1.15m; // Apply 15% increase for Canada
                                Console.WriteLine("Secondary Diamond Origin: Canada, Adjusted Price: " + secondaryDiamondPrice);
                                break;
                            case "Botswana":
                                secondaryDiamondPrice *= 1.25m; // Apply 25% increase for Botswana
                                Console.WriteLine("Secondary Diamond Origin: Botswana, Adjusted Price: " + secondaryDiamondPrice);
                                break;
                            default:
                                break;
                        }
                    }
                }
            }

            Console.WriteLine($"Total Secondary Diamond Price: {secondaryDiamondPrice * (product.SecondaryDiamondCount ?? 0)}");

            // Calculate the final price
            decimal exchangeRateMultiplier = (product.ExchangeRate ?? 0) / 100 + 1;
            decimal finalPrice = (moldPrice + mainDiamondPrice + (secondaryDiamondPrice * (product.SecondaryDiamondCount ?? 0)) + (product.ProcessingPrice ?? 0)) * exchangeRateMultiplier;

            Console.WriteLine($"Subtotal before exchange rate: {moldPrice + mainDiamondPrice + (secondaryDiamondPrice * (product.SecondaryDiamondCount ?? 0)) + (product.ProcessingPrice ?? 0)}");
            Console.WriteLine($"Exchange Rate Multiplier: {exchangeRateMultiplier}");
            Console.WriteLine($"Final Price before rounding: {finalPrice}");

            finalPrice = Math.Floor(finalPrice / 100000) * 100000;
            Console.WriteLine($"Final Price after rounding: {finalPrice}");

            return finalPrice;
        }


        [HttpPost("CreateOrGetProductWithSize")]
        public async Task<ActionResult<Product>> CreateOrGetProductWithSize([FromBody] CreateOrGetProductWithSizeRequest request)
        {
            try
            {
                Console.WriteLine($"Received request for ProductId: {request.ProductId}, Size: {request.Size}");

                // Fetch the existing product
                var existingProduct = await _context.Products
                    .Include(p => p.MainDiamond)
                    .Include(p => p.SecondaryDiamond)
                    .Include(p => p.ProductTypeNavigation)
                    .Include(p => p.RingMold)
                    .Include(p => p.NecklaceMold)
                    .FirstOrDefaultAsync(p => p.ProductId == request.ProductId);

                if (existingProduct == null)
                {
                    Console.WriteLine("Product not found");
                    return NotFound();
                }

                if (existingProduct.ProductType == 1) // Diamond
                {
                    Console.WriteLine($"Returning existing diamond product with ID: {existingProduct.ProductId}");
                    return Ok(existingProduct);
                }

                // Convert size to decimal for price table lookup
                if (!decimal.TryParse(request.Size, out decimal sizeDecimal))
                {
                    Console.WriteLine("Invalid size format");
                    return BadRequest("Invalid size format.");
                }

                if (existingProduct.ProductType == 2) // Ring
                {
                    // Fetch the ring price based on the selected size
                    var ringPriceTable = await _context.RingPriceTable
                        .FirstOrDefaultAsync(rpt => rpt.Material == existingProduct.RingMold.Material &&
                                                    rpt.Size == sizeDecimal &&
                                                    rpt.CaratWeight == existingProduct.RingMold.CaratWeight);

                    if (ringPriceTable == null)
                    {
                        Console.WriteLine("Ring price for the selected size not found");
                        return NotFound("Ring price for the selected size not found.");
                    }

                    // Check if a ring mold with the requested size already exists
                    var existingRingMold = await _context.RingMold
                        .FirstOrDefaultAsync(rm => rm.Material == existingProduct.RingMold.Material &&
                                                    rm.CaratWeight == existingProduct.RingMold.CaratWeight &&
                                                    rm.Gender == existingProduct.RingMold.Gender &&
                                                    rm.RingType == existingProduct.RingMold.RingType &&
                                                    rm.Size == request.Size);

                    if (existingRingMold != null)
                    {
                        // Check if a product with the existing ring mold exists
                        var productWithExistingSize = await _context.Products
                            .FirstOrDefaultAsync(p => p.RingMoldId == existingRingMold.RingMoldId && p.ProductType == 2);

                        if (productWithExistingSize != null)
                        {
                            Console.WriteLine($"Returning existing ring product with ID: {productWithExistingSize.ProductId}");
                            return Ok(productWithExistingSize);
                        }
                        else
                        {
                            Console.WriteLine("Ring mold exists but no product for it yet");
                        }
                    }

                    // Create a new ring mold with the requested size if it doesn't exist
                    if (existingRingMold == null)
                    {
                        var newRingMold = new RingMold
                        {
                            Material = existingProduct.RingMold.Material,
                            CaratWeight = existingProduct.RingMold.CaratWeight,
                            Gender = existingProduct.RingMold.Gender,
                            RingType = existingProduct.RingMold.RingType,
                            BasePrice = ringPriceTable.BasePrice, // Use the dynamically fetched price
                            Size = request.Size
                        };

                        _context.RingMold.Add(newRingMold);
                        await _context.SaveChangesAsync();

                        existingRingMold = newRingMold;
                        Console.WriteLine($"New Ring Mold created with ID: {newRingMold.RingMoldId}");
                    }

                    // Create a new product with the existing or new ring mold
                    var newProduct = new Product
                    {
                        ProductName = existingProduct.ProductName,
                        ProductType = existingProduct.ProductType,
                        Material = existingProduct.Material,
                        Size = request.Size,
                        Description = existingProduct.Description,
                        Price = CalculateNewPrice(existingProduct, existingRingMold.BasePrice),
                        ProcessingPrice = existingProduct.ProcessingPrice,
                        ExchangeRate = existingProduct.ExchangeRate,
                        Quantity = 1,
                        MainDiamondId = existingProduct.MainDiamondId,
                        Image1 = existingProduct.Image1,
                        Image2 = existingProduct.Image2,
                        Image3 = existingProduct.Image3,
                        SecondaryDiamondId = existingProduct.SecondaryDiamondId,
                        RingMoldId = existingRingMold.RingMoldId,
                        NecklaceMoldId = null,
                        SecondaryDiamondCount = existingProduct.SecondaryDiamondCount,
                    };

                    _context.Products.Add(newProduct);
                    await _context.SaveChangesAsync();

                    Console.WriteLine($"New Ring Product created with ID: {newProduct.ProductId}");

                    return CreatedAtAction("GetProduct", new { id = newProduct.ProductId }, newProduct);
                }
                else if (existingProduct.ProductType == 3) // Necklace
                {
                    // Fetch the necklace price based on the selected size
                    var necklacePriceTable = await _context.NecklacePriceTable
                        .FirstOrDefaultAsync(npt => npt.Material == existingProduct.NecklaceMold.Material &&
                                                    npt.Length == sizeDecimal &&
                                                    npt.CaratWeight == existingProduct.NecklaceMold.CaratWeight);

                    if (necklacePriceTable == null)
                    {
                        Console.WriteLine("Necklace price for the selected length not found");
                        return NotFound("Necklace price for the selected length not found.");
                    }

                    // Check if a necklace mold with the requested size already exists
                    var existingNecklaceMold = await _context.NecklaceMold
                        .FirstOrDefaultAsync(nm => nm.Material == existingProduct.NecklaceMold.Material &&
                                                   nm.CaratWeight == existingProduct.NecklaceMold.CaratWeight &&
                                                   nm.Size == request.Size);

                    if (existingNecklaceMold != null)
                    {
                        // Check if a product with the existing necklace mold exists
                        var productWithExistingSize = await _context.Products
                            .FirstOrDefaultAsync(p => p.NecklaceMoldId == existingNecklaceMold.NecklaceMoldId && p.ProductType == 3);

                        if (productWithExistingSize != null)
                        {
                            Console.WriteLine($"Returning existing necklace product with ID: {productWithExistingSize.ProductId}");
                            return Ok(productWithExistingSize);
                        }
                        else
                        {
                            Console.WriteLine("Necklace mold exists but no product for it yet");
                        }
                    }

                    // Create a new necklace mold with the requested size if it doesn't exist
                    if (existingNecklaceMold == null)
                    {
                        var newNecklaceMold = new NecklaceMold
                        {
                            Material = existingProduct.NecklaceMold.Material,
                            CaratWeight = existingProduct.NecklaceMold.CaratWeight,
                            BasePrice = necklacePriceTable.BasePrice, // Use the dynamically fetched price
                            Size = request.Size
                        };

                        _context.NecklaceMold.Add(newNecklaceMold);
                        await _context.SaveChangesAsync();

                        existingNecklaceMold = newNecklaceMold;
                        Console.WriteLine($"New Necklace Mold created with ID: {newNecklaceMold.NecklaceMoldId}");
                    }

                    // Create a new product with the existing or new necklace mold
                    var newProduct = new Product
                    {
                        ProductName = existingProduct.ProductName,
                        ProductType = existingProduct.ProductType,
                        Material = existingProduct.Material,
                        Size = request.Size,
                        Description = existingProduct.Description,
                        Price = CalculateNewPrice(existingProduct, existingNecklaceMold.BasePrice),
                        ProcessingPrice = existingProduct.ProcessingPrice,
                        ExchangeRate = existingProduct.ExchangeRate,
                        Quantity = 1,
                        MainDiamondId = existingProduct.MainDiamondId,
                        Image1 = existingProduct.Image1,
                        Image2 = existingProduct.Image2,
                        Image3 = existingProduct.Image3,
                        SecondaryDiamondId = existingProduct.SecondaryDiamondId,
                        RingMoldId = null,
                        NecklaceMoldId = existingNecklaceMold.NecklaceMoldId,
                        SecondaryDiamondCount = existingProduct.SecondaryDiamondCount,
                    };

                    _context.Products.Add(newProduct);
                    await _context.SaveChangesAsync();

                    Console.WriteLine($"New Necklace Product created with ID: {newProduct.ProductId}");

                    return CreatedAtAction("GetProduct", new { id = newProduct.ProductId }, newProduct);
                }

                return BadRequest("Invalid product type.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }



        public class CreateOrGetProductWithSizeRequest
        {
            public int ProductId { get; set; }
            public string Size { get; set; }
        }

        private decimal CalculateNewPrice(Product product, decimal newRingMoldBasePrice)
        {
            // Fetch prices
            decimal mainDiamondPrice = 0;
            decimal secondaryDiamondPrice = 0;

            if (product.MainDiamondId != null)
            {
                var mainDiamond = _context.Diamonds.Find(product.MainDiamondId);
                if (mainDiamond != null)
                {
                    var mainDiamondPriceEntry = _context.DiamondPriceTable
                        .FirstOrDefault(d => d.Carat == mainDiamond.CaratWeight && d.Color == mainDiamond.Color && d.Clarity == mainDiamond.Clarity && d.Cut == mainDiamond.Cut);
                    if (mainDiamondPriceEntry != null)
                    {
                        mainDiamondPrice = mainDiamondPriceEntry.Price;
                        switch (mainDiamond.Origin)
                        {
                            case "South Africa":
                                mainDiamondPrice *= 1.1m; // Apply 10% increase for South Africa
                                break;
                            case "Russia":
                                mainDiamondPrice *= 1.2m; // Apply 20% increase for Russia
                                break;
                            case "Canada":
                                mainDiamondPrice *= 1.15m; // Apply 15% increase for Canada
                                break;
                            case "Botswana":
                                mainDiamondPrice *= 1.25m; // Apply 25% increase for Botswana
                                break;
                            default:
                                break;
                        }
                    }
                }
            }

            if (product.SecondaryDiamondId != null)
            {
                var secondaryDiamond = _context.Diamonds.Find(product.SecondaryDiamondId);
                if (secondaryDiamond != null)
                {
                    var secondaryDiamondPriceEntry = _context.DiamondPriceTable
                        .FirstOrDefault(d => d.Carat == secondaryDiamond.CaratWeight && d.Color == secondaryDiamond.Color && d.Clarity == secondaryDiamond.Clarity && d.Cut == secondaryDiamond.Cut);
                    if (secondaryDiamondPriceEntry != null)
                    {
                        secondaryDiamondPrice = secondaryDiamondPriceEntry.Price;
                        switch (secondaryDiamond.Origin)
                        {
                            case "South Africa":
                                secondaryDiamondPrice *= 1.1m; // Apply 10% increase for South Africa
                                break;
                            case "Russia":
                                secondaryDiamondPrice *= 1.2m; // Apply 20% increase for Russia
                                break;
                            case "Canada":
                                secondaryDiamondPrice *= 1.15m; // Apply 15% increase for Canada
                                break;
                            case "Botswana":
                                secondaryDiamondPrice *= 1.25m; // Apply 25% increase for Botswana
                                break;
                            default:
                                break;
                        }
                    }
                }
            }

            // Calculate the final price
            decimal exchangeRateMultiplier = (product.ExchangeRate ?? 0) / 100 + 1;
            decimal finalPrice = (newRingMoldBasePrice + mainDiamondPrice + (secondaryDiamondPrice * (product.SecondaryDiamondCount ?? 0)) + (product.ProcessingPrice ?? 0)) * exchangeRateMultiplier;

            finalPrice = Math.Floor(finalPrice / 100000) * 100000;
            return finalPrice;
        }


        [HttpPost("CalculatePrice")]
        public async Task<ActionResult<decimal>> CalculatePrice(CalculatePriceRequest request)
        {
            decimal moldPrice = 0;
            decimal mainDiamondPrice = 0;
            decimal secondaryDiamondPrice = 0;

            // Fetch the ring mold price based on the size
            if (request.ProductType == 2)
            {
                var ringPriceTable = await _context.RingPriceTable
                    .FirstOrDefaultAsync(rpt => rpt.Material == request.Material &&
                                                rpt.Size == decimal.Parse(request.Size) &&
                                                rpt.CaratWeight == request.CaratWeight);
                if (ringPriceTable != null)
                {
                    moldPrice = ringPriceTable.BasePrice;
                }
            }

            // Fetch the main diamond price
            if (request.MainDiamondId != null)
            {
                var mainDiamond = _context.Diamonds.Find(request.MainDiamondId);
                if (mainDiamond != null)
                {
                    var mainDiamondPriceEntry = _context.DiamondPriceTable
                        .FirstOrDefault(d => d.Carat == mainDiamond.CaratWeight && d.Color == mainDiamond.Color && d.Clarity == mainDiamond.Clarity && d.Cut == mainDiamond.Cut);
                    if (mainDiamondPriceEntry != null)
                    {
                        mainDiamondPrice = mainDiamondPriceEntry.Price;
                        switch (mainDiamond.Origin)
                        {
                            case "South Africa":
                                mainDiamondPrice *= 1.1m; // Apply 10% increase for South Africa
                                break;
                            case "Russia":
                                mainDiamondPrice *= 1.2m; // Apply 20% increase for Russia
                                break;
                            case "Canada":
                                mainDiamondPrice *= 1.15m; // Apply 15% increase for Canada
                                break;
                            case "Botswana":
                                mainDiamondPrice *= 1.25m; // Apply 25% increase for Botswana
                                break;
                            default:
                                break;
                        }
                    }
                }
            }

            if (request.SecondaryDiamondId != null)
            {
                var secondaryDiamond = _context.Diamonds.Find(request.SecondaryDiamondId);
                if (secondaryDiamond != null)
                {
                    var secondaryDiamondPriceEntry = _context.DiamondPriceTable
                        .FirstOrDefault(d => d.Carat == secondaryDiamond.CaratWeight && d.Color == secondaryDiamond.Color && d.Clarity == secondaryDiamond.Clarity && d.Cut == secondaryDiamond.Cut);
                    if (secondaryDiamondPriceEntry != null)
                    {
                        secondaryDiamondPrice = secondaryDiamondPriceEntry.Price;
                        switch (secondaryDiamond.Origin)
                        {
                            case "South Africa":
                                secondaryDiamondPrice *= 1.1m; // Apply 10% increase for South Africa
                                break;
                            case "Russia":
                                secondaryDiamondPrice *= 1.2m; // Apply 20% increase for Russia
                                break;
                            case "Canada":
                                secondaryDiamondPrice *= 1.15m; // Apply 15% increase for Canada
                                break;
                            case "Botswana":
                                secondaryDiamondPrice *= 1.25m; // Apply 25% increase for Botswana
                                break;
                            default:
                                break;
                        }
                    }
                }
            }

            // Calculate the final price
            decimal exchangeRateMultiplier = (request.ExchangeRate ?? 0) / 100 + 1;
            decimal finalPrice = (moldPrice + mainDiamondPrice + (secondaryDiamondPrice * (request.SecondaryDiamondCount ?? 0)) + (request.ProcessingPrice ?? 0)) * exchangeRateMultiplier;

            finalPrice = Math.Floor(finalPrice / 100000) * 100000;
            return Ok(finalPrice);
        }

        public class CalculatePriceRequest
        {
            public int ProductType { get; set; }
            public string Material { get; set; }
            public string Size { get; set; }
            public decimal CaratWeight { get; set; }
            public int? MainDiamondId { get; set; }
            public int? SecondaryDiamondId { get; set; }
            public int? SecondaryDiamondCount { get; set; }
            public decimal? ProcessingPrice { get; set; }
            public decimal? ExchangeRate { get; set; }
        }



    }
}
