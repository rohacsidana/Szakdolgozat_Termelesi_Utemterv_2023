using System;
using System.Collections.Generic;

namespace UtemtervBackend.Views;

public partial class HetiUtemterv
{
    public int WoLot { get; set; }

    public string WoNbr { get; set; } = null!;

    public int WoPart { get; set; }

    public string PtDesc { get; set; } = null!;

    public int WoQtyOrd { get; set; }

    public string PtUm { get; set; } = null!;

    public string? WoLine { get; set; }

    public string? LnDesc { get; set; }

    public decimal? Egys { get; set; }

    public TimeSpan? EstRun { get; set; }

    public int? WoSeq { get; set; }

    public DateTime? WoRelDate { get; set; }

    public DateTime? WoStartDate { get; set; }

    public TimeSpan? WoStartTime { get; set; }

    public TimeSpan? WoEndTime { get; set; }

    public TimeSpan? WoPldDowntime { get; set; }

    public TimeSpan? WoUnpldDowntime { get; set; }
}
