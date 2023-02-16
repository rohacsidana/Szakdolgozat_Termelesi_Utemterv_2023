using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace UtemtervBackend.Models;

public partial class WodDet
{
    public int WodPart { get; set; }

    public int WodPar { get; set; }

    public int WodLot { get; set; }

    public decimal WodQtyReq { get; set; }

    public int WodQtyCompl { get; set; }

    public int WodQtyRjct { get; set; }
    [JsonIgnore]
    public virtual WoMstr WodLotNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual PtMstr WodParNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual PtMstr WodPartNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<WomDet> WomDets { get; } = new List<WomDet>();
}
