create function dbo.ptFaStruktura (@ps_par int)
returns @szerkezet table (ps_par int, ps_comp int, szint int)
as
begin
    with temp as (
        select ps_par, ps_comp, 1 as szint
        from PS_MSTR
        where ps_par = @ps_par
    union all
        select PS_MSTR.ps_par, PS_MSTR.ps_comp, temp.szint + 1
        from PS_MSTR
        join temp on temp.ps_comp = PS_MSTR.ps_par
    )
    insert into @szerkezet (ps_par, ps_comp, szint)
    select ps_par, ps_comp, szint
    from temp
    order by szint
    return
end