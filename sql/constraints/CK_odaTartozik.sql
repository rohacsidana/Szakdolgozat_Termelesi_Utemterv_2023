alter table lad_det
add constraint CK_odaTartozik check(dbo.odaTartozik(lad_part, lad_par, lad_comp, lad_lot) > 0);

