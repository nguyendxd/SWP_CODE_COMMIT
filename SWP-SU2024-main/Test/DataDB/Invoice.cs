using System;
using System.Collections.Generic;

namespace Test.DataDB;

public partial class Invoice
{
    public int InvoiceId { get; set; }

    public int? PaymentId { get; set; }

    public string? Products { get; set; }

    public int? Quantity { get; set; }

    public double? Total { get; set; }

    public double? Deposit { get; set; }

    public double? AmountPaid { get; set; }

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual Payment? Payment { get; set; }
}
