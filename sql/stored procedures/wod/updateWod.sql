create proc updateWod
(
	@lot int, @part int, @par int, @compl int, @rjct int
)
as
begin
	update WOD_DET
	set wod_qty_rjct = @rjct, wod_qty_compl = @compl
	from WOD_DET
	where wod_lot = @lot
	and wod_part = @part
	and wod_par = @par;

	select *
	from vw_Wod
	where lot = @lot
	and part = @part
	and parent = @par;
end