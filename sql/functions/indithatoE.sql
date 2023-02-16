create function indithatoE
(
@lot int
)
returns int
as
begin
	declare @nemFutjaDb int;

	select @nemFutjaDb = COUNT(*)
	from wom_det
	where wom_lot = @lot
	and wom_req > wom_rsrv;

	return @nemFutjaDb;
end
/*Ha megvan írva hogy pontosan a req mennyiséget kell lefoglalni akkor it a (wom_req > wom_rsrv) -nak wom_req <> wom_rsrv kell lennie  */
--select dbo.indithatoE(10000)