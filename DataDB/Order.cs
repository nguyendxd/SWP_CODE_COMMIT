using System;
using System.Collections.Generic;

namespace SWP_SU4.DataDB;

public partial class Order
{
    public int OrderId { get; set; }

    public int? CustomerId { get; set; }

    public decimal? TotalPrice { get; set; }

    public DateOnly? OrderDate { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
}
