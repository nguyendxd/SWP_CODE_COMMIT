using System;
using System.Collections.Generic;

namespace Test.DataDB;

public partial class Diamond
{
    public int DiamondId { get; set; }

    public string? Name { get; set; }

    public string? Shape { get; set; }

    public string? Cut { get; set; }

    public string? Color { get; set; }

    public string? Clarity { get; set; }

    public double? CaratWeight { get; set; }

    public string? Fluorescence { get; set; }

    public double? LengthWidthRatio { get; set; }

    public double? Depth { get; set; }

    public double? Tables { get; set; }

    public string? Symmetry { get; set; }

    public string? Girdle { get; set; }

    public string? Measurements { get; set; }

    public string? Certificate { get; set; }

    public double? Price { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
