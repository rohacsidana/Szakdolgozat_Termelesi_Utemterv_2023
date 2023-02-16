using System;
using System.Collections.Generic;

namespace UtemtervBackend.scaff;

public partial class WoMstr
{
    public int WoLot { get; set; }

    public string WoNbr { get; set; } = null!;

    public int? WoUser { get; set; }

    public int WoPart { get; set; }

    public string? WoLine { get; set; }

    public int? WoSeq { get; set; }

    public int WoQtyOrd { get; set; }

    public DateTime WoOrdDate { get; set; }

    public DateTime WoDueDate { get; set; }

    public DateTime? WoStartDate { get; set; }

    public DateTime? WoRelDate { get; set; }

    public TimeSpan? WoEstRun { get; set; }

    public TimeSpan? WoStartTime { get; set; }

    public DateTime? WoEndTime { get; set; }

    public TimeSpan? WoPldDowntime { get; set; }

    public TimeSpan? WoUnpldDowntime { get; set; }

    public bool WoActivated { get; set; }

    public string WoStatus { get; set; } = null!;

    public virtual LnMstr? WoLineNavigation { get; set; }

    public virtual PtMstr WoPartNavigation { get; set; } = null!;

    public virtual User? WoUserNavigation { get; set; }

    public virtual ICollection<WodDet> WodDets { get; } = new List<WodDet>();

    public virtual ICollection<XwoHist> XwoHists { get; } = new List<XwoHist>();
}
