alter table ps_mstr
add constraint CK_Azonos_par_comp check(ps_par <> ps_comp)