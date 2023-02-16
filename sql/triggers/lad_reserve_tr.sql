USE [Utemterv]
GO
/****** Object:  Trigger [dbo].[Lad_reserve]    Script Date: 2023. 02. 16. 9:04:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER trigger [dbo].[Lad_reserve]
	on [dbo].[LAD_DET]
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

end;