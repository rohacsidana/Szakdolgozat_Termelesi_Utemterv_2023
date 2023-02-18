alter function orankentiEgyseg
(
@part int, @line varchar(8)
)
returns decimal(18,5)
as
begin
	declare @egys decimal(18,5);

	with seged (par, part,lehet, /*lehet_req,*/ e_req,/* rate,*/ szint)
	as
	(
		select pt.pt_part as par, pt.pt_part as part, cast(lnd.lnd_rate as decimal(18,5)) as lehet, /*lnd.lnd_rate as lehet_req,*/ cast(1 as decimal(18,5)) as e_req, /*lnd.lnd_rate as rate,*/ 0 as szint
		from pt_mstr pt inner join lnd_det lnd on pt.pt_part = lnd.lnd_part
		where pt.pt_part = @part
		and lnd.lnd_line = @line
		union all
		select ps.ps_par, ps.ps_comp
		,  cast( iif(ps.ps_qty_per * s.lehet < lnd.lnd_rate, s.lehet, lnd.lnd_rate/(ps.ps_qty_per * s.e_req) ) as decimal(18,5) ) --lehet gyártani menny.
		--, cast(ps.ps_qty_per * iif(ps.ps_qty_per * lehet < lnd.lnd_rate, lehet, lnd.lnd_rate/ps.ps_qty_per * e_req ) as decimal(18,5)) --lehet-hez szüks mennyi
		,cast(ps.ps_qty_per * s.e_req as decimal(18,5)) -- egy hez szükséges mennyi
		--,lnd.lnd_rate
		, s.szint + 1
		from ps_mstr ps inner join seged s on ps.ps_par = s.part
						inner join lnd_DET lnd on ps.ps_comp = lnd.lnd_part
		where lnd.lnd_line = @line
	)
	select @egys = min(s.lehet)
	from seged s
	where s.szint = (select max(sb.szint) from seged sb)
	return @egys;
	
end


--select dbo.orankentiEgyseg(1020, 'line_01')