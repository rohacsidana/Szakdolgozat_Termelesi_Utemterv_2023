/*Adott GYR estimated run time */

/*Adott tétel teljes gyártási sebessége*/

/*Adott tétel szerkezete*/

/*
0. input(part, req, gyártósor)
1. szerkezet
2. számítás
*/
create table #tempSzerkk (part int, par int, ido time, szint int);

with seged (part, par,qty_req, ido, szint)
as
( 
	select p.pt_part as part, p.pt_part as par, cast(10 as decimal(18,5)) as qty_req, cast(10/lnd.lnd_rate as decimal(18,5)) as ido, 1 as szint
	from PT_MSTR p inner join LND_DET lnd on lnd.lnd_part = p.pt_part and lnd.lnd_line = 'sor1' 
	where p.pt_part = 1000
	
	union all
	
	select ps.ps_comp, ps.ps_par, cast(ps.ps_qty_per * s.qty_req as decimal(18,5)), cast(ps.ps_qty_per * s.qty_req / lnd.lnd_rate as decimal(18,5)), s.szint + 1
	from PS_MSTR  ps inner join seged s on ps.ps_par = s.part
					inner join LND_DET lnd on ps.ps_comp = lnd.lnd_part and lnd.lnd_line = 'sor1'
)
select CAST(CONVERT(VARCHAR,DATEADD(SECOND, sum(seged2.ido) * 3600, 0),108) AS TIME)
from (
select szint, max(ido) as ido
from seged
group by szint
) as seged2


drop table #tempSzerkk;

