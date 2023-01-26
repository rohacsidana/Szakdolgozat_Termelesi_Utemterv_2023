using System;
using System.Collections.Generic;

namespace UtemtervBackend.Models;

public partial class Dictionary
{
    public string Value { get; set; } = null!;

    public string Type { get; set; } = null!;

    public string? Desc { get; set; }
}
