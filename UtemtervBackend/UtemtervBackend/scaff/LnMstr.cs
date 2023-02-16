using System;
using System.Collections.Generic;

namespace UtemtervBackend.scaff;

public partial class LnMstr
{
    public string LnLine { get; set; } = null!;

    public string? LnDesc { get; set; }

    public virtual ICollection<ChgMstr> ChgMstrs { get; } = new List<ChgMstr>();

    public virtual ICollection<LndDet> LndDets { get; } = new List<LndDet>();

    public virtual ICollection<WoMstr> WoMstrs { get; } = new List<WoMstr>();
}
