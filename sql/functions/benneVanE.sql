alter function benneVanE
(
	@exp date, @lot int
)
returns bit
as
begin
	declare @benneVanE bit = 0;

	select  @benneVanE = count(*)
	from wo_mstr
	where wo_lot = @lot
	and @exp >= iif(wo_start_time is null,  wo_start_date, wo_start_time)

	return @benneVanE;
end