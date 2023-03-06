alter function RosszLNDdarab
(
	@part int, @line varchar(8)
)
returns int
as
begin
	declare @hiba int;
	with seged
	as
	(
		select pt_part as szulo, pt_part as gyerek
		from PT_MSTR
		where pt_part = @part
		union all
		select ps_par, ps_comp
		from ps_mstr inner join  seged s on ps_par = s.gyerek
	)
	select @hiba = COUNT(*)
	from seged left outer join LND_DET on szulo = lnd_part and lnd_line  = @line
	where lnd_part is null

	return @hiba;
	 
 end
