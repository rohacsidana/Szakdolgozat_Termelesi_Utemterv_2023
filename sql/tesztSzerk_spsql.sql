create proc tesztSzerk
	@part int
as
--Adott tétel szerkezete
with szerkezet(szulo, gyerek, szint, beepulo)
as
(
	select null as szulo, pt.pt_part as gyerek, 1 as szint, cast(1 as decimal(18,5)) as beepulo
	from pt_mstr pt
	where pt.pt_part = @part
	union all
	select ps.ps_par , ps.ps_comp, sz.szint + 1, cast(ps.ps_qty_per * sz.beepulo as decimal(18,5)) 
	from PS_MSTR ps, szerkezet sz
	where ps.ps_par = sz.gyerek
)
select * from szerkezet


-- exec tesztSzerk 1000