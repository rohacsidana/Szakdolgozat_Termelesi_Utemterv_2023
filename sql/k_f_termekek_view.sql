create view k_f_termekek
as
--Az összes kész és félkész termék felsorolva segédnek
with kfTermekek (part, szint)
as
(
	select  pt_part as part, 1 as szint
	from PT_MSTR pt 
	where not exists (select 1 from PS_MSTR ps where ps.ps_comp = pt.pt_part)
	union all
	select ps.ps_comp as part, kf.szint + 1
	from PS_MSTR ps inner join kfTermekek kf on ps.ps_par = kf.part
	where exists (select 1 from PS_MSTR psB where psB.ps_par = ps.ps_comp)
)
select * from kfTermekek
--select * from k_f_termekek
