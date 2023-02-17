alter table WO_MSTR
add constraint CK_WO_MSTR_wo_seq_un check(dbo.workWeekSeq(wo_seq, wo_start_date) = 1 or wo_seq is null)