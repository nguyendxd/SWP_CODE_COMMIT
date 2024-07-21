using System;
using System.Collections.Generic;

namespace Test.DataDB;

public partial class Ring
{
    public int RingId { get; set; }

    public string? RingName { get; set; }

    public int? JewelryId { get; set; }

    public string? Type { get; set; }

    public double? Width { get; set; }

    public string? Shape { get; set; }

    public int? Quantity { get; set; }

    public double? TotalCaratAverage { get; set; }

    public string? Color { get; set; }

    public string? Clarity { get; set; }

    public double? Price { get; set; }

    public string? Description { get; set; }

    public virtual Jewelry? Jewelry { get; set; }
}
