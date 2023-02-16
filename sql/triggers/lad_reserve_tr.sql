create trigger Lad_reserve
	on LAD_DET
	after insert
as
begin
	update WOM_DET
	set wom_rsrv += inserted.lad_qty_rsrv 
	from inserted
	where wom_lot = inserted.lad_lot and wom_part = inserted.lad_part  and wom_par = inserted.lad_par  
	and wom_mat = inserted.lad_comp
	
	update LD_DET
	set ld_qty_oh -= inserted.lad_qty_rsrv, ld_qty_rsrv += inserted.lad_qty_rsrv  
	from inserted
	where ld_part = inserted.lad_comp and ld_expire = inserted.lad_expire


	update PT_MSTR
	set pt_qty_oh = IIF(pt_qty_oh is null, inserted.lad_qty_rsrv * -1, pt_qty_oh - inserted.lad_qty_rsrv)
	from inserted
	where pt_part = inserted.lad_comp
end;