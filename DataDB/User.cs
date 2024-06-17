using System;
using System.Collections.Generic;

namespace SWP_SU4.DataDB;

public partial class User
{
    public int UserId { get; set; }

    public int? RoleId { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Name { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Address { get; set; }

    public string? Sex { get; set; }

    public DateOnly? DateOfBirth { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual Role? Role { get; set; }
}
