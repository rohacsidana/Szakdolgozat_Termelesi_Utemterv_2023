using System;
using System.Collections.Generic;

namespace UtemtervBackend.scaff;

public partial class Ptp
{
    public int Parent { get; set; }

    public string ParentDesc { get; set; } = null!;

    public string ParentUm { get; set; } = null!;

    public int Child { get; set; }

    public string ChildDesc { get; set; } = null!;

    public string ChildUm { get; set; } = null!;

    public decimal ChildPerPar { get; set; }
}
