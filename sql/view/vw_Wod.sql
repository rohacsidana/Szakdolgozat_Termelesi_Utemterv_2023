create view vw_Wod
as
select wod_lot as lot, wod_part as part, beepulo.pt_desc as part_name, wod_par as parent, szulo.pt_desc as parent_name, wod_qty_req as qty_req, beepulo.pt_um as part_um, wod_qty_compl as qty_compl, wod_qty_rjct as qty_rjct
from WOD_DET inner join PT_MSTR beepulo on wod_part = beepulo.pt_part
			inner join PT_MSTR szulo on wod_par = szulo.pt_part
