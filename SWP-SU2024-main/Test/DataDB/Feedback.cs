using System;
using System.Collections.Generic;

namespace Test.DataDB;

public partial class Feedback
{
    public int FeedbackId { get; set; }

    public int? UserId { get; set; }

    public string? Comment { get; set; }

    public int? InvoiceId { get; set; }

    public double? Rating { get; set; }

    public DateOnly? FeedbackDate { get; set; }

    public virtual Invoice? Invoice { get; set; }

    public virtual User? User { get; set; }
}
