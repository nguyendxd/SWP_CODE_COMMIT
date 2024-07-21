using System;
using System.Collections.Generic;

namespace Test.DataDB;

public partial class Staff
{
    public int SalesStaffId { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Address { get; set; }

    public int? OrderId { get; set; }

    public int? UserId { get; set; }

    public virtual ICollection<ContactSupport> ContactSupports { get; set; } = new List<ContactSupport>();

    public virtual Order? Order { get; set; }

    public virtual User? User { get; set; }
}
