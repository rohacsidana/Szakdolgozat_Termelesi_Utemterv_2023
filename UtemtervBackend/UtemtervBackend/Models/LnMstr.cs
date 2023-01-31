using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace UtemtervBackend.Models;

public partial class LnMstr
{
    public string LnLine { get; set; } = null!;

    public string? LnDesc { get; set; }
    [JsonIgnore]
    public virtual ICollection<ChgMstr> ChgMstrs { get; } = new List<ChgMstr>();
    [JsonIgnore]
    public virtual ICollection<LndDet> LndDets { get; } = new List<LndDet>();
    [JsonIgnore]
    public virtual ICollection<WoMstr> WoMstrs { get; } = new List<WoMstr>();
}
