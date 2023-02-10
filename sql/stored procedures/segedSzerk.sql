create proc segedSzerk
	@part int
as

with seged(part, par, szint)
as
(
	select pt_part as part, pt_part as par,1 as szint
	from PT_MSTR pt
	where pt.pt_part = @part
	union all
	select ps.ps_comp, ps.ps_par, s.szint + 1
	from PS_MSTR ps inner join seged s on ps.ps_par = s.part
	where exists (select 1 from PS_MSTR psB where psB.ps_par = ps.ps_comp)
)select * from seged
