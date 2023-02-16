alter table wo_mstr
add constraint CK_WO_MSTR_indithatoE check((wo_status = 'ongoing' and dbo.indithatoE(wo_lot) = 0) or wo_status <> 'ongoing')