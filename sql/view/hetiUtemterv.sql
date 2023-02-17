alter view hetiUtemterv
as
select wo_lot, wo_nbr, wo_part, pt_desc, wo_qty_ord, pt_um, wo_line, ln_desc, egys, CAST(CONVERT(VARCHAR,DATEADD(SECOND, wo_qty_ord/egys* 3600, 0),108) AS TIME) as est_run, wo_seq, wo_rel_date, wo_start_date, wo_start_time, wo_end_time, wo_pld_downtime, wo_unpld_downtime
	from wo_mstr inner join pt_mstr on wo_part = pt_part
				inner join LN_MSTR on ln_line = wo_line
				inner join kesztermekek_h_e on termek = wo_part and  sor = wo_line
	where wo_status <>  'waiting'