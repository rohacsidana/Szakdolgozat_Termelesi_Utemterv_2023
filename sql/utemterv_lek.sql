/*
with hierarchia (dolgoz�, f�n�ke, szint)
as
(
select k�d, f�n�k, 1 as szint
from dolgoz� 
where f�n�k is null
union all
select k�d, f�n�k, szint+1
from dolgoz�, hierarchia
where dolgoz�=f�n�k
)
select * from hierarchia
*/
select * from pt_mstr
select * from ps_mstr
go

with szerkezet(szulo, gyerek, szint, beepulo)
as
(
	select null as szulo, pt.pt_part as gyerek, 1 as szint, 1,0 as beepulo
	from pt_mstr pt
	where not exists (select 1 from ps_mstr psB where pt.pt_part = psB.ps_comp)
	union all
	select ps.ps_par , ps.ps_comp, sz.szint + 1, ps.ps_qty_per
	from PS_MSTR ps, szerkezet sz
	where ps.ps_par = sz.gyerek
)
select * from szerkezet

go
