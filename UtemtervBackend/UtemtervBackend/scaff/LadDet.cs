using System;
using System.Collections.Generic;

namespace UtemtervBackend.scaff;

public partial class LadDet
{
    public int LadId { get; set; }

    public int? LadPart { get; set; }

    public int? LadPar { get; set; }

    public int? LadLot { get; set; }

    public int? LadComp { get; set; }

    public DateTime? LadExpire { get; set; }

    public decimal LadQtyRsrv { get; set; }

    public decimal LadQtyUsed { get; set; }

    public virtual LdDet? Lad { get; set; }

    public virtual WomDet? LadNavigation { get; set; }
}
