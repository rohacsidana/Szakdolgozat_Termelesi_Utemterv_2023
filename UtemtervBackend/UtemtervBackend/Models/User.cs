using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace UtemtervBackend.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Name { get; set; } = null!;

    public DateTime BirthDate { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Post { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<WoMstr> WoMstrs { get; } = new List<WoMstr>();
}
