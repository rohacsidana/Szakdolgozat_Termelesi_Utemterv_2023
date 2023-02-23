alter table wo_mstr
add constraint CK_WO_MSTR_line_running check (dbo.runningLine(wo_line) <= 1 or wo_status <> 'ongoing')
