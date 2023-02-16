using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace UtemtervBackend.Models;

public partial class WomDet
{
    public int WomPart { get; set; }

    public int WomPar { get; set; }

    public int WomLot { get; set; }

    public int WomMat { get; set; }

    public decimal WomReq { get; set; }

    public decimal WomRsrv { get; set; }
    [JsonIgnore]
    public virtual ICollection<LadDet> LadDets { get; } = new List<LadDet>();
    [JsonIgnore]
    public virtual PsMstr Wom { get; set; } = null!;
    [JsonIgnore]
    public virtual WodDet WomNavigation { get; set; } = null!;
}
