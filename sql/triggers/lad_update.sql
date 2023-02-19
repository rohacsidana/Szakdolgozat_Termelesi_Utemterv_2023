create trigger lad_reserve_update
	on lad_det
	after update
as
begin
	update WOM_DET
	set wom_rsrv = iif(deleted.lad_qty_rsrv > inserted.lad_qty_rsrv, wom_rsrv - (deleted.lad_qty_rsrv - inserted.lad_qty_rsrv), wom_rsrv + ( inserted.lad_qty_rsrv - deleted.lad_qty_rsrv ))
	from inserted, WOM_DET, deleted
	where wom_lot = inserted.lad_lot and wom_part = inserted.lad_part  and wom_par = inserted.lad_par  
	and wom_mat = inserted.lad_comp
	
	update LD_DET
	--set ld_qty_oh -= inserted.lad_qty_rsrv, ld_qty_rsrv += inserted.lad_qty_rsrv  
	set ld_qty_oh = iif(deleted.lad_qty_rsrv > inserted.lad_qty_rsrv, ld_qty_oh + (deleted.lad_qty_rsrv - inserted.lad_qty_rsrv), ld_qty_oh - ( inserted.lad_qty_rsrv - deleted.lad_qty_rsrv )), ld_qty_rsrv = iif(deleted.lad_qty_rsrv > inserted.lad_qty_rsrv, ld_qty_rsrv - (deleted.lad_qty_rsrv - inserted.lad_qty_rsrv), ld_qty_rsrv + ( inserted.lad_qty_rsrv - deleted.lad_qty_rsrv ))
	from inserted, LD_DET, deleted
	where ld_part = inserted.lad_comp and ld_expire = inserted.lad_expire
end