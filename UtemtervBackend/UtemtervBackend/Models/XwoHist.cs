using System;
using System.Collections.Generic;

namespace UtemtervBackend.Models;

public partial class XwoHist
{
    public string XwoYear { get; set; } = null!;

    public string XwoWeek { get; set; } = null!;

    public int XwoLot { get; set; }

    public byte XwoVersion { get; set; }

    public TimeSpan? XwoEstRun { get; set; }

    public int? XwoSeq { get; set; }

    public DateTime? XwoStartDate { get; set; }

    public TimeSpan? XwoStartTime { get; set; }

    public DateTime? XwoEndTime { get; set; }

    public TimeSpan? XwoPldDowntime { get; set; }

    public TimeSpan? XwoUnpldDowntime { get; set; }

    public virtual WoMstr XwoLotNavigation { get; set; } = null!;
}
