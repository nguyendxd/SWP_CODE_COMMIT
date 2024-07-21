using System;
using System.Collections.Generic;

namespace Test.DataDB;

public partial class Necklace
{
    public int NecklacesId { get; set; }

    public string? NecklacesName { get; set; }

    public int? JewelryId { get; set; }

    public string? Type { get; set; }

    public string? ChainType { get; set; }

    public double? ChainLength { get; set; }

    public string? ClaspType { get; set; }

    public string? Shape { get; set; }

    public int? Quantity { get; set; }

    public double? TotalCaratAverage { get; set; }

    public string? Color { get; set; }

    public string? Clarity { get; set; }

    public string? EnhancementType { get; set; }

    public double? Price { get; set; }

    public string? Description { get; set; }

    public virtual Jewelry? Jewelry { get; set; }
}
