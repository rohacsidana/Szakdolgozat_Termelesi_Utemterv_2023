using System;
using System.Collections.Generic;

namespace UtemtervBackend.Models;

public partial class ChgMstr
{
    public string ChgLine { get; set; } = null!;

    public int ChgFrom { get; set; }

    public int ChgTo { get; set; }

    public TimeSpan ChgTime { get; set; }

    public virtual PtMstr ChgFromNavigation { get; set; } = null!;

    public virtual LnMstr ChgLineNavigation { get; set; } = null!;

    public virtual PtMstr ChgToNavigation { get; set; } = null!;
}
