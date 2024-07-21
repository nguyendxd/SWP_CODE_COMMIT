using System;
using System.Collections.Generic;

namespace Test.DataDB;

public partial class Order
{
    public int OrderId { get; set; }

    public int? CustomerId { get; set; }

    public double? TotalPrice { get; set; }

    public DateOnly? OrderDate { get; set; }

    public int? OrderDetailId { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual OrderDetail? OrderDetail { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ICollection<Staff> Staff { get; set; } = new List<Staff>();
}
