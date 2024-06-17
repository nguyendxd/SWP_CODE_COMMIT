using System;
using System.Collections.Generic;

namespace SWP_SU4.DataDB;

public partial class Product
{
    public int ProductId { get; set; }

    public string? ProductName { get; set; }

    public int? ProductType { get; set; }

    public string? Type { get; set; }

    public string? Size { get; set; }

    public string? Description { get; set; }

    public decimal? Price { get; set; }

    public int? Quantity { get; set; }

    public int? DiamondId { get; set; }

    public string? Image1 { get; set; }

    public string? Image2 { get; set; }

    public string? Image3 { get; set; }

    public virtual Diamond? Diamond { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ProductType? ProductTypeNavigation { get; set; }
}
