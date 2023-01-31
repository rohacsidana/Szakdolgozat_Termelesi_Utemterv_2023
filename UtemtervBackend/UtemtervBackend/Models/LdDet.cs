using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace UtemtervBackend.Models;

public partial class LdDet
{
    public int LdPart { get; set; }

    public DateTime LdExpire { get; set; }

    public decimal LdQtyOh { get; set; }

    public decimal LdQtyRsrv { get; set; }

    public decimal LdQtyScrp { get; set; }
    [JsonIgnore]
    public virtual ICollection<LadDet> LadDets { get; } = new List<LadDet>();
    [JsonIgnore]
    public virtual PtMstr LdPartNavigation { get; set; } = null!;
}
