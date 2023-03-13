alter table lad_det
add constraint CK_LAD_DET_exp_between check(dbo.benneVanE(lad_expire, lad_lot) = 1);