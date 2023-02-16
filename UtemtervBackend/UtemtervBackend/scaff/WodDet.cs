using System;
using System.Collections.Generic;

namespace UtemtervBackend.scaff;

public partial class WodDet
{
    public int WodPart { get; set; }

    public int WodPar { get; set; }

    public int WodLot { get; set; }

    public decimal WodQtyReq { get; set; }

    public int WodQtyCompl { get; set; }

    public int WodQtyRjct { get; set; }

    public virtual WoMstr WodLotNavigation { get; set; } = null!;

    public virtual PtMstr WodParNavigation { get; set; } = null!;

    public virtual PtMstr WodPartNavigation { get; set; } = null!;

    public virtual ICollection<WomDet> WomDets { get; } = new List<WomDet>();
}
