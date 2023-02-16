alter function orankentiEgyseg
(
@part int, @line varchar(8)
)
returns decimal(18,5)
as
begin
	declare @egys decimal(18,5);

	with seged (par, part,lehet, lehet_req, e_req, rate, szint)
	as
	(
		select pt_part as par, pt_part as part, cast(lnd_rate as decimal(18,5)) as lehet, lnd_rate as lehet_req, cast(1 as decimal(18,5)) as e_req, lnd_rate as rate, 0 as szint
		from pt_mstr inner join lnd_det on pt_part = lnd_part
		where pt_part = @part
		and lnd_line = @line
		union all
		select ps_par, ps_comp
		,  cast( iif(ps_qty_per * lehet < lnd_rate, lehet, lnd_rate/(ps_qty_per * e_req) ) as decimal(18,5) ) --lehet gyártani menny.
		, cast(ps_qty_per * iif(ps_qty_per * lehet < lnd_rate, lehet, lnd_rate/ps_qty_per * e_req ) as decimal(18,5)) --lehet-hez szüks mennyi
		,cast(ps_qty_per * e_req as decimal(18,5)) -- egy hez szükséges mennyi
		,lnd_rate
		, szint + 1
		from ps_mstr inner join seged on ps_par = part
						inner join LND_DET on ps_comp = lnd_part
		where lnd_line = @line
	)
	select @egys = min(lehet)
	from seged
	where szint = (select max(szint) from seged)
	return @egys;
	
end


--select dbo.orankentiEgyseg(1000, 'line_01')