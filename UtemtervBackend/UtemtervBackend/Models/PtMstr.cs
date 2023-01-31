using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace UtemtervBackend.Models;

public partial class PtMstr
{
    public int PtPart { get; set; }

    public string PtDesc { get; set; } = null!;

    public string PtUm { get; set; } = null!;

    public decimal? PtQtyOh { get; set; }
    [JsonIgnore]
    public virtual ICollection<ChgMstr> ChgMstrChgFromNavigations { get; } = new List<ChgMstr>();
    [JsonIgnore]
    public virtual ICollection<ChgMstr> ChgMstrChgToNavigations { get; } = new List<ChgMstr>();
    [JsonIgnore]
    public virtual ICollection<LdDet> LdDets { get; } = new List<LdDet>();
    [JsonIgnore]
    public virtual ICollection<LndDet> LndDets { get; } = new List<LndDet>();
    [JsonIgnore]
    public virtual ICollection<PsMstr> PsMstrPsCompNavigations { get; } = new List<PsMstr>();
    [JsonIgnore]
    public virtual ICollection<PsMstr> PsMstrPsParNavigations { get; } = new List<PsMstr>();
    [JsonIgnore]
    public virtual ICollection<WoMstr> WoMstrs { get; } = new List<WoMstr>();
    [JsonIgnore]
    public virtual ICollection<WodDet> WodDetWodParNavigations { get; } = new List<WodDet>();
    [JsonIgnore]
    public virtual ICollection<WodDet> WodDetWodPartNavigations { get; } = new List<WodDet>();
    [JsonIgnore]
    public virtual ICollection<WomDet> WomDets { get; } = new List<WomDet>();
}
