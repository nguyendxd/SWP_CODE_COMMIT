using System;
using System.Collections.Generic;

namespace Test.DataDB;

public partial class Customer
{
    public int CustomerId { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Address { get; set; }

    public string? Sex { get; set; }

    public DateOnly? DateOfBirth { get; set; }

    public int? UserId { get; set; }

    public virtual ICollection<DesignSpace> DesignSpaces { get; set; } = new List<DesignSpace>();

    public virtual ICollection<EducationalContent> EducationalContents { get; set; } = new List<EducationalContent>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual User? User { get; set; }
}
