using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace UtemtervBackend.Models;

public partial class LndDet
{
    public string LndLine { get; set; } = null!;

    public int LndPart { get; set; }

    public decimal LndRate { get; set; }
    [JsonIgnore]
    public virtual LnMstr LndLineNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual PtMstr LndPartNavigation { get; set; } = null!;
}
