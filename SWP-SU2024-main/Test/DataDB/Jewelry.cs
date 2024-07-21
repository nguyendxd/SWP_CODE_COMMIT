using System;
using System.Collections.Generic;

namespace Test.DataDB;

public partial class Jewelry
{
    public int JewelryId { get; set; }

    public virtual ICollection<Necklace> Necklaces { get; set; } = new List<Necklace>();

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    public virtual ICollection<Ring> Rings { get; set; } = new List<Ring>();
}
