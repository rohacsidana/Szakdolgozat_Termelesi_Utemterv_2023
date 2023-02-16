using System;
using System.Collections.Generic;

namespace UtemtervBackend.scaff;

public partial class VwWod
{
    public int Lot { get; set; }

    public int Part { get; set; }

    public string PartName { get; set; } = null!;

    public int Parent { get; set; }

    public string ParentName { get; set; } = null!;

    public decimal QtyReq { get; set; }

    public string PartUm { get; set; } = null!;

    public int QtyCompl { get; set; }

    public int QtyRjct { get; set; }
}
