using System;
using System.Collections.Generic;

namespace Test.DataDB;

public partial class Payment
{
    public int PaymentId { get; set; }

    public int? OrderId { get; set; }

    public double? AmountPaid { get; set; }

    public double? Deposit { get; set; }

    public DateOnly? DatePaid { get; set; }

    public virtual ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();

    public virtual Order? Order { get; set; }
}
