using System;
using System.Collections.Generic;

namespace UtemtervBackend.Models;

public partial class PtMstr
{
    public int PtPart { get; set; }

    public string PtDesc { get; set; } = null!;

    public string PtUm { get; set; } = null!;

    public virtual ICollection<ChgMstr> ChgMstrChgFromNavigations { get; } = new List<ChgMstr>();

    public virtual ICollection<ChgMstr> ChgMstrChgToNavigations { get; } = new List<ChgMstr>();

    public virtual ICollection<LdDet> LdDets { get; } = new List<LdDet>();

    public virtual ICollection<LndDet> LndDets { get; } = new List<LndDet>();

    public virtual ICollection<PsMstr> PsMstrPsCompNavigations { get; } = new List<PsMstr>();

    public virtual ICollection<PsMstr> PsMstrPsParNavigations { get; } = new List<PsMstr>();

    public virtual ICollection<WoMstr> WoMstrs { get; } = new List<WoMstr>();

    public virtual ICollection<WodDet> WodDetWodParNavigations { get; } = new List<WodDet>();

    public virtual ICollection<WodDet> WodDetWodPartNavigations { get; } = new List<WodDet>();

    public virtual ICollection<WomDet> WomDets { get; } = new List<WomDet>();
}
