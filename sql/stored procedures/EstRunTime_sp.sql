/*Adott GYR estimated run time */

/*Adott tétel teljes gyártási sebessége*/

/*Adott tétel szerkezete*/

/*
0. input(part, req, gyártósor)
1. szerkezet
2. számítás
*/
create proc estrun
	@part int, @req int, @line varchar(8)
as

with seged (part, par,qty_req, ido, szint)
as
( 
	select p.pt_part as part, p.pt_part as par, cast(@req as decimal(18,5)) as qty_req, cast(@req/lnd.lnd_rate as decimal(18,5)) as ido, 1 as szint
	from PT_MSTR p inner join LND_DET lnd on lnd.lnd_part = p.pt_part and lnd.lnd_line = @line
	where p.pt_part = @part
	
	union all
	
	select ps.ps_comp, ps.ps_par, cast(ps.ps_qty_per * s.qty_req as decimal(18,5)), cast(ps.ps_qty_per * s.qty_req / lnd.lnd_rate as decimal(18,5)), s.szint + 1
	from PS_MSTR  ps inner join seged s on ps.ps_par = s.part
					inner join LND_DET lnd on ps.ps_comp = lnd.lnd_part and lnd.lnd_line = @line
	
)
select CAST(CONVERT(VARCHAR,DATEADD(SECOND, sum(seged2.ido) * 3600, 0),108) AS TIME)
from (
select szint, max(ido) as ido
from seged
group by szint
) as seged2


/**********************/

--with seged (part, par,qty_req, ido,sor, szint)
--as
--( 
--	select p.pt_part as part, p.pt_part as par, cast(1 as decimal(18,5)) as qty_req, cast(1/lnd.lnd_rate as decimal(18,5)) as ido,lnd.lnd_line, 1 as szint
--	from PT_MSTR p inner join LND_DET lnd on lnd.lnd_part = p.pt_part
--	where not exists (select 1 from PS_MSTR ps2 where ps2.ps_comp = p.pt_part)
	
--	union all
	
--	select ps.ps_comp, ps.ps_par, cast(ps.ps_qty_per * s.qty_req as decimal(18,5)), cast(ps.ps_qty_per * s.qty_req / lnd.lnd_rate as decimal(18,5)),lnd.lnd_line, s.szint + 1
--	from PS_MSTR  ps inner join seged s on ps.ps_par = s.part 
--					inner join LND_DET lnd on ps.ps_comp = lnd.lnd_part and lnd.lnd_line = s.sor
	
--)
--select * from seged

--select CAST(CONVERT(VARCHAR,DATEADD(SECOND, sum(seged2.ido) * 3600, 0),108) AS TIME)

--set identity_insert PT_MSTR off

--insert into PT_MSTR (pt_part, pt_desc, pt_um, pt_qty_oh) values (100000, 'késztermék teszt', 'g', null)
--insert into PS_MSTR values(100000,1002, 2)
--insert into LND_DET values('sor1', 100000, 43.98693)

--insert into PT_MSTR (pt_part, pt_desc, pt_um, pt_qty_oh) values (100000, 'teszt1', 'g', null)
--insert into PT_MSTR (pt_part, pt_desc, pt_um, pt_qty_oh) values (100000, 'teszt1', 'g', null)
--insert into PT_MSTR (pt_part, pt_desc, pt_um, pt_qty_oh) values (100000, 'teszt1', 'g', null)

