using System;
using System.Collections.Generic;

namespace UtemtervBackend.Views;

public partial class LdList
{
    public int LdPart { get; set; }

    public DateTime LdExpire { get; set; }

    public decimal LdQtyOh { get; set; }

    public decimal LdQtyRsrv { get; set; }

    public decimal LdQtyScrp { get; set; }
}
