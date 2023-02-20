alter table WO_MSTR
add constraint CK_WO_MSTR_can_activate check(wo_activated = 1 and wo_seq is not null and wo_end_time is not null or wo_activated = 0)