create trigger Wom_pt_qty_oh
	on WOM_DET
	after INSERT
as
begin
	--anyagokhoz tartozó tételek qty_oh mennyiségének csökkentése
--exec newWo 'rendT1', 1000, 10, '20230202'

--select * from WO_MSTR where wo_lot = 10320
--select * from WOD_DET where wod_lot = 10320
--select * from WOM_DET where wom_lot = 10320
--select * from PT_MSTR 

--update WO_MSTR
--set wo_status = 'accepted'
--where wo_lot = 10320


--update pt_MSTR
--set pt_qty_oh = null
	update PT_MSTR
	set	pt_qty_oh = IIF(pt_qty_oh is null, inserted.wom_req * -1, pt_qty_oh - inserted.wom_req)
	from inserted
	where pt_part = inserted.wom_mat
end;