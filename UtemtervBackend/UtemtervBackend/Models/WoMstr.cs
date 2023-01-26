using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace UtemtervBackend.Models;

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

    public string? WoStatus { get; set; }
    [JsonIgnore]
    public virtual LnMstr? WoLineNavigation { get; set; }
    [JsonIgnore]
    public virtual PtMstr WoPartNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual User? WoUserNavigation { get; set; }
    [JsonIgnore]
    public virtual ICollection<WodDet> WodDets { get; } = new List<WodDet>();
    [JsonIgnore]
    public virtual ICollection<XwoHist> XwoHists { get; } = new List<XwoHist>();
}
