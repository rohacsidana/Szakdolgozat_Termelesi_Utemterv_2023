USE [Utemterv]
GO
/****** Object:  Trigger [dbo].[lad_reserve_update]    Script Date: 2023. 02. 23. 20:02:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER trigger [dbo].[lad_reserve_update]
	on [dbo].[LAD_DET]
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

	--if( (
	--	select count(*)
	--	from LD_DET ld inner join inserted i on ld.ld_expire = i.lad_expire and ld.ld_part  = i.lad_comp
	--	where ld.ld_qty_oh < 0
	--	) > 0
	--  )
	--	begin
	--		raiserror('Készlet mínuszba ment.', 18, 10);
	--		rollback;
	--	end
end

