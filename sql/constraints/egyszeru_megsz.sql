alter table ld_det
add check(ld_qty_oh >= 0)
go
alter table ps_mstr
add check(ps_qty_per > 0)
go
alter table lad_det
add check(lad_qty_rsrv >= 0)
go
alter table lnd_det
add check(lnd_rate > 0)
go
alter table lad_det
add check(lad_qty_rsrv >= 0)
go
alter table wo_mstr
add check(wo_qty_ord > 0)
