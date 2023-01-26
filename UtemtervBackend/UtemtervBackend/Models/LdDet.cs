using System;
using System.Collections.Generic;

namespace UtemtervBackend.Models;

public partial class LdDet
{
    public int LdPart { get; set; }

    public DateTime LdExpire { get; set; }

    public decimal LdQtyOh { get; set; }

    public decimal LdQtyRsrv { get; set; }

    public decimal LdQtyScrp { get; set; }

    public virtual ICollection<LadDet> LadDets { get; } = new List<LadDet>();

    public virtual PtMstr LdPartNavigation { get; set; } = null!;
}
