using System;
using System.Collections.Generic;

namespace Test.DataDB;

public partial class EducationalContent
{
    public int DesignId { get; set; }

    public int? DesignerId { get; set; }

    public int? TracklogId { get; set; }

    public int? CustomerId { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual Designer? Designer { get; set; }

    public virtual Tracklog? Tracklog { get; set; }
}
