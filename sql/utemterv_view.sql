create view ptpsasselect ps.ps_par as parent, pt2.pt_desc as parent_desc, pt2.pt_um as parent_um, ps.ps_comp as child, pt.pt_desc as child_desc, pt.pt_um as child_um, ps_qty_per as child_per_parfrom PS_MSTR ps inner join PT_MSTR pt on ps.ps_comp = pt.pt_part				inner join PT_MSTR pt2 on ps.ps_par = pt2.pt_part and pt2.pt_part <> pt.pt_part--select * from ptps