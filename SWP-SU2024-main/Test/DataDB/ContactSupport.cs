using System;
using System.Collections.Generic;

namespace Test.DataDB;

public partial class ContactSupport
{
    public int GuestId { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public int? SalesStaffId { get; set; }

    public virtual Staff? SalesStaff { get; set; }
}
