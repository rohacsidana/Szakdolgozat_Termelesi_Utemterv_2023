using System;
using System.Collections.Generic;

namespace UtemtervBackend.Views;

public partial class UserList
{
    public int UserId { get; set; }

    public string Name { get; set; } = null!;

    public DateTime BirthDate { get; set; }

    public string Email { get; set; } = null!;

    public string Post { get; set; } = null!;
}
