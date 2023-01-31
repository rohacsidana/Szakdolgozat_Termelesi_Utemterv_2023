using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace UtemtervBackend.Models;

public partial class ChgMstr
{
    public string ChgLine { get; set; } = null!;

    public int ChgFrom { get; set; }

    public int ChgTo { get; set; }

    public TimeSpan ChgTime { get; set; }
    [JsonIgnore]
    public virtual PtMstr ChgFromNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual LnMstr ChgLineNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual PtMstr ChgToNavigation { get; set; } = null!;
}
