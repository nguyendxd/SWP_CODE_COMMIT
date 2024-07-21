using System;
using System.Collections.Generic;

namespace Test.DataDB;

public partial class Tracklog
{
    public int TracklogId { get; set; }

    public int? DesignId { get; set; }

    public int? DesignerId { get; set; }

    public DateOnly? Date { get; set; }

    public string? Picture { get; set; }

    public virtual Designer? Design { get; set; }

    public virtual ICollection<DesignSpace> DesignSpaces { get; set; } = new List<DesignSpace>();

    public virtual Designer? Designer { get; set; }

    public virtual ICollection<EducationalContent> EducationalContents { get; set; } = new List<EducationalContent>();
}
