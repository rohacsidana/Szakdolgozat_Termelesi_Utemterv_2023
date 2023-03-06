alter table wo_mstr
add constraint CK_WO_MSTR_wo_part_lndben check(dbo.RosszLNDdarab(wo_part, wo_line)=0 or wo_line is null)