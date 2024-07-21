using System;
using System.Collections.Generic;

namespace Test.DataDB;

public partial class Manager
{
    public int ManagerId { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Address { get; set; }

    public int? UserId { get; set; }

    public int? ProductId { get; set; }

    public virtual Product? Product { get; set; }

    public virtual User? User { get; set; }
}
