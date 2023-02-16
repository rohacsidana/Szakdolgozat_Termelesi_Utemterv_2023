using System;
using System.Collections.Generic;

namespace UtemtervBackend.scaff;

public partial class LndDet
{
    public string LndLine { get; set; } = null!;

    public int LndPart { get; set; }

    public decimal LndRate { get; set; }

    public virtual LnMstr LndLineNavigation { get; set; } = null!;

    public virtual PtMstr LndPartNavigation { get; set; } = null!;
}
