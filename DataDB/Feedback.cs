﻿using System;
using System.Collections.Generic;

namespace SWP_SU4.DataDB;

public partial class Feedback
{
    public int FeedbackId { get; set; }

    public int? CustomerId { get; set; }

    public string? FeedbackText { get; set; }

    public int? Rating { get; set; }

    public DateOnly? FeedbackDate { get; set; }

    public virtual Customer? Customer { get; set; }
}
