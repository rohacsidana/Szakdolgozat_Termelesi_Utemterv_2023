using System;
using System.Collections.Generic;

namespace UtemtervBackend.Models;

public partial class WomDet
{
    public int WomPart { get; set; }

    public int WomPar { get; set; }

    public int WomLot { get; set; }

    public int? WomMat { get; set; }

    public decimal? WomReq { get; set; }

    public decimal WomRsrv { get; set; }

    public virtual WodDet Wom { get; set; } = null!;

    public virtual PtMstr? WomMatNavigation { get; set; }
}
