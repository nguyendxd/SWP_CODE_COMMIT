using System;
using System.Collections.Generic;

namespace Test.DataDB;

public partial class Product
{
    public int ProductId { get; set; }

    public int? DesignId { get; set; }

    public int? JewelryId { get; set; }

    public int? DiamondId { get; set; }

    public int? DesignerId { get; set; }

    public DateOnly? DateCreate { get; set; }

    public virtual Designer? Design { get; set; }

    public virtual Designer? Designer { get; set; }

    public virtual Diamond? Diamond { get; set; }

    public virtual Jewelry? Jewelry { get; set; }

    public virtual ICollection<Manager> Managers { get; set; } = new List<Manager>();

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
}
