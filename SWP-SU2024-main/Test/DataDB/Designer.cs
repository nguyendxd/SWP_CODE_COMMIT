using System;
using System.Collections.Generic;

namespace Test.DataDB;

public partial class Designer
{
    public int DesignerId { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Address { get; set; }

    public int? UserId { get; set; }

    public int? DesignId { get; set; }

    public virtual ICollection<DesignSpace> DesignSpaces { get; set; } = new List<DesignSpace>();

    public virtual ICollection<EducationalContent> EducationalContents { get; set; } = new List<EducationalContent>();

    public virtual ICollection<Product> ProductDesigners { get; set; } = new List<Product>();

    public virtual ICollection<Product> ProductDesigns { get; set; } = new List<Product>();

    public virtual ICollection<Tracklog> TracklogDesigners { get; set; } = new List<Tracklog>();

    public virtual ICollection<Tracklog> TracklogDesigns { get; set; } = new List<Tracklog>();

    public virtual User? User { get; set; }
}
