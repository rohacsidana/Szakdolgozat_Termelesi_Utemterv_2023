﻿using System;
using System.Collections.Generic;

namespace UtemtervBackend.Models;

public partial class PsMstr
{
    public int PsPar { get; set; }

    public int PsComp { get; set; }

    public decimal PsQtyPer { get; set; }

    public virtual PtMstr PsCompNavigation { get; set; } = null!;

    public virtual PtMstr PsParNavigation { get; set; } = null!;
}
