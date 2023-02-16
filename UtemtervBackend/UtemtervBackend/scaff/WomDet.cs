using System;
using System.Collections.Generic;

namespace UtemtervBackend.scaff;

public partial class WomDet
{
    public int WomPart { get; set; }

    public int WomPar { get; set; }

    public int WomLot { get; set; }

    public int WomMat { get; set; }

    public decimal WomReq { get; set; }

    public decimal WomRsrv { get; set; }

    public virtual ICollection<LadDet> LadDets { get; } = new List<LadDet>();

    public virtual PsMstr Wom { get; set; } = null!;

    public virtual WodDet WomNavigation { get; set; } = null!;
}
