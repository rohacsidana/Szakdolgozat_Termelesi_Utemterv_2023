using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace UtemtervBackend.Models;

public partial class PsMstr
{
    public int PsPar { get; set; }

    public int PsComp { get; set; }

    public decimal PsQtyPer { get; set; }
    [JsonIgnore]
    public virtual PtMstr PsCompNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual PtMstr PsParNavigation { get; set; } = null!;
}
